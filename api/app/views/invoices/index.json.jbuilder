json.array! @result do |invoice|
  json.id invoice.id
  json.price invoice.price
  json.paid_in invoice.paid_in
  json.expires_in invoice.expires_in
  json.group_user do
    json.id invoice.group_user.id
    json.user do
      json.id invoice.group_user.user.id
      json.name invoice.group_user.user.name
    end
  end
end