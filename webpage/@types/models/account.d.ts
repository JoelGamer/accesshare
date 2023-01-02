interface Account extends RailsModel {
  name: string;
  email: string;
  price: number;
  password_accessible: boolean;
}

interface AccountPassword {
  password: string;
}