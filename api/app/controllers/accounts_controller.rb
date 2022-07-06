class AccountsController < ApplicationController
  before_action :set_group
  before_action :set_group_user, only: %i[create]
  before_action :set_account, except: %i[index create]

  def index
    render json: @group.accounts
  end

  def show
    render json: @account
  end

  def create
    account = @group.accounts.create!(create_params)
    GroupUserPermission.create!(account: account, group_user: @group_user)

    render json: account
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def update
    @account.update!(update_params)
    render json: @account
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def destroy
    render json: @account.destroy
  end

  private

  def create_params
    params.require(:account).permit(%i[name email password price])
  end

  def update_params
    params.require(:account).permit(%i[name email password price])
  end

  def set_group
    @group = @current_user.groups.find(params[:group_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_group_user
    @group_user = @current_user.group_users.find_by(group_id: @group.id)
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_account
    @account = @group.accounts.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
