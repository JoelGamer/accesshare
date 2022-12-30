import APIService from './api-service';

interface CreateParams {
  name: string;
}

export default new class GroupService extends APIService {
  private endpoint = '/groups';

  async index() {
    return (await this.axios.get<Group[]>(this.endpoint)).data;
  }

  async show(id: number) {
    return (await this.axios.get<Group>(`${this.endpoint}/${id}`)).data;
  }

  async create(params: CreateParams) {
    return (await this.axios.post<Group>(this.endpoint, { user: params })).data;
  }
}
