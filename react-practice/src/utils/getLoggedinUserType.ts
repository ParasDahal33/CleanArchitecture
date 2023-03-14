import jwt_decode from "jwt-decode";
import { IJwtModel } from '../model/authModel';
import { cookiesStore } from './cookiesHandler';
import { UserType } from './../helpers/constants';


function getLoggedinUserType(): UserType {
      let loggedInUserType: unknown;
      const token: string | undefined = cookiesStore.getItem("access_token");

      if (!token) return loggedInUserType as UserType;

      const jwtToken: IJwtModel = jwt_decode(token);

      const loggedInUserUserData = jwtToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"];

      const onlyUserType = loggedInUserUserData.replace('UserType : ', '');

      switch (onlyUserType) {
            case 'Client':
                  loggedInUserType = UserType.Client;
                  break;
            case 'Staff':
                  loggedInUserType = UserType.Staff;
                  break;
      }

      return loggedInUserType as UserType;
}

export default getLoggedinUserType