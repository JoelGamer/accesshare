class AccountsPasswordController < ApplicationController
  before_action :set_group
  before_action :set_account

  def index
    render json: @account.account_password
  end

  def create
    @account.account_password.update!(password: Security::SaltAndPepper.encode(SecureRandom.base58), public_until: 1.hours.from_now)
    head :created
  end

  private

  def set_group
    @group = @current_user.groups.find(params[:group_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_account
    @account = @group.accounts.find(params[:account_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
