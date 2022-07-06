import childOfGroup from '../services/child-of-group';
import Api from './api';

class AccountService extends Api {
  private endpoint = (groupId: number, accountId: number) => `/groups/${groupId}/accounts/${accountId}/accounts_password`;

  async index(accountId: number) {
    const group = childOfGroup.group;
    return (await this.instance.get<AccountPassword | null>(this.endpoint(group.id, accountId))).data;
  }

  async create(accountId: number) {
    const group = childOfGroup.group;
    return (await this.instance.post<AccountPassword>(this.endpoint(group.id, accountId))).data;
  }
}

export default new AccountService();
