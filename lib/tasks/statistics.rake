# TODO
#   - Extensions from plugins
#   - Tests
#   - Documentation (How to plugin)
#   - Formatters: TEXT, JSON, CSV, HTML
#   - File Writer
#   - Refactor
#
desc 'Statistics'
namespace :statistics do
  desc "Collect the statistics"
  task :collect => :environment do
    files = Dir.glob(File.join(Rails.application.root, 'app', 'services', 'foreman', 'stats', 'collectors', '**', '*.rb'))
    collectors = files.map { |f| f.split('services').last.sub('.rb', '').camelize.constantize }

    meta = Foreman::Stats::Meta.collect
    results = collectors.map(&:collect)

    binding.pry
  end
end
