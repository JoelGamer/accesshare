interface GroupInvoice extends Model {
  group_user: GroupUser;
  invoice: Invoice;
}