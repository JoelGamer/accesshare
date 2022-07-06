# frozen_string_literal: true

class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at

  has_one :user
end
