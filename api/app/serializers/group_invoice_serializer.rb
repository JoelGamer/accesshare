# frozen_string_literal: true

class GroupInvoiceSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at

  belongs_to :group_user
  belongs_to :invoice
end
