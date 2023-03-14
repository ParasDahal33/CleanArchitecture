import { useEffect } from "react";
import { verifyToken } from "../../pages/login/feature/tokenSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

/**
 * It checks if he user is logged in or not
 *
 * @returns true if user is verified else return false
 */
function useAuth() {
      const dispatch = useAppDispatch();
      const { status } = useAppSelector((sate) => sate.token);

      const checkLoggedIn = async () => {
            await dispatch(verifyToken());
      };

      useEffect(() => {
            checkLoggedIn();
      }, []);

      return { isLoggedIn: status };
}

export default useAuth;
