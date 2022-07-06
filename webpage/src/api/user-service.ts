import Api from './api';

class UserService extends Api {
  private endpoint = '/users'

  async me() {
    return (await this.instance.get<User>(`${this.endpoint}/me`)).data
  }

  async login(params: UserCredentials) {
    return (await this.instance.post<UserSession>(`${this.endpoint}/login`, { user: params })).data;
  }

  async create(params: UserCreate) {
    return (await this.instance.post<User>(this.endpoint, { user: params })).data;
  }

  async update(id: number, params: UserUpdate) {
    return (await this.instance.put<User>(`${this.endpoint}/${id}`, { user: params })).data;
  }
}

export default new UserService();

interface UserCreate extends Pick<User, 'name' | 'email' | 'username'> {
  password: string;
}

interface UserUpdate extends Pick<User, 'name' | 'email' | 'username'> {
  password: string;
}
