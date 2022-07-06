class GroupUser < ApplicationRecord
  belongs_to :group
  belongs_to :user

  has_many :group_invoices, dependent: :destroy
  has_many :invoices, through: :group_invoices

  has_many :group_user_permissions, dependent: :destroy
  has_many :accounts, through: :group_user_permissions

  scope :by_user, ->(user) { where(user: user) }
end
