import axios from 'axios';
import userSession from '../user-session';

const baseURL = 'http://localhost:3000';

export default class APIService {
  protected responseToHash<T extends RailsModel>(model: T, hash: Hash<T> = {} as Hash<T>) {
    hash[model.id as T['id']] = model;
    return hash;
  }

  protected arrayResponseToHash<T extends RailsModel>(enumerable: T[]) {
    return enumerable.reduce<Hash<T>>((hash, model) => {
      return this.responseToHash(model, hash);
    }, {} as Hash<T>);
  }

  protected get axios() {
    return axios.create({
      baseURL: baseURL,
      headers: { 'Authorization': userSession.token, 'Accept': 'application/json' }
    });
  }
}