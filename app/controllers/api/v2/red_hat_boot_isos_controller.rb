module Api
  module V2
    class RedHatBootIsosController < V2::BaseController
      DESTINATION_DIR = "/home/lstejska/isos/netboot/foreman".freeze

      before_action :set_source, only: [:generate]
      before_action :set_name, only: [:generate]
      before_action :find_smart_proxy, only: [:generate], if: -> { generate_params[:smart_proxy_id].present? }
      before_action :inst_ks_url, only: [:generate]
      before_action :nameservers, only: [:generate], if: -> { generate_params[:subnet_ids].present? }

      # Params:
      # source_iso
      # smart_proxy
      # nameserver
      def generate
        binding.pry

        render json: { message: "OK" }
      end

      private

      def generate_params
        params.permit(:name, :source, :smart_proxy_id, { subnet_ids: [] })
      end

      def set_source
        value = generate_params['source']

        if value.blank?
          raise ::Foreman::Exception.new(N_("Source parameter is missing"))
        end

        if value.start_with?("http://", "https://")
          raise ::Foreman::Exception.new(N_("Only local files are supported for now."))
        end

        unless File.file?(value) && File.readable?(value)
          raise ::Foreman::Exception.new(N_("Source file '#{value}' does not exist or it is not readable by Foreman."))
        end

        @source = value
      end

      def set_name
        @name = generate_params['name'] || "#{Time.now.to_i}_#{File.basename(@source)}"
      end

      def find_smart_proxy
        @smart_proxy = SmartProxy.authorized(:view_smart_proxies)
                                 .with_features('Templates')
                                 .find(generate_params['smart_proxy_id'])
      end

      def inst_ks_url
        path = "/api/v2/red_hat_boot_isos/net_boot_ks"
        url = @smart_proxy ? @smart_proxy.setting("Templates", "template_url") : Setting[:unattended_url]

        @inst_ks_url = "#{url}#{path}"
      end

      def nameservers
        subnets = Subnet.where(id: generate_params[:subnet_ids])
                        .select(:dns_primary)
                        .map(&:dns_primary)
                        .delete_if(&:blank?)

        @nameservers = subnets.map { |subnet| "nameserver=#{subnet}" }.join(" ")
      end

      def mkksiso_command
        kernel_attrs = "inst.ks=#{@inst_ks_url} inst.ks.sendmac #{@nameservers}"
        output_file = "#{DESTINATION_DIR}/#{@name}"

        "/usr/bin/mkksiso --cmdline \"#{kernel_attrs}\" #{@source} #{output_file}"
      end
    end
  end
end
