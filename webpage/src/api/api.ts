import axios from "axios";
import userSession from "../services/user-session";

class Api {
  private baseURL = 'http://localhost:3000/';

  protected get instance() {
    return axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: userSession.token },
    });
  }
}

export default Api;
