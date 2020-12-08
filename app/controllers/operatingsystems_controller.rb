class OperatingsystemsController < ApplicationController
  include Foreman::Controller::AutoCompleteSearch
  include Foreman::Controller::Parameters::Operatingsystem

  before_action :find_resource, :only => [:edit, :update, :destroy, :clone]

  def index
    @operatingsystems = resource_base_search_and_page
  end

  def new
    @operatingsystem = Operatingsystem.new
  end

  def create
    @operatingsystem = Operatingsystem.new(operatingsystem_params)
    if @operatingsystem.save
      assign_templates
      process_success
    else
      process_error
    end
  end

  def edit
    # Generates default OS template entries
    if SETTINGS[:unattended]
      @operatingsystem.provisioning_templates.map(&:template_kind_id).uniq.each do |kind|
        if @operatingsystem.os_default_templates.where(:template_kind_id => kind).blank?
          @operatingsystem.os_default_templates.build(:template_kind_id => kind)
        end
      end
    end
  end

  def update
    if @operatingsystem.update(operatingsystem_params)
      process_success
    else
      process_error
    end
  end

  def destroy
    if @operatingsystem.destroy
      process_success
    else
      process_error
    end
  end

  def clone
    @operatingsystem = @operatingsystem.deep_clone include: [:media, :ptables, :architectures, :puppetclasses, :os_parameters], except: [:title]
  end

  def templates
    template_kinds = TemplateKind.order(:name)
    templates = ProvisioningTemplate.where(snippet: false).select(:id, :name, :template_kind_id)

    render json: { template_kinds: template_kinds, templates: templates }
  end

  private

  def action_permission
    case params[:action]
      when 'clone', 'templates'
        :create
      else
        super
    end
  end

  def assign_templates
    return unless SETTINGS[:unattended]

    templates_attributes = operatingsystem_params['os_default_templates_attributes']&.map { |t| t[1] }
    templates_attributes&.each do |attr|
      next if attr['provisioning_template_id'].empty?
      pt = ProvisioningTemplate.find(attr['provisioning_template_id'])
      pt.operatingsystems << @operatingsystem
      pt.save
    end
  end
end
