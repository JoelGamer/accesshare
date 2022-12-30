class Security::Jwt
  SECRET = 'oOoOOoSecretOOoOo'
  EXPIRES_IN = 24.hours
  ALGORITHM = 'HS256'
  LEEWAY = 30

  class << self
    def encode(payload:)
      JWT.encode(payload, SECRET, ALGORITHM)
    end

    def encode_with_expiration(payload:)
      JWT.encode(payload_with_expiration(payload: payload), SECRET, ALGORITHM)
    end

    def decode(payload:)
      JWT.decode(payload, SECRET, true, { exp_leeway: LEEWAY, algorithm: ALGORITHM })
    end

    def payload_with_expiration(payload:)
      { data: payload, exp: EXPIRES_IN.from_now.to_i }
    end
  end
end