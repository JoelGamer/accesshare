import APIService from './api-service';

interface LoginParams {
  email: string;
  password: string;
}

interface CreateParams {
  name: string;
  username: string;
  password: string;
  email: string;
}

export default new class UserService extends APIService {
  private endpoint = '/users';

  async me() {
    return (await this.axios.get<User>(`${this.endpoint}/me`)).data;
  }

  async login(params: LoginParams) {
    return (await this.axios.post<UserCredentials>(`${this.endpoint}/login`, { user: params })).data;
  }

  async create(params: CreateParams) {
    return (await this.axios.post<User>(this.endpoint, { user: params })).data;
  }
}
