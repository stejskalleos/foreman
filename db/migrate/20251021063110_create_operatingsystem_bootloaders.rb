class CreateOperatingsystemBootloaders < ActiveRecord::Migration[7.0]
  def up
    create_table :operatingsystem_bootloaders do |t|
      t.references :operatingsystem, null: false, foreign_key: true
      t.references :bootloader, null: false, foreign_key: true

      t.timestamps
    end

    # Migrate existing operating systems to have their current available_loaders as associations
    Operatingsystem.find_each do |os|
      available_loaders = os.available_loaders
      available_loaders.each do |loader_name|
        bootloader = Bootloader.find_by(name: loader_name)
        if bootloader && !os.bootloaders.include?(bootloader)
          os.bootloaders << bootloader
        end
      end
    end
  end

  def down
    drop_table :operatingsystem_bootloaders
  end
end
