class Group < ApplicationRecord
  after_create :create_owner_group_user
  
  belongs_to :owner, class_name: :User

  has_many :accounts, dependent: :destroy
  has_many :invoices, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :users, through: :group_users

  validates :name, presence: true

  private

  def create_owner_group_user
    self.group_users.create!(user: owner)
  end
end
