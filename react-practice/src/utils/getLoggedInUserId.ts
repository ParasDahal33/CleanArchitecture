import jwt_decode from "jwt-decode";
import { IJwtModel } from '../model/authModel';
import { cookiesStore } from './cookiesHandler';

function getLoggedInUserId(): string {
      let loggedInUserId = '';
      const token: string | undefined = cookiesStore.getItem("access_token");

      if (!token) return loggedInUserId;

      const jwtToken: IJwtModel = jwt_decode(token);

      loggedInUserId = jwtToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      return loggedInUserId;
}

export default getLoggedInUserId

