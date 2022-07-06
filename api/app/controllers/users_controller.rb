class UsersController < ApplicationController
  skip_before_action :authorized?, only: %i[login create]

  def me
    render json: @current_user
  end

  def login
    user = User.find_by(email: login_params[:email])&.authenticate(login_params[:password])
    return render json: 'Invalid email and/or password', status: :bad_request if user.blank?

    user_json = user.as_json.except('password_digest', 'created_at', 'updated_at')
    user_json[:token] = Authenticator.encode(user_json.merge({ ip: request.ip }))

    render json: user_json
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def create
    render json: User.create!(create_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def update
    render json: @current_user.update!(update_params)
  end

  def destroy
    render json: @current_user.destroy
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

  def accept_invite_params
    params.require(:user).permit(%i[confirmation_token])
  end
end
