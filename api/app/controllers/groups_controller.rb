class GroupsController < ApplicationController
  before_action :set_group, except: %i[index create]

  def index
    render json: @current_user.groups
  end

  def show
    render json: @group
  end

  def create
    hash_params = { user: @current_user }.with_indifferent_access.merge(create_params)
    group = Group.create!(hash_params)
    group.group_users.create!(user: @current_user)

    render json: group
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def update
    @group.update!(update_params)
    render json: @group
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def destroy
    render json: @group.destroy
  end

  private

  def create_params
    params.require(:group).permit(%i[name])
  end

  def update_params
    params.require(:group).permit(%i[name])
  end

  def set_group
    @group = @current_user.groups.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e.message, status: :not_found
  end
end
