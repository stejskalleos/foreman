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
        @organizations = Organization.authorized(:view_organizations).select(:id, :name)
        @locations = Location.authorized(:view_locations).select(:id, :name)
        @host_groups = Hostgroup.authorized(:view_hostgroups).select(:id, :name)
        @plugin_params = allowed_registration_vars
      end

      format.json do
        ui_params = [
          ("organization_id=#{params['organization_id']}" if params['organization_id'].present?),
          ("location_id=#{params['location_id']}" if params['location_id'].present?),
          ("hostgroup_id=#{params['hostgroup_id']}" if params['hostgroup_id'].present?),
          ("insecure=true" if params['insecure'] == 'true'),
        ]
        plugin_params = allowed_registration_vars.map { |fp| ("#{fp}=#{params[fp]}" if params[fp].present?) }
        url_query = '?' + (ui_params + plugin_params).compact.join('&')
        expiration = params['expiration'].present? ? params['expiration'].to_i.hours.to_i : nil
        jwt_token = current_user.jwt_token!(expiration: expiration)

        command = "curl #{'--insecure' if params['insecure'] == 'true'}" +
                  "-X GET '#{Setting[:foreman_url]}/register#{url_query}' " +
                  "-H 'Authorization: Bearer #{jwt_token}' | bash"

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
