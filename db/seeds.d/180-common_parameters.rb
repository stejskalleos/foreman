CommonParameter.without_auditing do
  params = [
    { name: "host_registration_rex", key_type: "boolean", value: true },
    { name: "host_registration_insights", key_type: "boolean", value: false },
  ]

  params.each do |param|
    CommonParameter.find_or_create_by(param)
  end
end
