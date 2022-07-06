# frozen_string_literal: true

class AccountPasswordSerializer < ActiveModel::Serializer
  attributes :id, :password, :public_until, :created_at, :updated_at

  belongs_to :account

  def password
    Security::SaltAndPepper.decode(object.password)
  end
end
