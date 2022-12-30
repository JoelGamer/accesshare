class ApplicationController < ActionController::API
  attr_reader :current_user

  before_action :authenticate

  private

  def authenticate
    @current_user = Authenticate.call(authorization: request.headers['Authorization'], ip: request.ip)
  rescue StandardError => e
    head :unauthorized
  end
end
