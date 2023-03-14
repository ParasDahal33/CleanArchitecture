import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "./constants";
import getLoggedinUserType from "../utils/getLoggedinUserType";

interface IRequiredAccess {
      allowedUser: UserType;
}

// navigate only if logged-in user type is permitted, otherwise navigate to home page.
function RequiredAccess({ allowedUser }: IRequiredAccess): JSX.Element {
      const loggedInUserType: UserType = getLoggedinUserType();

      if (loggedInUserType === allowedUser) return <Outlet />;

      return <Navigate to="/" replace />;
}

export default RequiredAccess;
