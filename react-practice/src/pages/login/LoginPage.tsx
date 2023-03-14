import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import LoginImg from "../../assets/image/login.png";
import { ILoginModel } from "../../model/authModel";
import Input from "../../components/input/Input";
import PasswordInput from "../../components/input/PasswordInput";
import useAuthApiRequest from "../../hooks/auth/useAuthApiRequest";
import { REGEX } from "../../helpers/regex";

function LoginPage() {
      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<ILoginModel>();

      const { login } = useAuthApiRequest();

      return (
            <span className="xl:flex xl:flex-row xl:justify-center">
                  <div
                        className="login__container mt-[4rem] flex flex-col justify-evenly gap-5 h-4/6 w-full
                              sm:flex-row sm:justify-center
                              xl:h-5/6
                              xl:w-[80rem]
                              2xl:w-[90rem]
                        "
                  >
                        <section
                              className="login-img__container w-[20rem] h-fit object-cover self-center
                                    sm:w-[36rem]
                                    xl:w-[50rem]
                              "
                        >
                              <img id="login-img" className="w-full h-full" src={LoginImg} alt="login-img" />
                        </section>

                        <section
                              className="login-input__container flex flex-col  justify-center gap-5 p-0 m-0
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
                                          Welcome
                                    </h1>

                                    <h4
                                          className="text-base 
                                                xl:text-lg
                                          "
                                    >
                                          Login with data that you used during registration
                                    </h4>
                              </header>

                              <main className="flex flex-col gap-3">
                                    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-3">
                                          <Input
                                                id="email"
                                                label="Email"
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

                                          <PasswordInput
                                                id="password"
                                                type="password"
                                                label="Password"
                                                haveError={!!errors.password}
                                                errorMessage={errors.password?.message}
                                                isRequired={true}
                                                showForgetPasswordButton={true}
                                          >
                                                {register("password", {
                                                      required: {
                                                            value: true,
                                                            message: "Cannot be empty!",
                                                      },
                                                      setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                                })}
                                          </PasswordInput>

                                          <button
                                                className="w-full mt-1 py-2 bg-primary rounded-md uppercase tracking-wider text-white font-medium"
                                                type="submit"
                                          >
                                                login
                                          </button>
                                    </form>

                                    <h6>
                                          Don&apos;t have account?&nbsp;
                                          <a
                                                className="text-primary cursor-pointer underline"
                                                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                                          >
                                                contact service provider
                                          </a>
                                    </h6>
                              </main>
                        </section>

                        <ToastContainer />
                  </div>
            </span>
      );
}

export default LoginPage;
