import { Outlet, Route, Routes } from "react-router-dom";
import { UserRole, UserType } from "../helpers/constants";
import RequiredAuthz from "../helpers/RequiredAuthz";
import RequiredAccess from "../helpers/RequiredAccess";
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

                              <Route element={<RequiredAccess allowedUser={UserType.Staff} />}>
                                    
                                    

                                   

                                    <Route path="administration" element={<Outlet />}>
                                          
                                          <Route
                                                path="user-logins"
                                                element={
                                                      <RequiredAuthz
                                                            allowedRoles={[UserRole.Admin, UserRole.Manager]}
                                                      />
                                                }
                                          >
                                                

                                                <Route path="profile" element={<Profile />} />
                                          </Route>
                                    </Route>
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
