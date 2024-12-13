# Foreman NetISO

https://docs.google.com/document/d/1avT4AKKyb363r40lQn5z0lKoXM_O7o0BZEdU8_MGX_s/edit?tab=t.0#heading=h.7x6pe8pw5ri2

Overview

- Download netboot iso
- Extract, customize & build initrd
- Update boot loader config files
- Test it
- Profit

## Setup

### Warning

- This doesn't work with **Fedora Linux CSB**!
- `root` user required

### Packages

```shell
dnf install -y lorax grub2-tools dracut edk2-ovmf
dnf update -y
# Reboot if kernel have been updated
reboot now
```

### Working directory

```shell
# TODO: Or git clone
cd /root
mkdir netboot_iso
cd /root/netboot_iso
```

### ISO

```
wget https://ftp.fi.muni.cz/pub/linux/centos-stream/9-stream/BaseOS/x86_64/iso/CentOS-Stream-9-latest-x86_64-boot.iso -O ./stream-orig.iso

wget https://mirror.stream.centos.org/10-stream/BaseOS/x86_64/iso/CentOS-Stream-10-latest-x86_64-boot.iso -O CentOS-Stream-10-latest-x86_64-boot.iso
```

## Dracut & initRAM disk

Dracut generates initrd based on OS where it runs.
For example, you won't be able to generate Stream initrd on Fedora.

### Configs

Dracut uses options from configuration files in:

- `/etc/dracut.conf`
- `/etc/dracut.conf.d/*.conf`
- `/usr/lib/dracut/dracut.conf.d/*.conf` !!!

### Commands

```shell
dracut --list-modules
```

### Generating initrd.img

```shell
# As root
dracut  --force \
        --no-reproducible \
        --add "qemu url-lib qemu-net network base bash debug fs-lib rescue uefi-lib ssh-client" \
        --kernel-cmdline "rd.luks=0 rd.lvm=0 rd.md=0 rd.dm=0" \
        ./images/pxeboot/initrd.img
```

TODO: Explanation

## Grub configuration

```shell
# As root:

rm -f ./stream9-customized.iso &&
mkksiso --cmdline "inst.ks=http://192.168.190.1:8080/unattended/provision inst.ks.sendmac nameserver=192.168.190.1 rd.shell rd.debug log_buf_len=1M" \
        --add ./images \
    ./stream-orig.iso ./stream9-customized.iso

#chown lstejska:lstejska -R .

#cp /boot/vmlinuz-$(uname -r) ./images/pxeboot/vmlinuz &&
# CMD line options: rd.debug (but it spams a lot)
# --rm-args "rhgb quiet" \
```

Note: Some args are there thanks to Dracut's documentation on how to troubleshoot
TODO: Explanation

## Check the result (optional)

### ISO

Mount the `fedora-customized.iso`

```shell
# As Root:

mkdir -p /mnt/netboot_customized
mount -o loop ./fedora-customized.iso /mnt/netboot_customized
```

Check:

- "Our" initrd is there.

```shell
md5sum images/pxeboot/initrd.img
md5sum /mnt/netboot_customized/images/pxeboot/initrd.img
#=> Result must be same
```

- Boot loader config files

```shell
find /mnt/netboot_customized/ -name "*.cfg" -o -name "*.conf"
```

After you done:

```shell
umount /mnt/netboot_customized
```

## Running machine

```shell
virt-install  --name=netboot \
              --vcpus=4 \
              --memory=4096 \
              --disk size=20 \
              --os-variant=fedora39 \
              --network "network=foreman_default,mac=54:30:26:ec:95:75" \
              --connect qemu:///system \
              --boot uefi,cdrom,hd,loader_ro=yes,loader_type=pflash,loader_secure=no \
              --cdrom=./stream9-customized.iso
```

\* (Virtual machine, but behaving like bare-metal)

## Testing

Host in Foreman must have Kickstart default, PXEGrub2 template & PXELinux template.
Technically only Kickstart default is used, but that's not a problem for now.

## Tools

- `grub2-emu -d grub.cfg` for quick testing

## Links

- https://weldr.io/lorax/mkksiso.html
- https://github.com/dracutdevs/dracut/wiki/modules#network
- https://www.linux.org/threads/understanding-the-various-grub-modules.11142/
- https://www.man7.org/linux/man-pages/man7/dracut.modules.7.html
