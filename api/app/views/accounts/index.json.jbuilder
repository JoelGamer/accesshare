json.array! @accounts do |account|
  json.id account.id
  json.name account.name
  json.email account.email
  json.price account.price
  json.password_accessible account.password_accessible?
end