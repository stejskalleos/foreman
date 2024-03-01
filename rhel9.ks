# This kickstart file was rendered from the Foreman provisioning template "Kickstart default".
# for floyd-obanion.example.com running RedHat 9 x86_64
# Organization: Default Organization
# Location: Default Location


url --url http://mirror.stream.centos.org/9-stream/BaseOS/x86_64/os


lang en_US.UTF-8
selinux --enforcing
keyboard us

network --device=00:aa:bb:cc:a9:1f --hostname floyd-obanion.example.com --vlanid=tag_coconut --interfacename=vlantag_coconut --nodnsnetwork --device=00:aa:bb:cc:72:b6 --hostname floyd-obanion.example.com --nodns
rootpw --iscrypted $5$df7L4Wa43xg0adkR$ja5zxGoni4UCdma5ocQw1mxL32PVzn4zgwC/qytVZqA
firewall --service=ssh
authselect --useshadow --passalgo=sha256 --kickstart
timezone --utc UTC 

services --disabled gpm,sendmail,cups,pcmcia,isdn,rawdevices,hpoj,bluetooth,openibd,avahi-daemon,avahi-dnsconfd,hidd,hplip,pcscd



bootloader --location=mbr --append="nofb quiet splash=quiet" 


zerombr
clearpart --all --initlabel
autopart 


skipx
text
reboot

%packages

yum
chrony
-ntp
%end


%post --nochroot
exec < /dev/tty3 > /dev/tty3
chvt 3
(



chvt 1
) 2>&1 | tee /mnt/sysimage/root/install.postnochroot.log
%end


%post
exec < /dev/tty3 > /dev/tty3
chvt 3
(
logger "Starting anaconda floyd-obanion.example.com postinstall"

echo "Updating system time"
systemctl enable --now chronyd
/usr/bin/chronyc -a makestep
/usr/sbin/hwclock --systohc








# update all the base packages from the updates repository
if [ -f /usr/bin/dnf ]; then
  dnf -y update
else
  yum -t -y update
fi


















touch /tmp/foreman_built

chvt 1
) 2>&1 | tee /root/install.post.log
%end

# copy %pre log files into chroot
%post --nochroot
cp -vf /tmp/*.pre.*.log /mnt/sysimage/root/
%end


%post --erroronfail --log=/root/install-callhome.post.log


if test -f /tmp/foreman_built; then
  echo "calling home: build is done!"
  if [ -x /usr/bin/curl ]; then
    /usr/bin/curl -o /dev/null --noproxy \* -H 'Content-Type: text/plain' --data @/root/install.post.log --silent 'http://fedora.brq.redhat.com/unattended/built?token=ada4d7cc-a118-405a-b5bc-70906e19b5b5'
  elif [ -x /usr/bin/wget ]; then
    /usr/bin/wget -q -O /dev/null --no-proxy --method POST --header 'Content-Type: text/plain' --body-file=/root/install.post.log 'http://fedora.brq.redhat.com/unattended/built?token=ada4d7cc-a118-405a-b5bc-70906e19b5b5'
  else
    wget -q -O /dev/null --header 'Content-Type: text/plain' 'http://fedora.brq.redhat.com/unattended/built?token=ada4d7cc-a118-405a-b5bc-70906e19b5b5'
  fi
else
  echo "calling home: build failed!"
  if [ -x /usr/bin/curl ]; then
    /usr/bin/curl -o /dev/null --noproxy \* -H 'Content-Type: text/plain' --data @/root/install.post.log --silent 'http://fedora.brq.redhat.com/unattended/failed?token=ada4d7cc-a118-405a-b5bc-70906e19b5b5'
  elif [ -x /usr/bin/wget ]; then
    /usr/bin/wget -q -O /dev/null --no-proxy --method POST --header 'Content-Type: text/plain' --body-file=/root/install.post.log 'http://fedora.brq.redhat.com/unattended/failed?token=ada4d7cc-a118-405a-b5bc-70906e19b5b5'
  else
    wget -q -O /dev/null --header 'Content-Type: text/plain' 'http://fedora.brq.redhat.com/unattended/failed?token=ada4d7cc-a118-405a-b5bc-70906e19b5b5'
  fi
fi

sync
%end

