import childOfGroup from '../child-of-group';
import APIService from './api-service';

export default new class GroupUserService extends APIService {
  async index() {
    return (await this.axios.get<GroupUser[]>(this.endpoint)).data;
  }

  async show(id: number) {
    return (await this.axios.get<GroupUser>(`${this.endpoint}/${id}`)).data;
  }

  protected get endpoint() {
    return `/groups/${childOfGroup.group.id}/group_users`;
  }
}
