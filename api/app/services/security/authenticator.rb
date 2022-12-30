# frozen_string_literal: true

class Security::Authenticator
  class << self
    def encode(payload)
      "Bearer #{Security::Jwt.encode_with_expiration(payload: payload)}"
    end

    def decode(payload)
      token = payload.split[1] unless payload.nil?
      decoded = Security::Jwt.decode(payload: token)
      decoded[0]['data']
    end
  end
end
