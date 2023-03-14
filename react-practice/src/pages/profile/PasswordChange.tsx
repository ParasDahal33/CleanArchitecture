import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { IChangePassword } from "../../model/authModel";
import ProfilePasswordInput from "./component/ProfilePasswordInput";
import useProfileApiRequest from "../../hooks/profile/useProfileApiRequest";
import { REGEX } from "../../helpers/regex";

function PasswordChange() {
      const {
            reset,
            register,
            setError,
            handleSubmit,
            formState: { errors },
      } = useForm<IChangePassword>();
      const { changeLoggedInUserProfile } = useProfileApiRequest();

      const formSubmitHandler = (changePasswordData: IChangePassword) => {
            //check if password match with confirm password
            if (changePasswordData.confirmPassword !== changePasswordData.password) {
                  setError("password", { type: "custom", message: "Password does not match !!" });
                  setError("confirmPassword", { type: "custom", message: "Password does not match !!" });

                  return;
            }

            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  allowOutsideClick: false,
                  showCancelButton: true,
                  confirmButtonColor: "#0b5ed7",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Change it!",
            }).then((result) => {
                  if (result.isConfirmed) {
                        changeLoggedInUserProfile(changePasswordData).then(() => {
                              reset();
                        });
                  }
            });
      };

      return (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(formSubmitHandler)}>
                  <ProfilePasswordInput
                        label="Current Password"
                        id="current-password"
                        haveError={!!errors.oldPassword}
                        errorMessage={errors.oldPassword?.message}
                  >
                        {register("oldPassword", {
                              required: {
                                    value: true,
                                    message: "Cannot be empty !!",
                              },
                              value: "",
                              setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                              pattern: {
                                    value: REGEX.PASSWORD,
                                    message: "Should have 8 character with one upper letter, one lower letter, one special character and one number !!",
                              },
                        })}
                  </ProfilePasswordInput>

                  <ProfilePasswordInput
                        label="New Password"
                        id="new-password"
                        haveError={!!errors.password}
                        errorMessage={errors.password?.message}
                  >
                        {register("password", {
                              required: {
                                    value: true,
                                    message: "Cannot be empty !!",
                              },
                              value: "",
                              setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                              pattern: {
                                    value: REGEX.PASSWORD,
                                    message: "Should have 8 character with one upper letter, one lower letter, one special character and one number !!",
                              },
                        })}
                  </ProfilePasswordInput>

                  <ProfilePasswordInput
                        label="Confirm Password"
                        id="confirm-password"
                        haveError={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                  >
                        {register("confirmPassword", {
                              required: {
                                    value: true,
                                    message: "Cannot be empty !!",
                              },
                              value: "",
                              setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                        })}
                  </ProfilePasswordInput>

                  <footer>
                        <button
                              type="submit"
                              className="bg-primary text-white tracking-wider rounded-lg p-2 w-full min-w-fit"
                              onClick={handleSubmit(formSubmitHandler)}
                        >
                              Save Change
                        </button>
                  </footer>
            </form>
      );
}

export default PasswordChange;
