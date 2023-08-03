import { ToastContainer } from "react-toastify";
import ConfirmImg from "../../../assets/image/confirm.png";
import SetPasswordForm from "../component/SetPasswordForm";
import useAuthApiRequest from "../../../hooks/auth/useAuthApiRequest";

function ConfirmEmail() {
      const { confirmEmail } = useAuthApiRequest();

      return (
            <span className="xl:flex xl:flex-row xl:justify-center sm:h-[90%]">
                  <div
                        className="mt-[2rem] flex flex-col justify-evenly gap-5 h-4/6 w-full text-default
                              sm:flex-row sm:justify-center
                              
                              xl:w-[80rem]
                              2xl:w-[80rem]
                        "
                  >
                        <section
                              className="login-img__container w-[20rem] h-fit object-cover self-center
                                    sm:w-[36rem]
                                    xl:w-[50rem]
                              "
                        >
                              <img
                                    id="confirm-email-img"
                                    className="w-full h-full"
                                    src={ConfirmImg}
                                    alt="confirm-email-img"
                              />
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
                                          Confirm Email!
                                    </h1>

                                    <h4
                                          className="text-base 
                                                xl:text-lg
                                          "
                                    >
                                          Welcome to Clean Architecture Project! Please set your new password.
                                    </h4>
                              </header>
                              <main className="flex flex-col gap-3">
                                    <SetPasswordForm formSubmitAction={confirmEmail} buttonName="Set Password" />
                              </main>
                        </section>

                        <ToastContainer />
                  </div>
            </span>
      );
}

export default ConfirmEmail;
