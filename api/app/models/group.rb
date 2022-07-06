class Group < ApplicationRecord
  belongs_to :user

  has_many :accounts, dependent: :destroy
  has_many :group_invoices, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :users, through: :group_users

  validates :name, presence: true
end
