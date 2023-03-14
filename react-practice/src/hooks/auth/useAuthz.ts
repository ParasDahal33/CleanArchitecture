import jwt_decode from "jwt-decode";
import { UserRole } from "../../helpers/constants";
import { IJwtModel } from "../../model/authModel";
import { cookiesStore } from './../../utils/cookiesHandler';

interface IuseAuthz {
      roles: UserRole[];
      isManager: boolean;
      isAdmin: boolean;
      isUser: boolean;
}

function useAuthz(): IuseAuthz {
      const token: string | undefined = cookiesStore.getItem("access_token");

      let isManager = false;
      let isAdmin = false;
      let isUser = false;

      if (token !== undefined) {
            const jwtToken: IJwtModel = jwt_decode(token);
            const role: UserRole = jwtToken[
                  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] as UserRole;

            // Arranged according to hierarchy 
            isUser = role.includes(UserRole.User);
            isManager = role.includes(UserRole.Manager);
            isAdmin = role.includes(UserRole.Admin);

            return { roles: [role], isManager, isAdmin, isUser };
      }

      return { roles: [], isManager, isAdmin, isUser };
}

export default useAuthz;
