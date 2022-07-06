class GroupUsersPermissionsController < ApplicationController
  before_action :set_group, :set_group_user
  before_action :set_group_user_permission, except: %i[index create]

  def index
    render json: @group_user.group_user_permissions
  end

  def show
    render json: @group_user_permission
  end

  def create
    account = @group.accounts.find(create_params[:account_id])
    render json: @group_user.group_user_permissions.create!(account: account)
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def destroy
    render json: @group_user_permission.destroy
  end

  private

  def create_params
    params.require(:group_user_permission).permit(%i[account_id])
  end

  def set_group
    @group = @current_user.groups.find(params[:group_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_group_user
    @group_user = @group.group_users.find(params[:group_user_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_group_user_permission
    @group_user_permission = @group_user.group_user_permissions.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
