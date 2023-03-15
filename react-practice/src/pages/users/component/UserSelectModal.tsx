import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Search from "../../../components/search/Search";
import { Modal } from "../../../components/modal/Modal";
import Pagination from "../../../components/pagination/Pagination";
import { Table, TableHead } from "../../../components/table/Table";
import WentWrongMessage from "../../../components/error/WentWrongMessage";
import NoDataMessageSmall from "../../../components/error/NoDataMessageSmall";
import SuccessGuard from "../../../helpers/SuccessGuard";
import { ShowingDataType, Status } from "../../../helpers/constants";
import { resetUserToInitialState } from "../feature/userSlice";
import getIndex from "../../../utils/getIndex";
import { useAppDispatch } from "../../../app/hooks";
import useUserApiRequest from "../../../hooks/users/useUserApiRequest";
import useModalPageNumber from "../../../hooks/common/useModalPageNumber";
import { IUser, IUserSearchData, IUsersResponseModel } from "../../../model/userModel";
import NoSearchedDataMessageSmall from "../../../components/error/NoSearchedDataMessageSmall";

interface IUserSelectModal {
      isModalOpen: boolean;
      closeModal: () => void;
      selectedUserId: string | undefined;
      userSelectHandler: (user: IUser) => void;
}

function UserSelectModal({ isModalOpen, closeModal, selectedUserId, userSelectHandler }: IUserSelectModal) {
      const {
            userInfo: { users, error, status, showingResultOf },
            getUsers,
            getUser,
      } = useUserApiRequest();
      const navigate = useNavigate();
      const dispatch = useAppDispatch();
      const [searchedValue, setSearchedValue] = useState<IUserSearchData>();
      const { currentPageNumber, setPageNumberHandler, nextPageNumberHandler, prevPageNumberHandler } =
            useModalPageNumber();

      // it will change to user page of staff
      const changePageToUser = () => navigate("/administration/user-logins/staff");

      const searchHandler = (fullName: string) => {
            setSearchedValue((prev) => {
                  return { ...prev, fullName };
            });

            setPageNumberHandler(1);
      };

      const clearSearchHandler = () => {
            setSearchedValue(undefined);

            setPageNumberHandler(1);
      };

      useEffect(() => {
            if (searchedValue) {
                  //if the searchedValue is changed when view is in search state.
                  getUser({
                        fullName: searchedValue?.fullName || undefined,
                        pageNumber: currentPageNumber || 1,
                  });

                  return;
            }

            getUsers({
                  pageNumber: currentPageNumber || 1,
            });
      }, [searchedValue, currentPageNumber]);

      useEffect(() => {
            // to make sure all the state data is set to initial
            //  when component is unmounted
            return () => {
                  dispatch(resetUserToInitialState());
            };
      }, []);

      return (
            <Modal size="w-[40%]" toShow={isModalOpen} title="Select Staff" closeHandler={closeModal}>
                  <main className="flex flex-col gap-4">
                        <SuccessGuard isSucceed={status === Status.Succeeded}>
                              <Search
                                    searchedURLKey="fullNames"
                                    searchedValue={searchHandler}
                                    inputClearHandler={clearSearchHandler}
                              />
                        </SuccessGuard>

                        <Table>
                              <TableHead>
                                    <tr>
                                          <th scope="col" className="w-2/6">
                                                #
                                          </th>

                                          <th scope="col" className="w-3/6 text-start">
                                                User full name (staff)
                                          </th>
                                    </tr>
                              </TableHead>

                              <tbody>
                                    {users.items.map((user: IUsersResponseModel, index: number) => {
                                          return (
                                                <tr
                                                      className={`cursor-pointer ${
                                                            selectedUserId === user.id &&
                                                            "bg-selected font-bold"
                                                      }`}
                                                      key={user.id}
                                                      onClick={() => {
                                                            userSelectHandler({
                                                                  userId: user.id,
                                                                  fullName: user.fullName,
                                                            });

                                                            //close modal after selecting staff
                                                            closeModal();
                                                      }}
                                                >
                                                      <th scope="row">
                                                            {getIndex({
                                                                  currentPage: currentPageNumber,
                                                                  index,
                                                            })}
                                                      </th>

                                                      <td className="text-start">{user.fullName}</td>
                                                </tr>
                                          );
                                    })}
                              </tbody>
                        </Table>

                        <NoDataMessageSmall
                              pageName="user (staff)"
                              changePageHandler={changePageToUser}
                              isStatusSucceed={status === Status.Succeeded}
                              toShow={showingResultOf === ShowingDataType.All && !users.items.length}
                        />

                        <NoSearchedDataMessageSmall
                              pageName="user (staff)"
                              actionHandler={clearSearchHandler}
                              changePageHandler={changePageToUser}
                              isStatusSucceed={status === Status.Succeeded}
                              toShow={showingResultOf === ShowingDataType.Searched && !users.items.length}
                        />

                        <Pagination
                              totalPages={users.totalPages}
                              currentPage={currentPageNumber}
                              onPageChange={setPageNumberHandler}
                              onNextClick={nextPageNumberHandler}
                              onPreviousClick={prevPageNumberHandler}
                              isStatusSucceed={status === Status.Succeeded}
                              haveData={users.items !== null && users.items.length > 0}
                        />
                        <WentWrongMessage isFailed={status === Status.Failed} errorMessage={error} />

                        <Spinner
                              isLoading={status === Status.Loading || status === Status.Pending}
                              text="Loading..."
                              size="5em"
                        />
                  </main>
            </Modal>
      );
}

export default UserSelectModal;
