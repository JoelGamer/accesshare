import childOfGroup from "../services/child-of-group";
import Api from "./api";

class GroupUserService extends Api {
  private endpoint = (groupId: number) => `/groups/${groupId}/group_users`;

  async index() {
    const group = childOfGroup.group;
    return (await this.instance.get<GroupUser[]>(this.endpoint(group.id))).data;
  }

  async create(params: CreateParams) {
    const group = childOfGroup.group;
    return (await this.instance.post<GroupUser>(this.endpoint(group.id), { user: params })).data;
  }
}

export default new GroupUserService();

interface CreateParams {
  email: string;
}
