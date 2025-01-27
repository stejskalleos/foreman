CommonParameter.without_auditing do
  params = [
    { name: "host_registration_insights", key_type: "boolean", value: false },
    { name: "host_registraton_insights_inventory", key_type: "boolean", value: false },
    { name: "host_registration_remote_execution", key_type: "boolean", value: true },
    { name: "host_packages", key_type: "string", value: "" },
  ]

  params.each { |param| CommonParameter.find_or_create_by(param) }
end
