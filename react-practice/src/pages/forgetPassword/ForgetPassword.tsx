import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import useAuthApiRequest from "../../hooks/auth/useAuthApiRequest";
import { resetToInitialState } from "./feature/forgetPasswordSlice";
import { REGEX } from "../../helpers/regex";
import Input from "../../components/input/Input";
import forgetImg from "../../assets/image/forget.png";
import { IForgetPasswordModel } from "../../model/authModel";

function ForgetPassword() {
      const navigate = useNavigate();
      const dispatch = useAppDispatch();
      const { forgetPassword } = useAuthApiRequest();

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<IForgetPasswordModel>();

      const formSubmitHandler = (resetData: IForgetPasswordModel) => {
            forgetPassword(resetData);
      };

      useEffect(() => {
            /**
             * move state to initial state when component unmount
             */
            return () => {
                  dispatch(resetToInitialState());
            };
      });

      return (
            <span className="xl:flex xl:flex-row xl:justify-center">
                  <div
                        className="login__container  mt-[2rem] flex flex-col justify-evenly gap-5 h-4/6 w-full
                        sm:mt-0
                        sm:flex-row sm:justify-center
                        xl:h-5/6
                        xl:w-[80rem]
                        2xl:w-[90rem]
                  "
                  >
                        <section
                              className="login-img__container w-[20rem] h-fit object-cover self-center
                                    sm:w-[36rem]
                                    xl:w-[43rem]
                              "
                        >
                              <img
                                    id="forget-password-img"
                                    className="w-full h-full"
                                    src={forgetImg}
                                    alt="forget-password-img"
                              />
                        </section>

                        <section
                              className="login-input__container flex flex-col  justify-start gap-5 p-0 m-0 sm:mt-28
                                    xl:w-[40rem] xl:gap-10    
                              "
                        >
                              <header className="tracking-wide flex flex-col gap-1">
                                    <h1
                                          className="font-bold text-4xl
                                                xl:text-6xl
                                                2xl:text-7xl
                                          "
                                    >
                                          Forgot Password?
                                    </h1>

                                    <h4
                                          className="text-base 
                                                xl:text-lg 2xl:mt-2
                                          "
                                    >
                                          Enter the email address associated with your account.
                                    </h4>
                              </header>

                              <main className="flex flex-col gap-3">
                                    <form
                                          className="xl:flex xl:flex-col xl:gap-1"
                                          onSubmit={handleSubmit(formSubmitHandler)}
                                    >
                                          <Input
                                                label="Email"
                                                id="email"
                                                haveError={!!errors.email}
                                                errorMessage={errors.email?.message}
                                                isRequired={true}
                                          >
                                                {register("email", {
                                                      required: {
                                                            value: true,
                                                            message: "Cannot be empty !!",
                                                      },
                                                      setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                                      pattern: {
                                                            value: REGEX.Email,
                                                            message: "Invalid !!",
                                                      },
                                                })}
                                          </Input>

                                          <button
                                                className="w-full mt-1 py-2 bg-primary rounded-md uppercase tracking-wider text-white font-medium"
                                                type="submit"
                                          >
                                                reset password
                                          </button>
                                    </form>

                                    <h6>
                                          Did you remember your password?&nbsp;
                                          <a
                                                className="text-primary cursor-pointer underline"
                                                onClick={() => navigate("/login")}
                                          >
                                                Try logging in
                                          </a>
                                    </h6>
                              </main>
                        </section>

                        <ToastContainer />
                  </div>
            </span>
      );
}

export default ForgetPassword;
