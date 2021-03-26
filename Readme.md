Auto OS: Na vyber parsera factu pouzit builder design: https://longliveruby.com/articles/rails-design-patterns-the-big-picture

ewoud: ideas for facters

**Puppet - facter**
Done

**Chef - ohai**
https://docs.chef.io/ohai/

```
# Ubuntu 18.04
wget https://packages.chef.io/files/stable/chef-workstation/20.6.62/debian/10/chef-workstation_20.6.62-1_amd64.deb
sudo dpkg -i chef-workstation*.deb

ohai
```








**Puppet facter**
`yum install facter -y`




**Salt minion** (no moc nevim)
https://docs.saltproject.io/en/latest/topics/grains/

Installation on centos: (as root)
```
curl -fsSL https://bootstrap.saltproject.io -o install_salt.sh
sh install_salt.sh -P -x python3

```

**uFacter**
https://github.com/lzap/ufacter


**subman facts**
`subscription-manager facts`
