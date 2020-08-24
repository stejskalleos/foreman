CommonParameter.without_auditing do
  common_params = [
    { name: "host_registration_ssh_keys", key_type: "boolean", value: true },
    { name: "host_registration_insights", key_type: "boolean", value: false },
  ]

  common_params.each do |cp|
    CommonParameter.create(cp) unless CommonParameter.find_by(name: cp[:name])
  end
end
