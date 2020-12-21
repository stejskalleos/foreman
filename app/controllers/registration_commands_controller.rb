class RegistrationCommandsController < ApplicationController
  include Foreman::Controller::RegistrationCommands

  def new
    respond_to do |format|
      format.html do
        @organization = Organization.current
        @organizations = organizations
        @location = Location.current
        @locations = locations
        @config_params = host_config_params
      end

      format.json do
        render json: form_data
      end
    end
  end

  def os_template
    os = Operatingsystem.authorized(:view_operatingsystems).find(params[:id])
    template_kind = TemplateKind.find_by(name: 'registration')
    default_template = os.os_default_templates.find_by(template_kind: template_kind)
    provisioning_template = default_template&.provisioning_template

    if provisioning_template
      render json: { template: { name: provisioning_template.name, path: edit_provisioning_template_path(provisioning_template) } }
    else
      render json: { template: { name: nil, os_path: edit_operatingsystem_path(os)} }
    end
  end

  def create
    render json: { command: command }
  end

  private

  def organizations
    User.current.admin? ? Organization.select(:id, :name) : User.current.my_organizations.select(:id, :name)
  end

  def locations
    User.current.admin? ? Location.select(:id, :name) : User.current.my_locations.select(:id, :name)
  end

  def ignored_query_args
    ['jwt_expiration', 'smart_proxy_id', 'insecure']
  end

  def registration_params
    if params['registration_command']
      params['registration_command'].transform_keys(&:underscore)
    else
      params
    end
  end

  def form_data
    {
      organizations: organizations,
      locations: locations,
      hostGroups: Hostgroup.authorized(:view_hostgroups).select(:id, :name, :operatingsystem_id),
      operatingSystems: Operatingsystem.authorized(:view_operatingsystems),
      smartProxies: Feature.find_by(name: 'Registration')&.smart_proxies,
      configParams: host_config_params,
    }
  end
end
