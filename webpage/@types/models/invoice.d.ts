interface Invoice extends RailsModel {
  price: number;
  paid_in: Date;
  expires_in: Date;
  group_user: GroupUser;
}