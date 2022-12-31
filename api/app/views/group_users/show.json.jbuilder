json.id @group_user.id
json.group do
  json.id @group_user.group.id
  json.name @group_user.group.name
end
json.user do
  json.id @group_user.user.id
  json.name @group_user.user.name
  json.username @group_user.user.username
end
json.owner @group_user.user.owner?