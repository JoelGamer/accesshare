import childOfGroup from '../child-of-group';
import APIService from './api-service';

export default new class InvoiceService extends APIService {
  async index() {
    return (await this.axios.get<Invoice[]>(this.endpoint)).data;
  }

  async show(id: number) {
    return (await this.axios.get<Invoice>(`${this.endpoint}/${id}`)).data;
  }

  async paid(id: number) {
    return (await this.axios.post<Invoice>(`${this.endpoint}/${id}/paid`)).data;
  }

  protected get endpoint() {
    return `/groups/${childOfGroup.group.id}/invoices`;
  }
}
