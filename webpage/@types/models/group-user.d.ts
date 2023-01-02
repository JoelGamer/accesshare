interface GroupUser extends RailsModel {
  group: Group;
  user: User;
  owner: boolean;
}