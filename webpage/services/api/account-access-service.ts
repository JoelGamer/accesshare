import childOfGroup from '../child-of-group';
import APIService from './api-service';

interface CreateParams {
  account_id: number;
}

export default new class AccountAccessService extends APIService {
  async index(groupUserId: number) {
    return (await this.axios.get<AccountAccess[]>(this.endpoint(groupUserId))).data;
  }

  async show(groupUserId: number, id: number) {
    return (await this.axios.get<AccountAccess>(`${this.endpoint(groupUserId)}/${id}`)).data;
  }

  async create(groupUserId: number, params: CreateParams) {
    return (await this.axios.post<AccountAccess>(this.endpoint(groupUserId), { account_access: params })).data;
  }

  async destroy(groupUserId: number, id: number) {
    return (await this.axios.delete<AccountAccess>(`${this.endpoint(groupUserId)}/${id}`)).data;
  }

  protected endpoint(groupUserId: number) {
    return `/groups/${childOfGroup.group.id}/group_users/${groupUserId}/permissions`;
  }
}
