class Account < ApplicationRecord
  has_secure_password
  after_create :create_account_access

  attribute :public_until, default: -> { 1.hour.from_now }

  belongs_to :group

  has_many :account_accesses, dependent: :destroy

  validates :name, :email, :price, :public_until, presence: true

  def password_accessible?
    public_until > Time.now && public_password.present?
  end

  private

  def create_account_access
    self.account_accesses.create!(group_user: group.owner.group_users.find_by(group: group))
  end
end
