interface GroupUser extends Model {
  owner: true;
  group: Group;
  user: User;
}