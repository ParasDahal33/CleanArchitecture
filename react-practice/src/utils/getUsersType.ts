/**
 * @function getUsersType
 * - It is used in getting, adding users { in helper/api  folder}
 *
 * - it is used to determine if user want to see or add user type staff, client or other
 */

import { UserType } from "../helpers/constants";

export const getUsersType = () => {
      const currentPathName: string = window.location.pathname.toLocaleLowerCase();

      if (currentPathName.includes("user-logins/staff")) return UserType.Staff;

      if (currentPathName.includes("user-logins/client")) return UserType.Client;

      // by default user type is Staff
      return UserType.Staff;
};
