const BASE = "/"

// export const api = {
//   queryData: async () => {
//     try {
//       let response = await fetch(`${BASE}data.json`),
//       userData = response.json();

//       // return {
//       //   error: false,
//       //   status: response.status,
//       //   data: userData
//       // }

//       throw new Error({response})

//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export class Api {
  public async getUserData(): Promise<any>{
    try {
      let response = await fetch(`${BASE}data.json`)
      return await response.json();
    } catch(error: any){
      return {
        error: true,
        message: error.message
      }
    }

  }
}