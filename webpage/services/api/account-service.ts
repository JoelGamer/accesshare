import childOfGroup from '../child-of-group';
import APIService from './api-service';

interface CreateParams {
  name:string;
  email: string;
  password: string;
  price: number;
}

export default new class AccountService extends APIService {
  async index() {
    return (await this.axios.get<Account[]>(this.endpoint)).data;
  }

  async show(id: number) {
    return (await this.axios.get<Account>(`${this.endpoint}/${id}`)).data;
  }

  async create(params: CreateParams) {
    return (await this.axios.post<Account>(this.endpoint, { account: params })).data;
  }

  async password(id: number) {
    return (await this.axios.get<AccountPassword>(`${this.endpoint}/${id}/password`)).data;
  }

  async generatePassword(id: number) {
    return (await this.axios.post(`${this.endpoint}/${id}/generate_password`)).data;
  }

  async destroy(id: number) {
    return (await this.axios.delete<Account>(`${this.endpoint}/${id}`)).data;
  }

  protected get endpoint() {
    return `/groups/${childOfGroup.group.id}/accounts`;
  }
}