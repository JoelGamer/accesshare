interface User extends Model {
  name: string;
  email: string;
  username: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface UserSession extends Omit<User, 'created_at' | 'updated_at'> {
  token: string;
}
