import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/input/Input";
import StatusInput from "../../../components/input/StatusInput";
import { Modal, ModalFooter } from "../../../components/modal/Modal";
import RoleSelectInput from "../../../components/input/DropDownInput";
import StaffSelectInput from "../../../components/input/StaffSelectInput";
import ClientSelectInput from "../../../components/input/ClientSelectInput";
import { AddButtons, UpdateButtons } from "../../../components/buttons/ModalButtons";
import { useURLQuery } from "../../../hooks/common/useURLQuery";
import useUserApiRequest from "../../../hooks/users/useUserApiRequest";
import { REGEX } from "../../../helpers/regex";
import CanView from "../../../helpers/CanView";
import { FieldStatus, UserRole, UserStatus, UserType } from "../../../helpers/constants";
import { getUsersType } from "../../../utils/getUsersType";
import { changeStatusToNumberIf } from "../../../utils/changeStatusType";
import { IStaff } from "../../../model/staffModel";
import { IClient } from "../../../model/clientModel";
import { IAddEditActionState2 } from "../../../model/actionModel";
import { IUserRequestModel, IUserSearchData, IUsersResponseModel } from "../../../model/userModel";

type UserDetailProps = {
      closeModal: () => void;
      addEditAction: IAddEditActionState2<IUsersResponseModel>;
};

export default function UserModal({
      closeModal,
      addEditAction: { selectedData: selectedUser, toShow, type: modalFor },
}: UserDetailProps) {
      const {
            reset,
            register,
            setValue,
            handleSubmit,
            getValues,
            formState: { errors },
      } = useForm<IUserRequestModel>();
      const { addNewUser, editUser } = useUserApiRequest();
      const { clearURLQuery } = useURLQuery<IUserSearchData>();

      const formSubmitHandler = (newUser: IUserRequestModel) => {
            newUser.userName = newUser.email;
            newUser.userType = getUsersType();

            addNewUser(newUser).then(() => {
                  closeModal();

                  clearURLQuery();
            });
      };

      /**
       * @function formUpdateHandler
       * - handle submit button of form
       *
       * @param {IUserRequestModel}updatedUser
       *
       * @returns void
       */
      const formUpdateHandler = (updatedUser: IUserRequestModel): void => {
            // unable to update if staff is not selected
            if (selectedUser == null) return;

            //due to form does not store id of user
            updatedUser.userId = selectedUser.userId;
            //api required status as int and form return string
            updatedUser.userStatus = changeStatusToNumberIf(updatedUser.userStatus);
            updatedUser.userType = selectedUser.userType;
            //if the user does not select the client then old clientId will be provided
            updatedUser.clientId = updatedUser.clientId || selectedUser?.clientId;
            //if the user does not select the staff then old staffId will be provided
            updatedUser.staffId = updatedUser.staffId || selectedUser?.staffId;

            editUser(updatedUser).then(() => {
                  closeModal();
            });
      };

      //get the value selected from staff select input and set to form
      const staffSelectionHandler = (staff: IStaff) => {
            if (staff.fullName === undefined) return;

            setValue("staffId", staff.staffId, { shouldValidate: true });
            setValue("fullName", staff.fullName, { shouldValidate: true });
            // auto fill email while selecting staff
            setValue("email", staff.email || "", { shouldValidate: true });
      };

      //get the value selected from client select input and set to form
      const clientSelectionHandler = (client: IClient) => {
            if (client.clientName === undefined) return;

            setValue("clientId", client.id, { shouldValidate: true });
            setValue("fullName", client.clientName, { shouldValidate: true });
      };

      useEffect(() => {
            return () => {
                  reset();
            };
      }, []);

      return (
            <Modal
                  size="w-[40%]"
                  toShow={toShow}
                  title={`${modalFor === FieldStatus.Add ? "Add new" : "Edit"} User`}
                  closeHandler={closeModal}
            >
                  <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <section className="flex flex-col gap-4 mb-5">
                              {modalFor === FieldStatus.Edit && (
                                    <Input
                                          id="user-name"
                                          label="Username"
                                          isRequired={true}
                                          haveError={!!errors.userName}
                                          errorMessage={errors.userName?.message}
                                    >
                                          {register("userName", {
                                                required: {
                                                      value: true,
                                                      message: "Cannot be empty !!",
                                                },
                                                setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                                value: selectedUser?.userName,
                                                maxLength: {
                                                      value: 100,
                                                      message: "Cannot be bigger than 100 characters.",
                                                },
                                          })}
                                    </Input>
                              )}

                              <CanView onlyIf={getUsersType() === UserType.Staff}>
                                    <StaffSelectInput
                                          selectedStaffData={{
                                                staffId: selectedUser?.staffId,
                                                fullName: selectedUser?.fullName,
                                          }}
                                          isReset={getValues("staffId") === undefined}
                                          haveError={!!errors.staffId}
                                          errorMessage={errors.staffId?.message}
                                          submitSelectedStaff={staffSelectionHandler}
                                    >
                                          {register("staffId", {
                                                required: {
                                                      value: true,
                                                      message: "Should be selected !!",
                                                },
                                                value:
                                                      getUsersType() === UserType.Staff
                                                            ? selectedUser?.staffId
                                                            : 0, //0 means not selected
                                          })}
                                    </StaffSelectInput>
                              </CanView>

                              <CanView onlyIf={getUsersType() === UserType.Client}>
                                    <ClientSelectInput
                                          isReset={getValues("clientId") === undefined}
                                          haveError={!!errors.clientId}
                                          errorMessage={errors.clientId?.message}
                                          selectedClientPrev={{
                                                id: selectedUser?.clientId,
                                                clientName: selectedUser?.fullName,
                                          }}
                                          submitSelectedClient={clientSelectionHandler}
                                    >
                                          {register("clientId", {
                                                required: {
                                                      value: true,
                                                      message: "Should be selected !!",
                                                },
                                                value:
                                                      getUsersType() === UserType.Client
                                                            ? selectedUser?.clientId
                                                            : 0, //0 means not selected
                                          })}
                                    </ClientSelectInput>
                              </CanView>

                              <CanView onlyIf={getUsersType() === UserType.Client}>
                                    <Input
                                          id="full-name"
                                          label="Full Name"
                                          isRequired={true}
                                          haveError={!!errors.fullName}
                                          errorMessage={errors.fullName?.message}
                                    >
                                          {register("fullName", {
                                                required: {
                                                      value: true,
                                                      message: "Cannot be empty !!",
                                                },
                                                setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                                value: selectedUser?.fullName,
                                                maxLength: {
                                                      value: 100,
                                                      message: "Cannot be bigger than 100 characters. !!",
                                                },
                                          })}
                                    </Input>
                              </CanView>

                              <Input
                                    label="Email"
                                    id="user-email"
                                    isRequired={true}
                                    haveError={!!errors.email}
                                    errorMessage={errors.email?.message}
                              >
                                    {register("email", {
                                          required: {
                                                value: true,
                                                message: "Cannot be empty !!",
                                          },
                                          setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                          value: selectedUser?.email,
                                          pattern: {
                                                value: REGEX.Email,
                                                message: "Invalid !!",
                                          },
                                    })}
                              </Input>

                              {modalFor === FieldStatus.Edit && (
                                    <StatusInput
                                          label="User Status"
                                          id="user-status"
                                          status={UserStatus}
                                          haveError={!!errors.userStatus}
                                          errorMessage={errors.userStatus?.message}
                                    >
                                          {register("userStatus", {
                                                required: {
                                                      value: true,
                                                      message: "Cannot be empty !!",
                                                },
                                                value: selectedUser?.userStatus,
                                          })}
                                    </StatusInput>
                              )}

                              <RoleSelectInput
                                    label="User Role"
                                    id="user-role"
                                    status={UserRole}
                                    haveError={!!errors.role}
                                    errorMessage={errors.role?.message}
                              >
                                    {register("role", {
                                          required: {
                                                value: true,
                                                message: "Should be selected !!",
                                          },
                                          value: selectedUser?.role,
                                    })}
                              </RoleSelectInput>
                        </section>

                        <ModalFooter>
                              <>
                                    {modalFor === FieldStatus.Add && (
                                          <AddButtons
                                                closeModal={closeModal}
                                                submitHandler={handleSubmit(formSubmitHandler)}
                                          />
                                    )}

                                    {modalFor === FieldStatus.Edit && (
                                          <UpdateButtons
                                                reset={reset}
                                                closeModal={closeModal}
                                                updateHandler={handleSubmit(formUpdateHandler)}
                                          />
                                    )}
                              </>
                        </ModalFooter>
                  </form>
            </Modal>
      );
}
