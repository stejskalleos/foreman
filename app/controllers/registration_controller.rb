class RegistrationController < ApplicationController
  def new
    form_options
  end

  def create
    form_options
    args_query = "?#{registration_args.to_query}"
    @command = "curl -X GET \"#{endpoint}#{args_query if args_query != '?'}\" #{headers} | bash"
  end

  private

  def form_options
    @host_groups = Hostgroup.authorized(:view_hostgroups).select(:id, :name)
    @operating_systems = Operatingsystem.authorized(:view_operatingsystems).select(:id, :title)
    @smart_proxies = Feature.find_by(name: 'Registration')&.smart_proxies || []
    @insights_param = CommonParameter.find_by(name: 'host_registration_insights')
  end

  def headers
    hours = (params[:jwt_expiration].presence || 4).to_i.hours.to_i
    jwt = User.current.jwt_token!(expiration: hours)

    "-H 'Authorization: Bearer #{jwt}'"
  end

  def endpoint
    return global_registration_url if params['smart_proxy'].blank?

    proxy = SmartProxy.authorized(:view_smart_proxies).find(params[:smart_proxy])
    "#{proxy.url}/register"
  end

  def registration_args
    ignored = ['utf8', 'authenticity_token', 'commit', 'action', 'locale', 'controller', 'jwt_expiration']
    params.except(*ignored)
          .delete_if { |_, v| v.blank? }
          .permit!
  end
end
