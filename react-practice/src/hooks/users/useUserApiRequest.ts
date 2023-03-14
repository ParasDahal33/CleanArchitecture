import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
      addUser,
      deleteUser,
      fetchUserByName,
      fetchUsers,
      postReconfirmEmail,
      updateUser,
} from "../../pages/users/feature/userRequest";
import {
      closeSwalLoading,
      errorToastMessage,
      loadingSwalMessage,
      successToastMessage,
} from "../../utils/toastMessage";
import { IUserRequestModel, IUserSearchData } from "../../model/userModel";

/**
 * @customHook useUserApiRequest
 * - It handle api request for users
 *
 * @returns userInfo, getUsers, getUser, deleteUserHandler, updateStatus, editUser
 */
function useUserApiRequest() {
      const dispatch = useAppDispatch();
      const userInfo = useAppSelector((state) => state.users);

      /**
       * @function getUsers
       * - Fetch all users according to page number
       *
       * @param pageNumber - requested page number
       */
      const getUsers = async (searchedData: IUserSearchData) => {
            await dispatch(fetchUsers(searchedData))
                  .unwrap()
                  .catch((message) => {
                        throw new Error(message);
                  });
      };

      /**
       * @function getUser
       * - fetch users' according to user name and page number
       * - change page to 1 if page number not given
       * - display error message in failed.
       *
       * @param searchDetail - detail of searched user i.e. userName and pageNumber
       */
      const getUser = async (searchedData: IUserSearchData) => {
            loadingSwalMessage();

            await dispatch(fetchUserByName(searchedData))
                  .unwrap()
                  .then(() => {
                        closeSwalLoading();
                  })
                  .catch((errorMessage) => {
                        closeSwalLoading();

                        errorToastMessage(errorMessage);

                        throw new Error(errorMessage)
                  });
      };

      

      /**
       * @function addNewUser
       * - Add new user detail
       * - display success message after success.
       * - display error message in failed.
       *
       * @param newUser - detail of user to be added
       */
      const addNewUser = async (newUser: IUserRequestModel) => {
            loadingSwalMessage();

            await dispatch(addUser(newUser))
                  .unwrap()
                  .then(({ message }) => {
                        successToastMessage({ title: "Added!", message: message });
                  })
                  .catch((errorMessage) => {
                        closeSwalLoading();

                        if (errorMessage.errors !== undefined) {

                              errorToastMessage(errorMessage.errors[0]);
                        }

                        throw new Error(errorMessage);
                  });
      };

      /**
       * @function deleteUserHandler
       * - delete users through user id.
       * - display success message after success.
       * - display error message in failed.
       *
       * @param userId - user id of user to be deleted.
       */
      const deleteUserHandler = (userId: string) => {
            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  allowOutsideClick: false,
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                  if (result.isConfirmed) {
                        loadingSwalMessage();

                        dispatch(deleteUser(userId))
                              .unwrap()
                              .then(({ message }) => {
                                    successToastMessage({ title: "Deleted!", message });
                              })
                              .catch((errorMessage) => {
                                    closeSwalLoading();

                                    errorToastMessage(errorMessage);
                              });
                  }
            });
      };


      /**
       * @function editUser
       * - update users' detail.
       * - display success message after success.
       * - display error message in failed.
       *
       * @param updatedUser - detail of users to be updated.
       */
      const editUser = async (updatedUser: IUserRequestModel) => {
            loadingSwalMessage();

            await dispatch(updateUser(updatedUser))
                  .unwrap()
                  .then(({ message }) => {
                        successToastMessage({ title: "Updated!", message });
                  })
                  .catch((errorMessage) => {
                        closeSwalLoading();

                        errorToastMessage(errorMessage);

                        throw new Error(errorMessage);
                  });
      };

      const reconfirmEmailRequest = (userId: string) => {
            Swal.fire({
                  title: "Are you sure?",
                  icon: "warning",
                  allowOutsideClick: false,
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Send confirmation",
            }).then((result) => {
                  if (result.isConfirmed) {
                        loadingSwalMessage();

                        dispatch(postReconfirmEmail({ userId }))
                              .unwrap()
                              .then((({ message }) => {
                                    successToastMessage({ title: "Confirmation successfully forwarded !!", message });
                              }))
                              .catch((message) => {
                                    errorToastMessage(message);
                              });
                  }
            });

      };


      return {
            userInfo,
            getUsers,
            getUser,
            deleteUserHandler,
            editUser,
            addNewUser,
            reconfirmEmailRequest
      } as const;
}

export default useUserApiRequest;
