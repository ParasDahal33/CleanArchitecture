import { ToastContainer } from "react-toastify";
import { ReactElement, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { resetUserToInitialState } from "./feature/userSlice";
import UserTable from "./component/UserTable";
import UserModal from "./component/UserModal";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import UserViewModal from "./component/UserViewModal";
import AddButton from "../../components/buttons/AddButton";
import { useAppDispatch } from "../../app/hooks";
import useModal from "../../hooks/common/useModal";
import { useURLQuery } from "../../hooks/common/useURLQuery";
import useUserApiRequest from "../../hooks/users/useUserApiRequest";
import { IUserSearchData, IUsersResponseModel } from "../../model/userModel";
import { getUrlSortBy } from "../../utils/getUrlSortBy";
import { checkURLForKey } from "../../utils/checkURLForKey";
import SuccessGuard from "../../helpers/SuccessGuard";
import { FieldStatus, Status } from "../../helpers/constants";
import checkDynamicRoute from "../../utils/checkDynamicRoute";

/**
 * @Component Users
 * - Main component of user page
 * - It display the detail of users including its different actions.
 *
 * @returns {ReactElement}Header - It contain page title, search input and add user button
 * @returns {ReactElement}UserTable - Imported from ./UserTable
 * @returns {ReactElement}UserEditModal - if user data is to be edited.
 * @returns {ReactElement}UserModal - if user data is to be added.
 * */
export default function Users(): ReactElement {
      const {
            userInfo: { status },
            getUsers,
            getUser,
      } = useUserApiRequest();
      const { search } = useLocation();
      const { userType } = useParams();
      const dispatch = useAppDispatch();
      const [searchedValue, setSearchedValue] = useState<IUserSearchData>();
      const { addEditAction, openAddModal, openEditModal, closeModal, viewDetailModal } =
            useModal<IUsersResponseModel>();
      const { currentPageNumber, currentOrderBy, changeURLQuery, clearURLQuery } =
            useURLQuery<IUserSearchData>();

      // if the dynamic don't have the value matching with UserType enum
      // if (checkDynamicRoute({ type: UserType, dynamicRouteValue: userType, byKey: true })) {
      //       return <Navigate to="/not-found" replace />;
      // }

      // list in it should match with search input
      const URLHaveSearchParam = () => checkURLForKey(["fullName"]);
      const sortRequiredValues = ["UserName", "FullName", "Client"];

      const searchHandler = (fullName: string) => {
            setSearchedValue((prev) => {
                  return { ...prev, fullName };
            });

            changeURLQuery({ fullName: fullName, pageNumber: 1, sortBy: "index" });
      };

      const clearSearchHandler = () => {
            setSearchedValue(undefined);

            clearURLQuery();
      };

      const fetchData = () => {
            if (URLHaveSearchParam()) {
                  const urlParams = new URLSearchParams(window.location.search);
                  //if the search param is changed when view is in search state.
                  getUser({
                        fullName: searchedValue?.fullName || urlParams.get("fullName") || undefined,
                        order: currentOrderBy,
                        sortBy: getUrlSortBy(sortRequiredValues),
                        pageNumber: currentPageNumber,
                  });

                  return;
            }

            getUsers({
                  order: currentOrderBy,
                  pageNumber: currentPageNumber,
                  sortBy: getUrlSortBy(sortRequiredValues),
            });
      };

      useEffect(() => {
            fetchData();
      }, [search, userType]);

      useEffect(() => {
            if (status !== Status.Idle) return;

            fetchData();
      }, [status]);

      useEffect(() => {
            //to make sure all the state data is set to initial
            //when component is unmounted
            return () => {
                  dispatch(resetUserToInitialState());
            };
      }, []);

      return (
            <div>
                  <Header>
                        <SuccessGuard isSucceed={status === Status.Succeeded}>
                              <Search
                                    searchedURLKey="fullName"
                                    searchedValue={searchHandler}
                                    inputClearHandler={clearSearchHandler}
                              />

                              <AddButton title="Add User" buttonClickHandler={openAddModal} />
                        </SuccessGuard>
                  </Header>

                  <UserTable openEditModal={openEditModal} openViewModal={viewDetailModal} />

                  {addEditAction.toShow && addEditAction.type !== FieldStatus.View && (
                        <UserModal addEditAction={addEditAction} closeModal={closeModal} />
                  )}

                  {addEditAction.toShow && addEditAction.type === FieldStatus.View && (
                        <UserViewModal addEditAction={addEditAction} closeModal={closeModal} />
                  )}

                  <ToastContainer />
            </div>
      );
}