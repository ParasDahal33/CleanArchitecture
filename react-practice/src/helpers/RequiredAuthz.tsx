import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "./constants";
import useAuthz from "../hooks/auth/useAuthz";

interface IRequiredAuthz {
      allowedRoles: UserRole[];
}

function RequiredAuthz({ allowedRoles }: IRequiredAuthz) {
      const authz = useAuthz();

      if (allowedRoles.some((role) => authz.roles.includes(role))) return <Outlet />;

      return <Navigate to="/" replace />;
}

export default RequiredAuthz;
