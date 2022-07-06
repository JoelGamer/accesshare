interface Invoice extends Model {
  price: number;
  expires_in: Date;
  paid_in: Date | null;
}