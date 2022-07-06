# frozen_string_literal: true

class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :price, :has_password, :created_at, :updated_at

  def has_password
    !object.account_password.password.blank?
  end
end
