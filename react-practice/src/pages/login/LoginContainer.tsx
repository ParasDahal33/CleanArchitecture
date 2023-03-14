import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Status } from "../../helpers/constants";
import useAuth from "../../hooks/auth/useAuth";

/**
 * @Component LoginContainer
 * - It checks if user is logged in or not
 * - If logged in redirect to dashboard
 * - If not logged in display login page or forget-password page according to user request
 *
 * @returns login or forgetPassword or confirmEmail page
 */
function LoginContainer() {
      const { isLoggedIn } = useAuth();

      //move to dashboard if user is already logged in
      if (isLoggedIn === Status.Succeeded) return <Navigate to='/' replace/>;

      if (isLoggedIn === Status.Loading) return <Spinner text='Loading...'/>;

      return <Outlet />;
}

export default LoginContainer;
