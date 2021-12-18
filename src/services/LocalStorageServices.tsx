interface Role{
  id: number;
  name: string;
  region: {
    id: number,
    name: string,
    slug: string,
    location:{
      lat: number,
      lng: number,
    },
    active: boolean
  }
}

export default abstract class LocalStorageService {
    private static ACCESS_TOKEN: string = "HamroServiceAdmin";
  
    static clearTokens() {
      localStorage.clear();
    }
  
    static setAccessToken(token: string): void {
      localStorage.setItem(this.ACCESS_TOKEN, token);
    }

    static setUserRole(data : Role[]): void {
      localStorage.setItem('Roles', JSON.stringify(data))
    }
  
    static getAccessToken(): string | null {
      return localStorage.getItem(this.ACCESS_TOKEN);
    }

    static getRoles() : Role[] | null {
      const rolesStringified = localStorage.getItem('Roles');
      if (!rolesStringified) return null
      return JSON.parse(rolesStringified) as Role[]
    }
  }
  