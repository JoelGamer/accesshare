class GroupUser < ApplicationRecord
  belongs_to :group
  belongs_to :user

  has_many :invoices, dependent: :destroy
  has_many :account_accesses, dependent: :destroy
  has_many :accounts, through: :group_user_permissions

  scope :by_user, ->(user) { where(user: user) }
end
