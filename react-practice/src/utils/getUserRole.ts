
/**
 * @function getUsersRole
 * - it return the logged in user role
 */
import jwt_decode from "jwt-decode";
import { UserRole } from "../helpers/constants";
import { IJwtModel } from "../model/authModel";
import { cookiesStore } from "./cookiesHandler";

export const getUsersRole = (): UserRole => {
      const token: string | undefined = cookiesStore.getItem("access_token");

      //by default its user
      if (!token) return UserRole.User;

      const jwtToken: IJwtModel = jwt_decode(token);

      const userRole: UserRole = jwtToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as UserRole

      return userRole;
};
