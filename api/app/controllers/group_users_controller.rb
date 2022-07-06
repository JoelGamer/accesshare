class GroupUsersController < ApplicationController
  before_action :set_group
  before_action :set_group_user, except: %i[index create]

  def index
    render json: @group.group_users
  end

  def show
    render json: @group_user
  end

  def create
    user = User.find_by(email: create_params[:email])
    render json: @group.group_users.create!(user: user)
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def destroy
    render json: @group_user.destroy
  end

  private

  def create_params
    params.require(:user).permit(%i[email])
  end

  def set_group
    @group = @current_user.groups.find(params[:group_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_group_user
    @group_user = @group.group_users.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
