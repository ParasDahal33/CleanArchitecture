import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IChangePassword } from "../../model/authModel";
import { IEditProfileRequest } from "../../model/profileModel";
import { closeSwalLoading, errorToastMessage, loadingSwalMessage, successToastMessage } from "../../utils/toastMessage";
import { changePasswordRequest, editProfileRequest, getLoggedInUser } from "../../pages/profile/feature/ProfileRequest";

function useProfileApiRequest() {
      const dispatch = useAppDispatch();
      const profileInfo = useAppSelector((state) => state.profile);


      const fetchLoggedInUser = async () => {
            await dispatch(getLoggedInUser())
                  .unwrap()
                  .catch((message) => {
                        errorToastMessage(message);
                  });
      };

      const editLoggedInUserProfile = async (data: IEditProfileRequest) => {
            loadingSwalMessage();

            await dispatch(editProfileRequest(data))
                  .unwrap()
                  .then(() => {
                        successToastMessage({ title: 'Update', message: 'Profile Updated successfully !!' })
                  })
                  .catch((message) => {
                        closeSwalLoading();

                        errorToastMessage(message);

                        throw new Error(message);
                  });
      };

      const changeLoggedInUserProfile = async (passwordData: IChangePassword) => {
            loadingSwalMessage();

            await dispatch(changePasswordRequest(passwordData))
                  .unwrap()
                  .then(() => {
                        Swal.fire({
                              title: "Password Changed !!",
                              text: "Your password has been set. Use it while logging in.",
                              icon: "success",
                              confirmButtonText: "OK",
                              confirmButtonColor: "#0d6efd",
                              allowOutsideClick: false,
                              backdrop: false,
                        })
                  })
                  .catch((message) => {
                        closeSwalLoading();

                        errorToastMessage('Invalid password information !!');

                        throw new Error(message);
                  });
      };

      return { profileInfo, fetchLoggedInUser, editLoggedInUserProfile, changeLoggedInUserProfile } as const;
}

export default useProfileApiRequest;
