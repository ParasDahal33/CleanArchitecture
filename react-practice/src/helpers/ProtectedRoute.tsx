import { Navigate, Outlet } from "react-router-dom";
import { Status } from "./constants";
import useAuth from "../hooks/auth/useAuth";
import Spinner from "../components/Spinner";

/**
 * It navigate to login page if user is not logged in
 * else show the required page
 */
export function ProtectedRoute() {
      const { isLoggedIn } = useAuth();

      //move to login page if user is not logged in
      if (isLoggedIn === Status.Failed)  return <Navigate to="/login" replace />;

      if (isLoggedIn === Status.Succeeded) return <Outlet />;

      return <Spinner text="Loading..." />;
}
