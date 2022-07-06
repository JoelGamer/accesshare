# frozen_string_literal: true

class GroupUserPermissionSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at

  belongs_to :account
  belongs_to :group_user
end
