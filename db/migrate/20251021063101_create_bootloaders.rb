class CreateBootloaders < ActiveRecord::Migration[7.0]
  def up
    create_table :bootloaders do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_index :bootloaders, :name, unique: true

    names = [
      "None",
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

    Bootloader.create!(names.map { |name| { name: name } })
  end

  def down
    drop_table :bootloaders
  end
end
