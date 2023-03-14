import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResetImg from "../../../assets/image/reset.png";
import SetPasswordForm from "../component/SetPasswordForm";
import useAuthApiRequest from "../../../hooks/auth/useAuthApiRequest";

function ResetPassword() {
      const navigate = useNavigate();
      const { resetPassword } = useAuthApiRequest();

      return (
            <span className="xl:flex xl:flex-row xl:justify-center sm:h-[90%]">
                  <div
                        className="mt-[2rem] flex flex-col justify-evenly gap-5 h-4/6 w-full text-default
                              sm:flex-row sm:justify-center
                              xl:w-[80rem]
                        "
                  >
                        <section
                              className="login-img__container w-[20rem] h-fit object-cover self-center
                                    sm:w-[36rem]
                                    xl:w-[50rem]
                                    xl:pt-20
                              "
                        >
                              <img
                                    id="reset-password-img"
                                    className="w-full h-full"
                                    src={ResetImg}
                                    alt="reset-password-img"
                              />
                        </section>

                        <section
                              className="login-input__container flex flex-col  justify-center gap-5 p-0 m-0
                                    xl:w-[50rem] xl:gap-10    
                              "
                        >
                              <header className="tracking-wide flex flex-col gap-2">
                                    <h1
                                          className="font-bold text-4xl
                                                xl:text-6xl
                                                
                                          "
                                    >
                                          Reset Password?
                                    </h1>

                                    <h4
                                          className="text-base 
                                                xl:text-2xl
                                          "
                                    >
                                          Enter your new password.
                                    </h4>
                              </header>

                              <main className="flex flex-col gap-3">
                                    <SetPasswordForm
                                          formSubmitAction={resetPassword}
                                          buttonName="Reset Password"
                                    />
                              </main>

                              <h6 className="flex flex-col 2sm:flex-row sm:flex-col lg:flex-row  gap-2">
                                    <span className="w-fit">Did you remember your password?</span>
                                    <span
                                          className="text-primary cursor-pointer hover:underline"
                                          onClick={() => {
                                                navigate("/login");
                                          }}
                                    >
                                          Try logging in
                                    </span>
                              </h6>
                        </section>

                        <ToastContainer />
                  </div>
            </span>
      );
}

export default ResetPassword;
