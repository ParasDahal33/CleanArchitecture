import { ReactElement } from "react";
import { UserRole } from "./constants";
import useAuthz from "../hooks/auth/useAuthz";

interface IAuthorizationGuard {
      allowedRoles: UserRole[];
      children: ReactElement;
}

function AuthorizationGuard({ allowedRoles, children }: IAuthorizationGuard): ReactElement | null {
      const authz = useAuthz();

      if (allowedRoles.some((role) => authz.roles.includes(role))) return children;

      return null;
}

export default AuthorizationGuard;
