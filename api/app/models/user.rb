class User < ApplicationRecord
  has_secure_password
  
  has_many :group_users, dependent: :destroy
  has_many :groups, through: :group_users
  has_many :invites

  validates :username, :email, presence: true, uniqueness: true
  validates :name, presence: true

  def group_owner?(group)
    group.user.id == id
  end
end
