import childOfGroup from "../services/child-of-group";
import Api from "./api";

class GroupInvoiceService extends Api {
  private endpoint = (groupId: number) => `/groups/${groupId}/group_invoices`;

  async index() {
    const group = childOfGroup.group;
    return (await this.instance.get<GroupInvoice[]>(this.endpoint(group.id))).data;
  }

  async paid(id: number) {
    const group = childOfGroup.group;
    return (await this.instance.post<GroupInvoice>(`${this.endpoint(group.id)}/${id}/paid`)).data;
  }
}

export default new GroupInvoiceService();
