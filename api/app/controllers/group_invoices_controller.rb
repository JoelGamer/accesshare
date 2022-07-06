class GroupInvoicesController < ApplicationController
  before_action :set_group
  before_action :set_group_invoice, except: %i[index create]

  def index
    invoices = @group.group_invoices

    if @current_user.group_owner?(@group)
      query = invoices.ransack(params[:q])

      render json: query.result, include: '*.*'
    else
      group_user = group_user_from_current_user
      query = invoices.by_user(group_user).ransack(params[:q])

      render json: query.result, include: '*.*'
    end
  end

  def paid
    invoice = @group_invoice.invoice
    return head :bad_request unless invoice.paid_in.nil?

    invoice.update!(paid_in: Time.now)
    render json: @group_invoice
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

  def set_group_invoice
    @group_invoice = @group.group_invoices.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
