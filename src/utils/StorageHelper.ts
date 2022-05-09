export const TOKEN_KEY = 'token';

export class StorageHelper {
  static setInLocalStorage(key: string, data: any) {
    const stringData = JSON.stringify(data);
    localStorage.setItem(key, stringData);
  }

  static setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken() {
    const token: string = localStorage.getItem(TOKEN_KEY);
    return token;
  }
}
