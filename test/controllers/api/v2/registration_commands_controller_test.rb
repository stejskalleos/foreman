require 'test_helper'

class Api::V2::RegistrationCommandsControllerTest < ActionController::TestCase
  describe 'generate' do
    test 'without params' do
      post :create
      assert_response :success
      response = ActiveSupport::JSON.decode(@response.body)['registration_command']

      assert_includes response, "curl  -s 'http://test.host/register'"
      assert_includes response, "-H 'Authorization: Bearer"
    end

    test 'with params' do
      params = {
        organization_id: taxonomies(:organization1).id,
        location_id: taxonomies(:location1).id,
        hostgroup_id: hostgroups(:common).id,
        operatingsystem_id: operatingsystems(:redhat).id,
        setup_insights: 'false',
        setup_remote_execution: 'false',
      }

      post :create, params: params
      assert_response :success

      response = ActiveSupport::JSON.decode(@response.body)['registration_command']
      assert_includes response, "organization_id=#{taxonomies(:organization1).id}"
      assert_includes response, "location_id=#{taxonomies(:location1).id}"
      assert_includes response, "hostgroup_id=#{hostgroups(:common).id}"
      assert_includes response, "operatingsystem_id=#{operatingsystems(:redhat).id}"
      assert_includes response, 'setup_insights=false'
      assert_includes response, 'setup_remote_execution=false'
    end

    test 'with params ignored in url' do
      params = {
        insecure: true,
        jwt_expiration: 23,
        smart_proxy_id: smart_proxies(:one).id,
      }

      post :create, params: params
      assert_response :success

      response = ActiveSupport::JSON.decode(@response.body)['registration_command']
      assert_includes response, "curl --insecure -s '#{smart_proxies(:one).url}/register'"
    end
  end
end
