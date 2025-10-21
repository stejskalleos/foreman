names = [
  # "None",
  "PXELinux BIOS",
  "PXELinux UEFI",
  "Grub2 BIOS",
  "Grub2 ELF",
  "Grub2 UEFI",
  "Grub2 UEFI SecureBoot",
  "Grub2 UEFI HTTP",
  "Grub2 UEFI HTTPS",
  "Grub2 UEFI HTTPS SecureBoot",
  "iPXE Embedded",
  "iPXE UEFI HTTP",
  "iPXE Chain BIOS",
  "iPXE Chain UEFI",
]

names.each do |name|
  Bootloader.find_or_create_by!(name: name)
end
