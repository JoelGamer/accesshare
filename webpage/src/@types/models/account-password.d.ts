interface AccountPassword extends Model {
  password: string;
  expires_in: Date;
  account: Account;
}
