import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import RequiredIcon from "../../../components/RequiredIcon";
import InvalidMessage from "../../../components/error/InvalidMessage";

interface IProfilePasswordInput {
      label: string;
      id: string;
      haveError: boolean;
      errorMessage: string | undefined;
      children: UseFormRegisterReturn<string>;
}

function ProfilePasswordInput({ label, id, haveError, errorMessage, children }: IProfilePasswordInput) {
      const [showPassword, setShowPassword] = useState<boolean>(false);

      return (
            <div
                  className="flex flex-col mb-4 pe-4 w-full 
                        sm:flex-row
                  "
            >
                  <section
                        className="sm:align-middle w-64 flex 
                              sm:self-end
                        "
                  >
                        <label htmlFor={id} className="tracking-wide font-semibold">
                              {label}&nbsp;
                              <RequiredIcon />
                        </label>
                  </section>

                  <section className="flex flex-col gap-1 align-middle w-full">
                        <InvalidMessage toShow={haveError} message={errorMessage} />

                        <div
                              id="password-input"
                              className="input__container px-[0.75rem] py-[0.3rem] flex bg-[#FFFFFF] border border-mute-gray rounded-md w-full
                                    focus-within:drop-shadow-sm
                                    focus-within:border-primary
                              "
                        >
                              <input
                                    className="w-full p-0 border-none bg-[#FFFFFF]
                                          focus-within:outline-none
                                          focus-within:border-none
                                    "
                                    id={id}
                                    type={showPassword ? "text" : "password"}
                                    {...children}
                              />

                              <i
                                    id="show-password"
                                    onPointerUp={() => setShowPassword(false)}
                                    onPointerDown={() => setShowPassword(true)}
                                    className={`bi text-primary self-center w-10 p-0 m-0  text-center text-lg cursor-pointer
                                    ${showPassword ? "bi-eye" : "bi-eye-slash"}
                              `}
                              ></i>
                        </div>
                  </section>
            </div>
      );
}

export default ProfilePasswordInput;
