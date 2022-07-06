import childOfGroup from '../services/child-of-group';
import Api from './api';

class AccountService extends Api {
  private endpoint = (id: number) => `/groups/${id}/accounts`;

  async index() {
    const group = childOfGroup.group;
    return (await this.instance.get<Account[]>(this.endpoint(group.id))).data;
  }

  async create(account: CreateAccount) {
    const group = childOfGroup.group;
    return (await this.instance.post<Account>(this.endpoint(group.id), { account: account })).data;
  }

  async destroy(id: number) {
    const group = childOfGroup.group;
    return (await this.instance.delete<Account>(`${this.endpoint(group.id)}/${id}`)).data;
  }
}

export default new AccountService();

interface CreateAccount extends Pick<Account, 'email' | 'name'> {
  password: string;
}
