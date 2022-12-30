json.array! @accounts do |account|
  json.id account.id
  json.name account.name
  json.email account.email
  json.price account.price
end