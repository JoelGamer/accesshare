class Account < ApplicationRecord
  has_secure_password
  after_create :create_account_password

  belongs_to :group

  has_one :account_password, dependent: :destroy

  has_many :group_user_permissions, dependent: :destroy

  validates :name, :email, :price, presence: true

  private

  def create_account_password
    AccountPassword.create!(account: self)
  end
end
