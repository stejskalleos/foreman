module JwtAuth
  extend ActiveSupport::Concern

  included do
    has_one :jwt_secret, inverse_of: :user, dependent: :destroy

    def jwt_secret!
      jwt_secret || create_jwt_secret!
    end

    # :expiration    Integer, eg: 4.hours.to_i
    # :scope         Array, eg: [:view_hosts]
    def jwt_token!(expiration: nil, scope: [])
      jwt_secret = jwt_secret!
      JwtToken.encode(self, jwt_secret.token, expiration: expiration, scope: scope).to_s
    end
  end
end
