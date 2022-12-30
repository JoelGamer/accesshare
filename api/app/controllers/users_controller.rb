class UsersController < ApplicationController
  skip_before_action :authenticate, only: %i[login create]

  def me; end

  def login
    user = User.find_by(email: login_params[:email])&.authenticate(login_params[:password])
    return render json: 'Invalid email and/or password', status: :bad_request if user.blank?

    user_json = user.as_json.except('password_digest', 'created_at', 'updated_at')
    @token = Security::Authenticator.encode(user_json.merge({ ip: request.ip }))
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def create
    @user = User.create!(create_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def update
    @current_user.update!(update_params)
  end

  def destroy
    @user = @current_user.destroy!
  end

  private

  def login_params
    params.require(:user).permit(%i[email password])
  end

  def create_params
    params.require(:user).permit(%i[name email username password])
  end

  def update_params
    params.require(:user).permit(%i[name email username password])
  end
end
