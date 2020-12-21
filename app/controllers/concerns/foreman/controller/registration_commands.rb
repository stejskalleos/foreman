module Foreman::Controller::RegistrationCommands
  extend ActiveSupport::Concern

  private

  def command
    args_query = "?#{registration_args.to_query}"
    "curl #{insecure} -X GET '#{endpoint}#{args_query if args_query != '?'}' #{command_headers} | bash"
  end

  def registration_args
    args = registration_params.except(*ignored_query_args)

    args['setup_insights'] = setup_insights.to_s
    args['setup_remote_execution'] = setup_remote_execution.to_s

    args.delete_if { |_, v| v.blank? }
        .permit!
  end

  def insecure
    registration_params['insecure'] ? '--insecure' : ''
  end

  def endpoint
    return global_registration_url if registration_params['smart_proxy_id'].blank?

    proxy = SmartProxy.authorized(:view_smart_proxies).find(registration_params['smart_proxy_id'])
    "#{proxy.url}/register"
  end

  def host_config_params
    organization = Organization.authorized(:view_organizations).find_by(id: registration_params['organization_id']) if registration_params['organization_id'].present?
    location = Location.authorized(:view_locations).find_by(id: registration_params['location_id']) if registration_params['location_id'].present?
    host_group = Hostgroup.authorized(:view_hostgroups).find_by(id: registration_params['hostgroup_id']) if registration_params["hostgroup_id"].present?
    operatingsystem = Operatingsystem.authorized(:view_operatingsystems).find_by(id: registration_params['operatingsystem_id']) if registration_params["operatingsystem_id"].present?

    Host.new(organization: organization, location: location, hostgroup: host_group, operatingsystem: operatingsystem).params
  end

  def setup_insights
    return if registration_params['setup_insights'].to_s.blank? || registration_params['setup_insights'] == 'inherit'
    registration_params['setup_insights']
  end

  def setup_remote_execution
    return if registration_params['setup_remote_execution'].to_s.blank? || registration_params['setup_remote_execution'] == 'inherit'
    registration_params['setup_remote_execution']
  end

  def command_headers
    hours = (registration_params['jwt_expiration'].presence || 4).to_i.hours.to_i
    scope = [{ controller: :registration, actions: [:global, :host] }]
    jwt = User.current.jwt_token!(expiration: hours, scope: scope)

    "-H 'Authorization: Bearer #{jwt}'"
  end
end
