class RedHatBootIso < ApplicationRecord
  ISOS_DIR = '/home/lstejska/isos/netboot/foreman/'.freeze

  belongs_to :operating_system, -> { where(family: 'Redhat') }

  before_validation :set_file_path

  validates :operating_system, presence: true
  validates :name, uniqueness: true
  # TODO: Rename to source_iso
  validates :source_path, presence: true
  # Todo: Rename to file_name
  validates :file_path, presence: true
  # TODO: Result of generate action + logs

  before_save :prepare_output_dirs

  def to_s
    name
  end

  private

  def set_file_path
    return unless source_path
    return unless operatingsystem

    file_path = ISOS_DIR + source_path.split('/').last
  end

  def prepare_dest_dirs
    name_dir = "#{ISOS_DIR}/#{os.name.parameterize}/"
    ver_dir = "#{os.major} #{os.minor}".parameterize

    FileUtils.mkdir_p(ISOS_DIR)
  end
end
