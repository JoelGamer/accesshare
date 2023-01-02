const LOCAL_STORAGE_PREFIX = 'accshre-ls';

class LocalStorageService {
  setItem(key: string, value: string) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-${key}`, value);
  }

  getItem(key: string) {
    return localStorage.getItem(`${LOCAL_STORAGE_PREFIX}-${key}`);
  }
}

export default new LocalStorageService();
