import axios, { AxiosInstance } from "axios";

const baseURL = 'http://localhost:3000';
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiR3VpbGhlcm1lIFRoZW9kb3JvIiwiZW1haWwiOiJndWkudGhlb2Rvcm8yMDEwQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZHJqb2VsIiwiaXAiOiI6OjEifSwiZXhwIjoxNjcyNTE1MTcwfQ.zLGlXjt9c4eMYrk3rFZzjdun8jyoguG9eBbgmgoE1P0';

export default class APIService {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL, headers: { 'Authorization': token, 'Accept': 'application/json' } })
  }

  protected responseToHash<T extends RailsModel>(model: T, hash: Hash<T> = {} as Hash<T>) {
    hash[model.id as T['id']] = model;
    return hash;
  }

  protected arrayResponseToHash<T extends RailsModel>(enumerable: T[]) {
    return enumerable.reduce<Hash<T>>((hash, model) => {
      return this.responseToHash(model, hash);
    }, {} as Hash<T>);
  }
}