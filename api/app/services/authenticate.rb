class Authenticate
  def self.call(authorization:, ip:)
    token = Security::Authenticator.decode(authorization)
    # return false unless ip == token['ip']

    User.find_by(id: token['id'], username: token['username'])
  end
end