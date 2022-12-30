class GroupsController < ApplicationController
  before_action :set_group, except: %i[index create]

  def index
    @groups = @current_user.groups
  end

  def show; end

  def create
    hash_params = { owner: @current_user }.with_indifferent_access.merge(create_params)
    @group = Group.create!(hash_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def update
    @group.update!(update_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message, status: :bad_request
  end

  def destroy
    @group.destroy!
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
