import jwt_decode from "jwt-decode";
import { IJwtModel } from "../model/authModel";
import { cookiesStore } from './cookiesHandler';

/**
 * @function getLoggedinUserFirstName
 * - decrypt jwt token from cookie-store and get recently logged-in username
 *
 * @returns name of user, recently logged-in
 */
function getLoggedinUserFirstName(): string {

      const toCamelCase = (string: string): string => {
            const stringList = string.split('');
            const firstWord = stringList.at(0);
            stringList[0] = firstWord ? firstWord.toUpperCase() : '';

            return stringList.join().replace(/,/g, '');
      }

      const token: string | undefined = cookiesStore.getItem("access_token");
      const jwtToken: IJwtModel = jwt_decode(token!);

      const fullName = jwtToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      const firstName = fullName.split(' ').at(0);

      if (firstName === undefined) return '';

      return toCamelCase(firstName);
}

export default getLoggedinUserFirstName;