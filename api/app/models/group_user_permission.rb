class GroupUserPermission < ApplicationRecord
  belongs_to :account
  belongs_to :group_user
end
