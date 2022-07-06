import Api from './api';

class GroupService extends Api {
  private endpoint = '/groups'

  async index() {
    return (await this.instance.get<Group[]>(this.endpoint)).data;
  }

  async show(id: number) {
    return (await this.instance.get<Group>(`${this.endpoint}/${id}`)).data;
  }

  async create(params: CreateGroup) {
    return (await this.instance.post<Group>(this.endpoint, { group: params })).data;
  }
}

export default new GroupService();

interface CreateGroup {
  name: string;
}
