import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../components/Spinner";
import ProfileText from "./component/ProfileText";
import InvalidMessage from "../../components/error/InvalidMessage";
import WentWrongMessage from "../../components/error/WentWrongMessage";
import changeDateFormat from "../../utils/changeDateFormat";
import { resetToInitialState } from "./feature/ProfileSlice";
import { IEditProfileRequest } from "../../model/profileModel";
import { useAppDispatch } from "../../app/hooks";
import useProfileApiRequest from "../../hooks/profile/useProfileApiRequest";
import { EmailConfirm, Status, UserStatus } from "../../helpers/constants";

function Profile() {
      const {
            reset,
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<IEditProfileRequest>();
      const dispatch = useAppDispatch();
      const { profileInfo, fetchLoggedInUser, editLoggedInUserProfile } = useProfileApiRequest();
      const { user, status, error } = profileInfo;
      const [toEdit, setToEdit] = useState<{ fieldName: string; toShow: boolean }>({
            fieldName: "",
            toShow: false,
      });

      const openEditHandler = (fieldName: string) => {
            setToEdit((prevState) => {
                  return { fieldName, toShow: fieldName !== prevState.fieldName ? true : !prevState.toShow };
            });

            reset();
      };

      const formSubmitHandler = (data: IEditProfileRequest) => {
            editLoggedInUserProfile(data).then(() => {
                  openEditHandler("");
            });
      };

      useEffect(() => {
            status === Status.Idle && fetchLoggedInUser();
      }, [status]);

      useEffect(() => {
            /**
             * to make sure all the state data is set to initial
             *  when component is unmounted
             * */
            return () => {
                  dispatch(resetToInitialState());
            };
      }, []);

      if (status == Status.Loading) return <Spinner text={null} />;

      if (status == Status.Failed || user == null) return <WentWrongMessage errorMessage={error} />;

      return status === Status.Succeeded && user !== null ? (
            <div className="text-base">
                  <section className="flex flex-col gap-3">
                        <div
                              className="flex flex-col mb-0 pe-4 w-full 
                                    sm:flex-row
                              "
                        >
                              <section
                                    className="flex font-semibold
                                          sm:self-end sm:w-48
                                    "
                              >
                                    <p className="p-0 m-0">User Name</p>
                              </section>

                              <section className="flex gap-1 justify-between w-full">
                                    {(!toEdit.toShow || toEdit.fieldName !== "userName") && (
                                          <>
                                                <p className="p-0 m-0">{user.userName}</p>

                                                <span>
                                                      <p
                                                            className="text-link underline m-0 p-0 self-end cursor-pointer"
                                                            onClick={() => openEditHandler("userName")}
                                                      >
                                                            Edit
                                                      </p>
                                                </span>
                                          </>
                                    )}

                                    {toEdit.toShow && toEdit.fieldName === "userName" && (
                                          <span
                                                className="flex flex-col w-full 
                                                      sm:flex-row
                                                "
                                          >
                                                <section className="flex flex-col gap-1 w-full">
                                                      <InvalidMessage
                                                            toShow={!!errors.userName}
                                                            message={errors.userName?.message}
                                                      />

                                                      <input
                                                            className="bg-white border-b border-primary outline-none w-full 
                                                                  focus-within:ring-0
                                                            "
                                                            id="profile-user-name"
                                                            type="text"
                                                            {...register("userName", {
                                                                  required: {
                                                                        value: true,
                                                                        message: "Cannot be empty !!",
                                                                  },
                                                                  value: user.userName,
                                                                  maxLength: {
                                                                        value: 100,
                                                                        message: "Cannot be bigger than 100 characters !!",
                                                                  },
                                                            })}
                                                      />
                                                </section>

                                                <span className="flex gap-2 self-end">
                                                      <p
                                                            className="text-link underline m-0 p-0 self-end cursor-pointer"
                                                            onClick={handleSubmit(formSubmitHandler)}
                                                      >
                                                            Save
                                                      </p>

                                                      <p
                                                            className=" text-link underline m-0 p-0 self-end cursor-pointer"
                                                            onClick={() => openEditHandler("userName")}
                                                      >
                                                            Cancel
                                                      </p>
                                                </span>
                                          </span>
                                    )}
                              </section>
                        </div>
                        <hr className="text-mute-gray p-0 m-0 mb-4" />

                        <div
                              className="flex flex-col mb-0 pe-4 w-full 
                                    sm:flex-row
                              "
                        >
                              <section
                                    className="flex font-semibold
                                          sm:self-end sm:w-48
                                    "
                              >
                                    <p className="p-0 m-0">Full name</p>
                              </section>

                              <section className="flex gap-1 justify-between w-full">
                                    {(!toEdit.toShow || toEdit.fieldName !== "fullName") && (
                                          <>
                                                <p className="p-0 m-0">{user.fullName}</p>

                                                <span>
                                                      <p
                                                            className="text-link underline m-0 p-0 self-end cursor-pointer"
                                                            onClick={() => openEditHandler("fullName")}
                                                      >
                                                            Edit
                                                      </p>
                                                </span>
                                          </>
                                    )}

                                    {toEdit.toShow && toEdit.fieldName == "fullName" && (
                                          <span
                                                className="flex flex-col w-full 
                                                      sm:flex-row
                                                "
                                          >
                                                <section className="flex flex-col gap-1 w-full">
                                                      <InvalidMessage
                                                            toShow={!!errors.fullName}
                                                            message={errors.fullName?.message}
                                                      />

                                                      <input
                                                            className="bg-white border-b border-primary outline-none w-full 
                                                                  focus-within:ring-0
                                                            "
                                                            id="profile-fullName"
                                                            type="text"
                                                            {...register("fullName", {
                                                                  required: {
                                                                        value: true,
                                                                        message: "Cannot be empty!",
                                                                  },
                                                                  value: user.fullName,
                                                                  maxLength: {
                                                                        value: 100,
                                                                        message: "Cannot be bigger than 100 characters.",
                                                                  },
                                                            })}
                                                      />
                                                </section>

                                                <span className="flex gap-2 self-end">
                                                      <p
                                                            className="text-link underline m-0 p-0 self-end cursor-pointer"
                                                            onClick={handleSubmit(formSubmitHandler)}
                                                      >
                                                            Save
                                                      </p>

                                                      <p
                                                            className="text-link underline m-0 p-0 self-end cursor-pointer"
                                                            onClick={() => openEditHandler("fullName")}
                                                      >
                                                            Cancel
                                                      </p>
                                                </span>
                                          </span>
                                    )}
                              </section>
                        </div>
                        <hr className="text-mute-gray p-0 m-0 mb-4" />

                        <ProfileText label="E-mail" data={user.email} />

                        <ProfileText
                              label="Email confirm"
                              className={`font-semibold ${
                                    user?.emailConfirmed ? "text-success" : "text-warning"
                              }`}
                              data={EmailConfirm[`${user.emailConfirmed}`]}
                        />

                        

                        
                        <ProfileText label="Client" data={user.fullName} />
                       

                        <ProfileText label="User Role" data={user.role} />

                              <ProfileText label="User Department" data={user.departmentName} />

                        <ProfileText
                              label="User Status"
                              className={`font-semibold ${
                                    user?.userStatus === UserStatus.Active ? "text-success" : "text-muted"
                              }`}
                              data={UserStatus[user.userStatus]}
                        />

                        <ProfileText label="Added by" data={user.createdBy} />

                        <ProfileText
                              label="Registered date"
                              data={changeDateFormat(user.accountCreatedDate.toString())}
                        />
                  </section>

                  <section className="flex flex-col gap-3">
                        <p className="uppercase font-bold text-primary tracking-widest my-4">
                              password information
                        </p>

                        <ProfileText
                              label="Password changed date"
                              labelWidth="sm:w-64"
                              data={changeDateFormat(user.passwordChangeDate.toString())}
                        />

                        <ProfileText
                              label="Password expire"
                              labelWidth="sm:w-64"
                              data={changeDateFormat(user.expiryDate.toString())}
                        />
                  </section>
            </div>
      ) : null;
}

export default Profile;
