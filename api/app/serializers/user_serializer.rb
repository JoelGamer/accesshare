# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :created_at, :updated_at
end
