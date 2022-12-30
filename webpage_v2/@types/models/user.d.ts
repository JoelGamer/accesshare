interface User extends RailsModel {
  name: string;
  username: string;
  email: string;
}

interface UserCredentials {
  token: string;
}