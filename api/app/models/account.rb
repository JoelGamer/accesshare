class Account < ApplicationRecord
  has_secure_password
  after_create :create_owner_group_user

  belongs_to :group

  has_many :account_accesses, dependent: :destroy

  validates :name, :email, :price, :public_until, presence: true

  def password_accessable?
    public_until > Time.now
  end

  private

  def create_account_access
    self.account_accesses.create!(group_user: group.owner.group_users.find_by(group: group))
  end
end
