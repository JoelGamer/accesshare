class InvoicesController < ApplicationController
  before_action :set_group
  before_action :set_invoice, except: %i[index create]

  def index
    invoices = @group.invoices

    if @current_user.owner?(@group)
      query = invoices.ransack(params[:q])

      @result = query.result
    else
      group_user = group_user_from_current_user
      query = invoices.by_user(group_user).ransack(params[:q])

      @result = query.result
    end
  end

  def paid
    return head :bad_request unless @invoice.paid_in.nil?

    @invoice.update!(paid_in: Time.now)
  end

  private

  def group_user_from_current_user
    @group.group_users.find_by(user: @current_user)
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_group
    @group = @current_user.groups.find(params[:group_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end

  def set_invoice
    @invoice = @group.invoices.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
