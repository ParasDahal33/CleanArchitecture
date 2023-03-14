import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../pages/login/feature/loginRequest";
import { logoutUser } from "../../pages/login/feature/logoutRequest";
import { resetPasswordRequest } from "../../pages/setPassword/feature/resetPasswordRequest";
import { confirmEmailRequest } from "../../pages/setPassword/feature/confirmPasswordRequest";
import { forgetPasswordRequest } from "./../../pages/forgetPassword/feature/forgetPasswordRequest";
import { cookiesStore } from "../../utils/cookiesHandler";
import { closeSwalLoading, errorToastMessage, loadingSwalMessage } from "../../utils/toastMessage";
import { IForgetPasswordModel, ILoginModel, IResetPasswordModel } from "../../model/authModel";

function useAuthApiRequest() {
      const navigate = useNavigate();
      const dispatch = useAppDispatch();

      const login = async (loginDetail: ILoginModel) => {
            loadingSwalMessage();

            await dispatch(loginUser(loginDetail))
                  .unwrap()
                  .then(() => {
                        navigate("/");

                        closeSwalLoading();
                  })
                  .catch(() => {
                        closeSwalLoading();

                        errorToastMessage('You have entered an invalid email or password!!');
                  });
      };

      const logout = async () => {
            loadingSwalMessage();

            await dispatch(logoutUser())
                  .unwrap()
                  .then(() => {
                        cookiesStore.deleteItem('access_token');

                        navigate("/login");

                        closeSwalLoading();

                        window.location.reload();
                  })
                  .catch((errorMessage) => {
                        closeSwalLoading();

                        errorToastMessage(errorMessage);
                  });
      };


      const forgetPassword = async (forgetPasswordDetail: IForgetPasswordModel) => {
            loadingSwalMessage();

            await dispatch(forgetPasswordRequest(forgetPasswordDetail))
                  .unwrap()
                  .then(({ message }) => {
                        //close loading message
                        closeSwalLoading();

                        Swal.fire({
                              title: "Email confirmed !!",
                              icon: "success",
                              confirmButtonText: "OK",
                              confirmButtonColor: "#0d6efd",
                              backdrop: false,
                              html:
                                    message +
                                    "<br/>" +
                                    "<i className='text-primary alert__subtitle'>If you do not find email. Check spam or Try reset password again</i>",
                        }).then((result) => {
                              //if user click 'OK button more to login page'
                              if (result.isConfirmed) {
                                    navigate("/login");
                              }
                        });
                  })
                  .catch(({ message }) => {
                        //close loading message
                        closeSwalLoading();

                        errorToastMessage(message);
                  });
      };

      const resetPassword = async (resetPasswordDetail: IResetPasswordModel) => {
            loadingSwalMessage();

            await dispatch(resetPasswordRequest(resetPasswordDetail))
                  .unwrap()
                  .then(() => {
                        //close loading message
                        closeSwalLoading();

                        Swal.fire({
                              title: "Password Changed !!",
                              text: "Your password has been set. Use it while logging in.",
                              icon: "success",
                              confirmButtonText: "OK",
                              confirmButtonColor: "#0d6efd",
                              allowOutsideClick: false,
                              backdrop: false,
                        })
                              .then((result) => {
                                    //if user click 'OK button more to login page
                                    if (result.isConfirmed) {
                                          navigate("/login");
                                    }
                              })
                              .finally(() => {
                                    navigate("/login");
                              });
                  })
                  .catch(({ message }) => {
                        //close loading message
                        closeSwalLoading();

                        errorToastMessage(message);
                  });
      };

      const confirmEmail = async (confirmEmailDetail: IResetPasswordModel) => {
            loadingSwalMessage();

            await dispatch(confirmEmailRequest(confirmEmailDetail))
                  .unwrap()
                  .then(({ data }) => {
                        /**
                         * Password should be set after email is confirmed
                         * **/

                        dispatch(resetPasswordRequest({ ...confirmEmailDetail, token: data.resetToken }))
                              .unwrap()
                              .then(() => {
                                    //close loading message
                                    Swal.close();

                                    Swal.fire({
                                          title: "Email confirmed!!",
                                          text: "Your password has been set. Use it while logging in.",
                                          icon: "success",
                                          confirmButtonText: "OK",
                                          confirmButtonColor: "#0d6efd",
                                          allowOutsideClick: false,
                                    })
                                          .then((result) => {
                                                //if user click 'OK button more to login page
                                                if (result.isConfirmed) {
                                                      navigate("/login");
                                                }
                                          })
                                          .finally(() => {
                                                navigate("/login");
                                          });
                              })
                              .catch(() => {
                                    //close loading message
                                    closeSwalLoading();

                                    Swal.fire({
                                          title: "Something went wrong",
                                          text: "Please contact your service provider",
                                          icon: "error",
                                          confirmButtonText: "OK",
                                          confirmButtonColor: "#0d6efd",
                                          backdrop: false,
                                    });
                              });
                  })
                  .catch(() => {
                        //close loading message
                        closeSwalLoading();

                        Swal.fire({
                              title: "Something went wrong",
                              text: "Please contact your service provider",
                              icon: "error",
                              confirmButtonText: "OK",
                              confirmButtonColor: "#0d6efd",
                              backdrop: false,
                        });
                  });
      };

      return { login, logout, forgetPassword, resetPassword, confirmEmail } as const;
}

export default useAuthApiRequest;
