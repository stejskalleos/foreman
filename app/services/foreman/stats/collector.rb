module Foreman
  module Stats
    class Collector
      class << self
        def key
          name.underscore.split('/')[-2..-1].join('_')
        end

        # This method should be implemented by the subclass
        # It must return a hash with the key being the name of the collector
        # and the value being the result of the collection
        # Example: { 'hosts_total' => 23 }
        def collect
          raise NotImplementedError
        end
      end
    end
  end
end
