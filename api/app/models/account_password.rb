class AccountPassword < ApplicationRecord
  belongs_to :account

  scope :by_public, ->() { where(public_until: ..Time.now) }
  scope :by_private, ->() { where(public_until: Time.now..) }
end
