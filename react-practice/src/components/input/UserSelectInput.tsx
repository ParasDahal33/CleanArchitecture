import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IUser } from "../../model/userModel";
import UserSelectModal from "../../pages/users/component/UserSelectModal";
import InvalidMessage from "../error/InvalidMessage";
import RequiredIcon from "../RequiredIcon";

interface IUserSelectInput {
      label?: string;
      haveError: boolean;
      errorMessage: string | undefined;
      children: UseFormRegisterReturn<string>;
      selectedUserData: IUser | null;
      submitSelectedUser: (user: IUser) => void;
      isReset?: boolean;
}

function UserSelectInput({
      children,
      haveError,
      errorMessage = "Should be selected !!",
      label = "User",
      submitSelectedUser,
      selectedUserData,
      isReset,
}: IUserSelectInput) {
      const [toShowUserModal, setToShowUserModal] = useState<boolean>(false);
      const [selectedUser, setSelectedUser] = useState<IUser | null>(selectedUserData);

      const showModalHandler = (): void => {
            setToShowUserModal((prevState) => !prevState);
      };

      useEffect(() => {
            // it check if the parent form is being refreshed/reset
            if (!isReset) return;

            setSelectedUser(selectedUserData);
      }, [isReset]);

      return (
            <>
                  <div className="w-full flex flex-col gap-1">
                        <section className="flex gap-1">
                              <label htmlFor="user" className="tracking-wide font-semibold">
                                    {label}&nbsp;
                                    <RequiredIcon />
                              </label>

                              <InvalidMessage toShow={haveError} message={errorMessage} />
                        </section>

                        <input id="user" type="text" hidden={true} {...children} />

                        <section
                              id="user"
                              className="w-full p-0 m-0 bg-white border border-mute-gray rounded-md cursor-pointer"
                              onClick={(e) => {
                                    e.preventDefault();

                                    setToShowUserModal((prevState) => !prevState);
                              }}
                        >
                              <button
                                    type="button"
                                    className="mt-0 mb-0 px-3 py-[0.375rem] uppercase rounded-l-md  tracking-wide bg-mute-gray text-default"
                              >
                                    Select
                              </button>

                              <input
                                    readOnly
                                    type="text"
                                    className="mt-0 mb-0 ml-2 cursor-pointer outline-none focus-within:ring-0"
                                    placeholder="Select User (staff)"
                                    value={selectedUser?.fullName}
                              ></input>
                        </section>
                  </div>

                  {toShowUserModal && (
                        <UserSelectModal
                              isModalOpen={toShowUserModal}
                              closeModal={showModalHandler}
                              selectedUserId={selectedUser?.userId}
                              userSelectHandler={(user) => {
                                    submitSelectedUser(user);

                                    /**
                                     * setting it to state so that
                                     * selected user can be shown from select input
                                     */
                                    setSelectedUser(user);
                              }}
                        />
                  )}
            </>
      );
}

export default UserSelectInput;
