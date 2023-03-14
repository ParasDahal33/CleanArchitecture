import { ReactElement } from "react";
import Spinner from "../../../components/Spinner";
import NoDataMessage from "../../../components/NoDataMessage";
import Pagination from "../../../components/pagination/Pagination";
import WentWrongMessage from "../../../components/error/WentWrongMessage";
import { SortingTH, Table, TableBody, TableHead } from "../../../components/table/Table";
import NoSearchedDataMessage from "../../../components/error/NoSearchedDataMessage";
import { TableButtonGroup, TableViewButton } from "../../../components/buttons/Buttons";
import getIndex from "../../../utils/getIndex";
import { IUserSearchData, IUsersResponseModel } from "../../../model/userModel";
import { useURLQuery } from "../../../hooks/common/useURLQuery";
import useUserApiRequest from "../../../hooks/users/useUserApiRequest";
import { EmailConfirm, ShowingDataType, Status, UserStatus } from "../../../helpers/constants";

interface IUserTable {
      openEditModal: (user: IUsersResponseModel) => void;
      openViewModal: (user: IUsersResponseModel) => void;
}

export default function UserTable({ openEditModal, openViewModal }: IUserTable): ReactElement {
      const {
            userInfo: { users, error, status, showingResultOf },
            deleteUserHandler,
            reconfirmEmailRequest,
      } = useUserApiRequest();
      const { currentPageNumber, changeURLQuery, changeURLPageNumber, clearURLQuery } =
            useURLQuery<IUserSearchData>();

      const handlerSort = ({ target: { id } }: any) => {
            changeURLQuery({ sortBy: id });
      };

      return (
            <main>
                  <Table>
                        <TableHead>
                              <tr>
                                    <SortingTH isCentered handlerSort={handlerSort} name="index" title="#" />

                                    <SortingTH
                                          className="text-start"
                                          handlerSort={handlerSort}
                                          name="UserName"
                                          title="Username"
                                    />

                                    <SortingTH
                                          className="text-start"
                                          handlerSort={handlerSort}
                                          name="FullName"
                                          title="Full Name"
                                    />

                                          <SortingTH
                                                className="text-start"
                                                handlerSort={handlerSort}
                                                name="Client"
                                                title="Client"
                                          />

                                    <th scope="col" className="text-start">
                                          User Role
                                    </th>

                                    <th scope="col">Status</th>

                                    <th scope="col">Email confirmed</th>

                                    <th scope="col">Action</th>
                              </tr>
                        </TableHead>

                        <TableBody isStatusSucceed={status === Status.Succeeded}>
                              {users.items.map((user: IUsersResponseModel, index: number) => {
                                    //ToDo Avoid displaying one's own information.
                                    return (
                                           (
                                                <tr key={user.id}>
                                                      <th scope="row">
                                                            {getIndex({
                                                                  currentPage: currentPageNumber,
                                                                  index,
                                                            })}
                                                      </th>

                                                      <td className="text-start">{user.userName}</td>

                                                      <td className="text-start">{user.fullName}</td>

                                                            <td className="text-start">{user.fullName}</td>

                                                      <td className="text-start">{user.role}</td>

                                                      <td
                                                            className={`font-semibold ${
                                                                  user.userStatus === UserStatus.Active
                                                                        ? "text-success"
                                                                        : "text-mute"
                                                            }`}
                                                      >
                                                            {UserStatus[user.userStatus]}
                                                      </td>

                                                      <td>
                                                            {user.emailConfirmed && (
                                                                  <span className="confirm">
                                                                        {
                                                                              EmailConfirm[
                                                                                    `${user.emailConfirmed}`
                                                                              ]
                                                                        }
                                                                  </span>
                                                            )}

                                                            {!user.emailConfirmed && (
                                                                  <span className="flex w-full justify-center">
                                                                        <p
                                                                              className="text-link text-center self-center text-sm max-w-[6rem] underline cursor-pointer
                                                                                    hover:text-link/80
                                                                              "
                                                                              onClick={() =>
                                                                                    reconfirmEmailRequest(
                                                                                          user.id
                                                                                    )
                                                                              }
                                                                        >
                                                                              Resend Confirmation
                                                                        </p>
                                                                  </span>
                                                            )}
                                                      </td>

                                                      <td>
                                                            <TableButtonGroup
                                                                  onDeleteClick={() =>
                                                                        deleteUserHandler(user.id)
                                                                  }
                                                                  onEditClick={() => {
                                                                        openEditModal(user);
                                                                  }}
                                                                  leadingChildren={
                                                                        <TableViewButton
                                                                              buttonClickHandler={() =>
                                                                                    openViewModal(user)
                                                                              }
                                                                        />
                                                                  }
                                                            />
                                                      </td>
                                                </tr>
                                          )
                                    );
                              })}
                        </TableBody>
                  </Table>

                  <NoDataMessage
                        message="User"
                        isStatusSucceed={status === Status.Succeeded}
                        haveData={showingResultOf === ShowingDataType.All && !users.items.length}
                  />

                  <NoSearchedDataMessage
                        actionHandler={clearURLQuery}
                        isStatusSucceed={status === Status.Succeeded}
                        toShow={showingResultOf === ShowingDataType.Searched && !users.items.length}
                  />

                  <Pagination
                        totalPages={users.totalPages}
                        currentPage={currentPageNumber}
                        onPageChange={changeURLPageNumber}
                        onNextClick={() => changeURLPageNumber(currentPageNumber + 1)}
                        onPreviousClick={() => changeURLPageNumber(currentPageNumber - 1)}
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
      );
}
