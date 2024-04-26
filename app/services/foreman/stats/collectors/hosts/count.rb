module Foreman
  module Stats
    module Collectors
      module Hosts
        class Count < Foreman::Stats::Collector
          def self.collect
            { key => 23 }
          end
        end
      end
    end
  end
end
