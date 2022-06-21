desc 'Add some data to the development'
namespace :dev do
  desc 'Dev env data'
  task :data => :environment do
    raise "Running this script in #{Rails.env} environment is bad idea!" unless Rails.env.development?

    User.as_anonymous_admin do
      message('Configuring settings')
      Setting['idle_timeout'] = 999_999_99

      message('Taxonomies')
      puts '-> Create My Organization'
      Organization.create(name: 'My Organization')

      puts '-> Create My Location'
      Location.create(name: 'My Location')

      organizations = Organization.all
      locations = Location.all

      message('Users')
      puts '-> Create user with all roles'
      create_user('all-roles', Role.all)

      puts '-> Create user without roles'
      create_user('no-roles', [])

      message('Networking')
      puts '-> Create example.com domain'
      Domain.create(name: 'example.com', organizations: organizations, locations: locations)

      puts '-> default libvirt subnet'
      Subnet.create name: 'default', type: 'Subnet::Ipv4', network: '192.168.122.0', cidr: '24',
                    mask: '255.255.255.0', gateway: '192.168.122.1', dns_primary: '192.168.122.1',
                    ipam: 'DHCP', from: '192.168.122.2', to: '192.168.122.100', mtu: '1500', boot_mode: 'DHCP',
                    domains: Domain.all, organizations: organizations, locations: locations
    end
  end

  def message(msg)
    puts ''
    puts msg
  end

  def create_user(login, roles)
    User.create login: login, password: 'changeme', mail: "#{login}@foreman.example.com",
                organizations: Organization.all,
                locations: Location.all,
                auth_source: AuthSource.find_by(name: 'Internal'),
                default_organization: Organization.find_by(name: 'Default Organization'),
                default_location: Location.find_by(name: 'Default Location'),
                roles: roles
  end
end
