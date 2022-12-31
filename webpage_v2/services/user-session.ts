import { MissingRequirement, Unauthorized } from '../utilities/errors';
import groupService from './api/group-service';
import userService from './api/user-service';
import localStorageService from './local-storage-service';

class UserSession {
  private _token = '';
  private _group: Group | null = null;

  async initialize(token?: string, group?: Group | number) {
    this.initializeSession(token);
    if (!this._token) throw new Unauthorized();

    await userService.me();

    await this.initializeGroup(group);
    if (!this._group) throw new MissingRequirement('Group');
  }

  initializeSession(token?: string) {
    this._token = token || localStorageService.getItem('token') || '';
    if (this._token) localStorageService.setItem('token', this._token);
  }

  async initializeGroup(group?: Group | number) {
    if (group instanceof Object) {
      this._group = group;
    } else {
      const id = group || +(localStorageService.getItem('group-id') || 0);
      if (id) this._group = await groupService.show(id);
    }

    if (this._group) localStorageService.setItem('group-id', this._group.id.toString());
  }

  destroySession() {
    this._token = '';
    this._group = null;

    localStorageService.setItem('token', '');
    localStorageService.setItem('group-id', '');
  }

  get token() {
    return this._token;
  }

  get group() {
    return this._group;
  }
}

export default new UserSession();
