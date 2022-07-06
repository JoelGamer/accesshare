class UserInvite < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :confirmation_token, :expires_in, presence: true
end
