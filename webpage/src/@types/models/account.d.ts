interface Account extends Model {
  name: string;
  email: string;
  price: number;
  has_password: boolean;
}
