export default abstract class LocalStorageService {
    private static ACCESS_TOKEN: string = "HamroServiceAdmin";
  
    static clearTokens() {
      localStorage.clear();
    }
  
    static setAccessToken(token: string): void {
      localStorage.setItem(this.ACCESS_TOKEN, token);
    }
  
    static getAccessToken(): string | null {
      return localStorage.getItem(this.ACCESS_TOKEN);
    }
  }
  