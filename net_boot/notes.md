# Netboot ISO

TODO:

- RedHatBootIso as a name?

Settings:
stream_net_boot_iso_url
fedora_net_boot_iso_url

RedHatBootIso model
belongs_to :operatingsystem

- OperatingSystem
  has_manu :net_boot_isos
  :can_boot_iso?

Generating iso
-> Hosts -> Provisioning Setup -> Boot ISOs
In the Form:
---- - Select Operating System - Select Capsule / Source / ??? Naming - Name?
--- - Set path / URL to ISO - (Check that path or URL exists)

Host calls /provisioning/netboot/CentOS_Stream/10

- host.new? -> Create a record in NetHost table :mac, :ip, :os, :created_at
  - :mac from `X-RHN-Provisioning-MAC-0` header
  - :ip from request
  - :os from the URL
- host.exists? -> Continue
- Returns `net_boot_kickstart` for the host
  - `201` if it was created
  - `200` if ok

Loop for host to be in build mode

- call `/unattended/provision`
  ok? Save to `/root/netboot.ks` and continue
  no? Loop
  exit
