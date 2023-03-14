import { Modal } from "../../../components/modal/Modal";
import NoDataMessage from "../../../components/NoDataMessage";
import { getUsersType } from "../../../utils/getUsersType";
import changeDateFormat from "../../../utils/changeDateFormat";
import useUserApiRequest from "../../../hooks/users/useUserApiRequest";
import { IUsersResponseModel } from "../../../model/userModel";
import { IAddEditActionState2 } from "../../../model/actionModel";
import CanView from "../../../helpers/CanView";
import { UserStatus, EmailConfirm, UserType } from "../../../helpers/constants";

interface IUserViewModalProps {
      closeModal: () => void;
      addEditAction: IAddEditActionState2<IUsersResponseModel>;
}

function UserViewModal({ addEditAction: { toShow, selectedData }, closeModal }: IUserViewModalProps) {
      const { reconfirmEmailRequest } = useUserApiRequest();

      //if user is not selected, return no data message
      if (selectedData === null)
            return (
                  <NoDataMessage
                        message={"No data found selected !!"}
                        haveData={false}
                        isStatusSucceed={true}
                  />
            );

      return (
            <Modal
                  size="w-[50%]"
                  toShow={toShow}
                  title="User logged-in Information"
                  closeHandler={closeModal}
            >
                  <main className="px-1 flex flex-col gap-6">
                        <section>
                              <header className="w-auto bg-primary-mute-xl text-default">
                                    <p className="p-3 mb-4 font-bold text-2xl">Personal Information</p>
                              </header>

                              <article
                                    className="flex flex-col gap-4 
                                          sm:px-6
                                    "
                              >
                                    <span>
                                          <h5 className="font-bold">User Name</h5>

                                          <p className="m-0 mt-1 ">{selectedData.userName}</p>
                                    </span>

                                    <section className="flex flex-col justify-between sm:flex-row">
                                          <span>
                                                <h5 className="font-bold">Full Name</h5>

                                                <p className="m-0 mt-1 ">{selectedData.fullName}</p>
                                          </span>

                                          <span>
                                                <h5 className="font-bold">Email</h5>

                                                {/* <p className="m-0 mt-1 justify-between"> */}
                                                <a
                                                      className="text-link underline m-0 mt-1"
                                                      href={`mailto:${selectedData?.email}`}
                                                >
                                                      {selectedData.email}
                                                </a>
                                          </span>
                                    </section>
                              </article>
                        </section>

                        <section>
                              <header className="w-auto bg-primary-mute-xl text-default">
                                    <p className="p-3 mb-4 font-bold text-2xl">Employment Information</p>
                              </header>

                              <article
                                    className="flex flex-col justify-between gap-4
                                          sm:flex-row sm:px-6 sm:gap-8
                                    "
                              >
                                    <section className="flex flex-col gap-6">
                                          <span>
                                                <h5 className="font-bold">Email Confirmed</h5>
                                                {selectedData.emailConfirmed && (
                                                      <p className="m-0 mt-1 font-semibold text-success">
                                                            {EmailConfirm[`${selectedData.emailConfirmed}`]}
                                                      </p>
                                                )}

                                                {!selectedData.emailConfirmed && (
                                                      <span className="flex flex-col">
                                                            <p className="m-0 mt-1 font-semibold text-warning">
                                                                  {
                                                                        EmailConfirm[
                                                                              `${selectedData.emailConfirmed}`
                                                                        ]
                                                                  }
                                                            </p>

                                                            <p
                                                                  className="text-link w-full text-sm underline cursor-pointer
                                                                        hover:text-link/80
                                                                  "
                                                                  onClick={() =>
                                                                        reconfirmEmailRequest(
                                                                              selectedData.userId
                                                                        )
                                                                  }
                                                            >
                                                                  Resend Confirmation
                                                            </p>
                                                      </span>
                                                )}
                                          </span>

                                          <span>
                                                <h5 className="font-bold">User Type</h5>

                                                <p className="m-0 mt-1 ">{UserType[selectedData.userType]}</p>
                                          </span>
                                    </section>

                                    <section className="flex flex-col gap-6">
                                          <span>
                                                <h5 className="font-bold">User Role</h5>

                                                <p className="m-0 mt-1 ">{selectedData.role}</p>
                                          </span>

                                          <span>
                                                <h5 className="font-bold">User Status</h5>

                                                <p
                                                      className={`m-0 mt-1 font-semibold ${
                                                            selectedData.userStatus === UserStatus.Active
                                                                  ? "text-success"
                                                                  : "text-mute"
                                                      }`}
                                                >
                                                      {UserStatus[selectedData.userStatus]}
                                                </p>
                                          </span>
                                    </section>

                                    <section className="flex flex-col gap-6">
                                          <CanView onlyIf={getUsersType() === UserType.Client}>
                                                <span>
                                                      <h5 className="font-bold">User Client Name</h5>

                                                      <p className="m-0 mt-1 max-w-[11rem]">
                                                            {selectedData.fullName}
                                                      </p>
                                                </span>
                                          </CanView>

                                          <CanView onlyIf={getUsersType() === UserType.Staff}>
                                                <span>
                                                      <h5 className="font-bold">User Department</h5>

                                                      <p className="m-0 mt-1 ">
                                                            {selectedData.departmentName}
                                                      </p>
                                                </span>
                                          </CanView>

                                          <span>
                                                <h5 className="font-bold">Registered By</h5>

                                                <p className="m-0 mt-1 ">{selectedData.createdBy}</p>
                                          </span>
                                    </section>
                              </article>
                        </section>

                        <section>
                              <header className="w-auto bg-primary-mute-xl text-default">
                                    <p className="p-3 mb-4 font-bold text-2xl">Password Information</p>
                              </header>

                              <article
                                    className="flex flex-col justify-between gap-4
                                          sm:px-6 sm:flex-row
                                    "
                              >
                                    <section className="flex flex-col gap-6">
                                          <span>
                                                <h5 className="font-bold">Password Change Date</h5>

                                                <p className="m-0 mt-1">
                                                      {changeDateFormat(
                                                            selectedData.passwordChangeDate.toString()
                                                      )}
                                                </p>
                                          </span>

                                          <span>
                                                <h5 className="font-bold">Password Expiry Date</h5>

                                                <p className="m-0 mt-1">
                                                      {changeDateFormat(selectedData.pwdExpiry.toString())}
                                                </p>
                                          </span>
                                    </section>

                                    <section className="flex flex-col gap-6">
                                          <span>
                                                <h5 className="font-bold">Account Expiry Date</h5>

                                                <p className="m-0 mt-1">
                                                      {changeDateFormat(selectedData.expiryDate.toString())}
                                                </p>
                                          </span>

                                          <span>
                                                <h5 className="font-bold">Account Created Date</h5>

                                                <p className="m-0 mt-1 ">
                                                      {changeDateFormat(
                                                            selectedData.accountCreatedDate.toString()
                                                      )}
                                                </p>
                                          </span>
                                    </section>
                              </article>
                        </section>
                  </main>
            </Modal>
      );
}

export default UserViewModal;
