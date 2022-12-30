class AccountsController < ApplicationController
  before_action :set_group
  before_action :set_account, except: %i[index create]

  def index
    @accounts = @group.accounts
  end

  def show; end

  def create
    @account = @group.accounts.create!(create_params)
  rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotFound => e
    render json: e.message, status: :bad_request
  end

  def generate_password
    @account.account_password.update!(password: Security::SaltAndPepper.encode(SecureRandom.base58), public_until: 1.hours.from_now)

    head :created
  end

  def password
    return head :unprocessable_entity unless @account.password_accessable?

    @password = Security::SaltAndPepper.decode(@account.public_password)
  end

  def update
    @account.update!(update_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def destroy
    @account.destroy!
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

  def set_account
    @account = @group.accounts.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
