class CreateRedHatBootIsos < ActiveRecord::Migration[7.0]
  def change
    create_table :red_hat_boot_isos do |t|
      t.string :name, null: false
      t.string :source_path, null: false
      t.string :file_path
      t.string :sha1sum
      t.text :notes

      t.belongs_to :operatingsystem, null: false
      t.timestamps
    end
  end
end
