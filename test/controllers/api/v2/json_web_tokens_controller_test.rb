require 'test_helper'

class Api::V2::JsonWebTokensControllerTest < ActionController::TestCase
  def setup
    @user = FactoryBot.create(:user, admin: false)
    @role = FactoryBot.create(:role)
    @generate_jwt = FactoryBot.create(:permission, name: 'generate_json_web_tokens')
    @invalidate_jwt = FactoryBot.create(:permission, name: 'invalidate_json_web_tokens')
  end

  #
  # Generate token tests
  #

  test "admin generate for self" do
    as_user(:admin) { post :generate, params: { id: users(:admin).id } }
    assert_response :success
  end

  test "admin generate for user" do
    as_user(:admin) { post :generate, params: { id: users(:one).id } }
    assert_response :success
  end

  test "non-admin with permissions generate for self" do
    @role.add_permissions! [@generate_jwt.name]
    @user.roles = [@role]

    as_user(@user) { post :generate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin without permissions generate for self" do
    as_user(@user) { post :generate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin with permissions generate for user" do
    @role.add_permissions! [@generate_jwt.name]
    @user.roles = [@role, roles(:manager)]

    as_user(@user) { post :generate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin without `generate_json_web_tokens` generate for user" do
    @user.roles = [roles(:manager)]

    as_user(@user) { post :generate, params: { id: users(:two).id } }
    assert_response :forbidden
  end

  test "non-admin without `edit_users` generate for user" do
    @role.add_permissions! [@generate_jwt.name]
    @user.roles = [@role]

    as_user(@user) { post :generate, params: { id: users(:two).id } }
    assert_response :not_found
  end

  #
  # Invalidate tokens tests
  #

  test "admin invalidate for self" do
    as_user(:admin) { delete :invalidate, params: { id: @user.id } }
    assert_response :success
  end

  test "admin invalidate for user" do
    as_user(:admin) { delete :invalidate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin with permissions invalidate for self" do
    @role.add_permissions! [@invalidate_jwt.name]
    @user.roles = [@role]

    as_user(@user) { delete :invalidate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin without permissions invalidate for self" do
    as_user(@user) { delete :invalidate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin with permissions invalidate for user" do
    @role.add_permissions! [@invalidate_jwt.name]
    @user.roles = [@role, roles(:manager)]

    as_user(@user) { delete :invalidate, params: { id: @user.id } }
    assert_response :success
  end

  test "non-admin without `invalidate_json_web_tokens` invalidate for user" do
    @user.roles = [roles(:manager)]
    as_user(@user) { delete :invalidate, params: { id: users(:two).id } }
    assert_response :forbidden
  end

  test "non-admin without `edit_users` invalidate for user" do
    @role.add_permissions! [@invalidate_jwt.name]
    @user.roles = [@role]

    as_user(@user) { delete :invalidate, params: { id: users(:two).id } }
    assert_response :not_found
  end
end
