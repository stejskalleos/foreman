class OhaiFactImporter < StructuredFactImporter
  def self.authorized_smart_proxy_features
    []
  end

  def fact_name_class
    # OhaiFactName This should be new model?
    PuppetFactName
  end
end
