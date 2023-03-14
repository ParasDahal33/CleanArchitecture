import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormRegisterReturn } from "react-hook-form";
import RequiredIcon from "../RequiredIcon";
import InvalidMessage from "../error/InvalidMessage";

interface IInput {
      label: string;
      id: string;
      type?: string;
      isHidden?: boolean;
      haveError: boolean;
      errorMessage: string | undefined;
      isRequired: boolean;
      children: UseFormRegisterReturn<string>;
      showForgetPasswordButton: boolean;
}

function PasswordInput({
      label,
      id,
      type,
      isHidden,
      haveError,
      errorMessage,
      isRequired,
      children,
      showForgetPasswordButton,
}: IInput) {
      const navigate = useNavigate();
      const [showPassword, setShowPassword] = useState<boolean>(false);

      const showPasswordHandler = () => setShowPassword(true);
      const hidePasswordHandler = () => setShowPassword(false);

      return (
            <div className={`${isHidden ? "mb-2" : "mb-4 w-full"} ${haveError ? " error" : ""}`}>
                  <span className="flex justify-between">
                        <section className="flex gap-1">
                              <label htmlFor={id} className="font-[600] tracking-wide fw-semibold">
                                    {label}&nbsp;
                                    {isRequired && <RequiredIcon />}
                              </label>

                              <InvalidMessage toShow={haveError} message={errorMessage} />
                        </section>

                        {showForgetPasswordButton && (
                              <i
                                    className="text-primary cursor-pointer hover:underline"
                                    onClick={() => navigate("forget-password")}
                              >
                                    Forgot Password?
                              </i>
                        )}
                  </span>

                  <div
                        id="password-input"
                        className="input__container px-[0.75rem] py-[0.3rem] flex bg-[#FFFFFF] border border-mute-gray rounded-md
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
                              type={!showPassword ? type : "text"}
                              hidden={isHidden}
                              {...children}
                        />
                        <i
                              id="show-password"
                              onPointerUp={hidePasswordHandler}
                              onPointerDown={showPasswordHandler}
                              className={`bi text-primary self-center w-10 p-0 m-0  text-center text-lg cursor-pointer
                                    ${showPassword ? "bi-eye" : "bi-eye-slash"}
                              `}
                        ></i>
                  </div>
            </div>
      );
}

export default PasswordInput;
