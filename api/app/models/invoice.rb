class Invoice < ApplicationRecord
  has_one :group_invoice, dependent: :destroy
  has_one :group, through: :group_invoice
  has_one :group_user, through: :group_invoice

  validates :price, :expires_in, presence: true
end
