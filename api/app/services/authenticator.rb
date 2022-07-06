# frozen_string_literal: true

class Authenticator
  SECRET = 'oOoOOoSecretOOoOo'
  EXPIRES_IN = 24.hours
  ALGORITHM = 'HS256'
  LEEWAY = 30

  class << self
    def encode(payload)
      token = JWT.encode payload_with_expiration(payload), SECRET, ALGORITHM
      "Bearer #{token}"
    end

    def decode(payload)
      token = payload.split[1] unless payload.nil?
      decoded = JWT.decode token, SECRET, true, { exp_leeway: LEEWAY, algorithm: ALGORITHM }
      decoded[0]['data']
    end

    def payload_with_expiration(payload)
      { data: payload, exp: EXPIRES_IN.from_now.to_i }
    end
  end
end
