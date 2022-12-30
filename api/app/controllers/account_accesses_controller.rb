class AccountAccessesController < ApplicationController
  before_action :set_group, :set_group_user
  before_action :set_account_access, except: %i[index create]

  def index
    @account_accesses = @group_user.account_accesses
  end

  def show; end

  def create
    account = @group.accounts.find(create_params[:account_id])
    @account_access = @group_user.account_accesses.create!(account: account)
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def destroy
    @account_access.destroy!
  end

  private

  def create_params
    params.require(:account_access).permit(%i[account_id])
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

  def set_account_access
    @account_access = @group_user.account_accesses.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
