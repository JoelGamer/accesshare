json.array! @account_accesses do |account_access|
  json.id account_access.id
  json.account do
    json.id account_access.account.id
    json.name account_access.account.name
  end
  json.group_user do
    json.id account_access.group_user.id
    json.user do
      json.id account_access.group_user.user.id
      json.name account_access.group_user.user.name
    end
  end
end