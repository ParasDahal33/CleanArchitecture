import { Outlet, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../helpers/ProtectedRoute";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/status/NotFound";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginContainer from "../pages/login/LoginContainer";
import PasswordChange from "../pages/profile/PasswordChange";
import ProfileContainer from "../pages/profile/ProfileContainer";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import ConfirmEmail from "../pages/setPassword/confirmEmail/ConfirmEmail";
import ResetPassword from "../pages/setPassword/resetPassword/ResetPassword";
import Users from "../pages/users/Users";

export default function AppRoutes() {
      return (
            <Routes>
                  <Route path="/login" element={<LoginContainer />}>
                        <Route index element={<LoginPage />} />

                        <Route path="forget-password" element={<ForgetPassword />} />

                        <Route path="resetPassword" element={<ResetPassword />} />

                        <Route path="confirmEmail" element={<ConfirmEmail />} />
                  </Route>

                  <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Outlet />}>
                              <Route index element={<Dashboard />} />

                                    
                              <Route
                                                path="users"
                                                element={<Users />}>

                              </Route>

                              <Route path="profile" element={<ProfileContainer />}>
                                    <Route index element={<Profile />} />

                                    <Route path="change-password" element={<PasswordChange />} />
                              </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                  </Route>
            </Routes>
      );
}
