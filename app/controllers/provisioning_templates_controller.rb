class ProvisioningTemplatesController < TemplatesController
  include Foreman::Controller::Parameters::ProvisioningTemplate
  helper_method :documentation_anchor

  def build_pxe_default
    status, msg = ProvisioningTemplate.authorized(:deploy_provisioning_templates).build_pxe_default
    (status == :ok) ? success(msg) : error(msg)
    redirect_back(fallback_location: provisioning_templates_path)
  end

  def global_registration
    respond_to do |format|
      format.html do
        @organizations = Organization.authorized(:view_organizations)
                                     .select(:id, :name)
                                     .map { |org| { value: org.id, label: org.name, key: "org_#{org.id}" } }
        @locations = Location.authorized(:view_locations)
                             .select(:id, :name)
                             .map { |loc| { value: loc.id, label: loc.name, key: "loc_#{loc.id}" } }
        @host_groups = Hostgroup.authorized(:view_hostgroups)
                                .select(:id, :name)
                                .map { |hg| { value: hg.id, label: hg.name, key: "hog_#{hg.id}" } }
        @plugin_params = allowed_registration_vars.map { |param| { label: param.to_s.titleize, key: param.to_s } }
      end

      format.json do
        url_params = [
          ("organization_id=#{params['organization_id']}" if params['organization_id'].present?),
          ("location_id=#{params['location_id']}" if params['location_id'].present?),
          ("hostgroup_id=#{params['hostgroup_id']}" if params['hostgroup_id'].present?),
          ("insecure=true" if params['insecure'] == 'true'),
        ]
        url_params.concat allowed_registration_vars.map { |fp| ("#{fp}=#{params[fp]}" if params[fp].present?) }

        # binding.pry
        # url_params = (def_params + plugin_params).compact
        expiration = params['expiration'].present? ? params['expiration'].to_i : 4
        jwt_token = current_user.jwt_token!(expiration: expiration.hours.to_i)
        insecure = '--insecure' if params['insecure'] == 'true'

        headers = ["Authorization: Bearer #{jwt_token}"]

        command = "curl #{insecure} -X GET \"#{Setting[:foreman_url]}/register#{'?' if url_params.any?}#{url_params.join('&')}\" \\ " +
                  headers.map{ |h| "-H '#{h}'" }.join(' ') +
                  " | bash"

        render json: { registerCommand: command }
      end
    end
  end

  def documentation_anchor
    '4.4.3ProvisioningTemplates'
  end

  private

  def allowed_registration_vars
    Foreman::Plugin.all.map(&:allowed_registration_vars).flatten.compact.uniq
  end
end
