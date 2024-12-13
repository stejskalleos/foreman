# Problems
## Isos
- For `mkksiso` you must be root
- Rhel Images cannot be downloaded or synced

## Grub2
Grub2 env contains only minimal set of functions, can't be used.

## Dracut
Customizing dracut is problematic.

## Anaconda
**%pre**
- Doesn't have DNS.
- Display options are minimal.
- `%include` directive doesn't support %pre
- Dynamic partitioning won't work because of that. See kickstart_dynamic.erb

