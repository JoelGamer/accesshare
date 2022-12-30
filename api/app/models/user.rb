class User < ApplicationRecord
  has_secure_password

  has_one :group, foreign_key: :owner_id
  
  has_many :group_users, dependent: :destroy
  has_many :groups, through: :group_users

  validates :username, :email, presence: true, uniqueness: true
  validates :name, presence: true

  def owner?(group:)
    group.id == self.group.id
  end
end
