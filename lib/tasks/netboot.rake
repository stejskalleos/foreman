# TODO: Selinux, where to put the input/output files?
# TODO: Output should be in a temporary directory(?)
# TODO: Test on a real machine

namespace :netboot do
  desc <<~END_DESC
    Generate netboot image for a specific operating system
    Examples:
    rake netboot:generate OS_ID=1 IMAGE_PATH=/tmp/netboot.iso OUTPUT_PATH=/tmp/new-netboot.iso
    rake netboot:generate OS_ID=1 SMART_PROXY_ID=1 IMAGE_PATH=/tmp/netboot.iso OUTPUT_PATH=/tmp/new-netboot.iso
    TODO:
      - Describe steps
      - Parameters
      - Examples
  END_DESC

  task generate: :environment do
    @image_path = ENV['IMAGE_PATH']
    @output_path = ENV['OUTPUT_PATH']
    @os = Operatingsystem.find(ENV['OS_ID'])
    @smart_proxy = SmartProxy.find(ENV['SMART_PROXY_ID']) if ENV['SMART_PROXY_ID'].present?

    check!

    puts "Running 'mkksiso' command..."
    puts mkksiso_command

    result = generate_image
    # TODO: Bye method
    if generate_image
      puts "--------------------------------"
      puts "Netboot image generated successfully"
      puts @output_path
      puts "--------------------------------"
    else
      puts "--------------------------------"
      puts "Failed to generate netboot image"
      puts "--------------------------------"
      exit 1
    end
  end

  def check!
    if @os.family != "Redhat"
      raise "#{@os.family} operating system family is not supported. Only Redhat operating systems are supported."
    end

    unless @os.has_default_template?(TemplateKind.unscoped.find_by(name: 'netboot'))
      raise "#{@os.title} does not have a default netboot template"
    end

    raise "Netboot image path is required" if @image_path.blank?

    File.exist?(@image_path) || raise("Netboot image path #{@image_path} does not exist")
    File.readable?(@image_path) || raise("Netboot image path #{@image_path} is not readable")

    raise "Output path is required" if @output_path.blank?
    raise("Output path #{@output_path} already exists") if File.exist?(@output_path)

    if @smart_proxy
      @smart_proxy.has_feature?('Templates') || raise("Smart proxy #{@smart_proxy.name} does not have the Templates feature")
    end

    `which mkksiso`
    $?.success? || raise("mkksiso command not found")

    puts "All checks passed"
  end

  def generate_image
    `#{mkksiso_command}`
    $?.success?
  end

  def mkksiso_command
    "mkksiso #{ca_files.join('--add ')} --cmdline \"#{mkksiso_c_attrs}\" #{@image_path} #{@output_path}"
  end

  private

  def mkksiso_c_attrs
    ks_url = if @smart_proxy
      "#{@smart_proxy.url}/unattended/netboot/#{@os.id}"
    else
      "#{Setting[:foreman_url]}/unattended/netboot/#{@os.id}"
    end

    "ip=dhcp inst.ks=#{ks_url} inst.ks.sendmac inst.cmdline"
  end

  def ca_files
    setting_values = [Setting[:server_ca_file], Setting[:ssl_ca_file]].reject(&:empty?)

    if setting_values.empty?
      raise "No CA files found, check the 'Server CA file' and 'SSL CA file' in Settings > Authentication"
    end

    setting_values
  end
end
