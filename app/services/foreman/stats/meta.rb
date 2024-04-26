module Foreman
  module Stats
    module Meta
      def self.collect
        {
          instance_id: Foreman.instance_id,
          version: Foreman::VERSION,
          timestamp: Time.now.utc,

        }
      end
    end
  end
end
