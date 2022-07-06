class ApplicationController < ActionController::API
  attr_reader :current_user

  before_action :authorized?

  private

  def authorized?
    begin
      token = Authenticator.decode(request.headers['Authorization'])
    rescue JWT::DecodeError
      return head :unauthorized
    end

    return head :unauthorized unless request.ip == token['ip']

    user = User.find_by(id: token['id'], username: token['username'])

    return head :unauthorized if user.blank?

    @current_user = user
  end
end
