const BASE = "/";

export class Api {
  public async getUserData(): Promise<any> {
    try {
      let response = await fetch(`${BASE}data.json`);
      return await response.json();
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
