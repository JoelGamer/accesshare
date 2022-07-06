import childOfGroup from "../services/child-of-group";
import Api from "./api";

class GroupUserPermissionService extends Api {
  private endpoint = (groupId: number, groupUserId: number) => `/groups/${groupId}/group_users/${groupUserId}/permissions`;

  async index(groupUserId: number) {
    const group = childOfGroup.group;
    return (await this.instance.get<GroupUserPermission[]>(this.endpoint(group.id, groupUserId))).data;
  }

  async create(groupUserId: number, params: GroupUserPermissionCreateParams) {
    const group = childOfGroup.group;
    return (await this.instance.post<GroupUserPermission>(this.endpoint(group.id, groupUserId), { group_user_permission: params })).data;
  }

  async destroy(groupUserId: number, id: number) {
    const group = childOfGroup.group;
    return (await this.instance.delete<GroupUserPermission>(`${this.endpoint(group.id, groupUserId)}/${id}`)).data;
  }
}

export default new GroupUserPermissionService();

interface GroupUserPermissionCreateParams {
  account_id: number;
}
