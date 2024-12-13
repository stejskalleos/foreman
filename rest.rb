require 'rest-client'
require 'pry'

base_dir = '/home/lstejska/isos/netboot/foreman/base'
url = 'https://c2r.stejskalleos.cz/rhel/8/x86_64/satellite-convert2rhel-toolkit-1.0.1-1.fc39.x86_64.rpm'
dest = "#{base_dir}/#{url.split('/').last}"



raw = RestClient::Request.execute(
                method: :get,
                url: url,
                raw_response: true,
                verify_ssl: false)

FileUtils.rm dest if File.exist? dest
FileUtils.mv raw.file.path, dest
