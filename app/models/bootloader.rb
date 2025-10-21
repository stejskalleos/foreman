class Bootloader < ApplicationRecord
  has_and_belongs_to_many :operatingsystems, :join_table => :operatingsystem_bootloaders

  validates :name, :presence => true, :uniqueness => true

  default_scope -> { order(:name) }

  def to_label
    name
  end

  def to_s
    name
  end
end
