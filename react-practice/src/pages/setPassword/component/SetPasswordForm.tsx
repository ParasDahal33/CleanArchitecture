import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import PasswordInput from "../../../components/input/PasswordInput";
import { REGEX } from "../../../helpers/regex";
import { IResetPasswordModel } from "../../../model/authModel";

/**
 * @interface ISetPasswordForm
 *
 * @param formSubmitAction - it describe the api request to hit after form submit is success
 * @param buttonName - name of button in the form
 */
interface ISetPasswordForm {
      formSubmitAction: (resetPasswordData: IResetPasswordModel) => void;
      buttonName: string;
}

function SetPasswordForm({ formSubmitAction, buttonName }: ISetPasswordForm) {
      const {
            register,
            handleSubmit,
            setError,
            formState: { errors },
      } = useForm<IResetPasswordModel>();
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();

      const userId: string | null = searchParams.get("id") || null;
      const token: string | null = searchParams.get("token") || null;

      useEffect(() => {
            /**
             * if id or token from url does not exist navigate to login page
             */
            if (token === null || userId === null) {
                  navigate("/login");
            }
      }, [searchParams]);

      const formSubmitHandler = (resetPasswordData: IResetPasswordModel) => {
            /**
             * form does not contain id and token.
             * it should be get from Url
             */
            if (token === null || userId === null) return;

            resetPasswordData.id = userId;
            resetPasswordData.token = token.replace(/ /g, "+"); // replacing bcz searchParam change `+` sign with space

            /**
             * check if password match with confirm password
             */
            if (resetPasswordData.confirmPassword !== resetPasswordData.password) {
                  setError("password", { type: "custom", message: "Password does not match !" });
                  setError("confirmPassword", { type: "custom", message: "Password does not match !" });

                  return;
            }

            formSubmitAction(resetPasswordData);
      };

      return (
            <form className="text-default" onSubmit={handleSubmit(formSubmitHandler)}>
                  <PasswordInput
                        id="new-password"
                        type="password"
                        label="Password"
                        haveError={!!errors.password}
                        errorMessage={errors.password?.message}
                        showForgetPasswordButton={false}
                        isRequired={true}
                  >
                        {register("password", {
                              required: {
                                    value: true,
                                    message: "Cannot be empty!",
                              },
                              setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                              pattern: {
                                    value: REGEX.PASSWORD,
                                    message: "Should have 8 character with one upper letter, one lower letter, one special character and one number",
                              },
                        })}
                  </PasswordInput>

                  <PasswordInput
                        id="new-password-two"
                        type="password"
                        label="Confirm Password"
                        haveError={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                        isRequired={true}
                        showForgetPasswordButton={false}
                  >
                        {register("confirmPassword", {
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
                        {buttonName.toLocaleUpperCase()}
                  </button>
            </form>
      );
}

export default SetPasswordForm;
