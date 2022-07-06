# frozen_string_literal: true

class GroupUserSerializer < ActiveModel::Serializer
  attributes :id, :owner, :created_at, :updated_at

  belongs_to :user

  def owner
    object.group.user.id == object.user.id
  end
end
