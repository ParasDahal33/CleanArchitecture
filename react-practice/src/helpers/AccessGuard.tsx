import { ReactElement } from "react";
import getLoggedinUserType from "../utils/getLoggedinUserType";
import { UserType } from "./constants";

interface IAuthorizationGuard {
      allowedUsers: UserType[];
      children: ReactElement;
}

// Display component only if logged-in user type is permitted, otherwise hide it.
function AccessGuard({ allowedUsers, children }: IAuthorizationGuard): ReactElement | null {
      const loggedInUserType: UserType = getLoggedinUserType();

      if (allowedUsers.includes(loggedInUserType)) return children;

      return null;
}

export default AccessGuard;
