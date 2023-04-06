import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../components/header/Header";
import AddButton from "../../components/buttons/AddButton";
import LeaveApplicationModal from "./components/LeaveApplicationModal";
import LeaveApplicationTable from "./components/LeaveApplicationTable";
import LeaveApplicationSearch from "./components/LeaveApplicationSearch";
import LeaveApplicationViewModal from "./components/LeaveApplicationViewModal";
import SuccessGuard from "../../helpers/SuccessGuard";
import { FieldStatus, Status } from "../../helpers/constants";
import { resetToInitialState } from "./feature/leaveApplicationSlice";
import { ILeaveApplicationModel, ILeaveApplicationSearchData } from "../../model/leaveApplicationModel";
import { useAppDispatch } from "../../app/hooks";
import useAuthz from "../../hooks/auth/useAuthz";
import useModal from "../../hooks/common/useModal";
import { useURLQuery } from "../../hooks/common/useURLQuery";
import useLeaveApplicationApiRequest from "../../hooks/leaveApplication/useLeaveApplicationApiRequest";
import { getUrlSortBy } from "../../utils/getUrlSortBy";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { checkURLForKey } from "../../utils/checkURLForKey";
import { preservePageNumberHandler } from "../../utils/preservePageNumberHandler";

function LeaveApplication() {
      const authz = useAuthz();
      const dispatch = useAppDispatch();
      const {
            leaveApplicationInfo: { status },
            getLeaveApplicationsFiltered,
            getLeaveApplications,
      } = useLeaveApplicationApiRequest();
      const { addEditAction, openEditModal, openAddModal, closeModal, viewDetailModal } =
            useModal<ILeaveApplicationModel>();
      const [searchedValue, setSearchedValue] = useState<ILeaveApplicationSearchData | undefined>();
      const { currentPageNumber, currentOrderBy, changeURLQuery, clearURLQuery } =
            useURLQuery<ILeaveApplicationSearchData>();

      // list in it should match with search input
      const URLHaveSearchParam = () => checkURLForKey(["fullName", "leaveDate"]);
      const sortRequiredValues = ["FullName", "FinalLeaveDate", "LeaveDate"];

      // store the page number user was in before search
      const preservedPageNumberIfEmpty = () => {
            if (
                  isObjectEmpty({
                        fullName: searchedValue?.fullName,
                        leaveDate: searchedValue?.leaveDate,
                  })
            ) {
                  return;
            }

            preservePageNumberHandler.save(currentPageNumber);
      };

      const searchHandler = (searchedData: ILeaveApplicationSearchData) => {
            setSearchedValue(searchedData);

            changeURLQuery({ ...searchedData, pageNumber: 1, sortBy: "index" });

            preservedPageNumberIfEmpty();
      };

      const clearSearchHandler = () => {
            setSearchedValue(undefined);

            clearURLQuery(preservePageNumberHandler.get());
      };

      const fetchData = () => {
            if (URLHaveSearchParam()) {
                  const urlParams = new URLSearchParams(window.location.search);
                  //if the search param is changed when view is in search state.
                  getLeaveApplicationsFiltered({
                        fullName: searchedValue?.fullName || urlParams.get("fullName") || undefined,
                        leaveDate: searchedValue?.leaveDate || urlParams.get("leaveDate") || undefined,
                        order: currentOrderBy,
                        pageNumber: currentPageNumber,
                        sortBy: getUrlSortBy(sortRequiredValues),
                  });

                  return;
            }

            getLeaveApplications({
                  order: currentOrderBy,
                  pageNumber: currentPageNumber,
                  sortBy: getUrlSortBy(sortRequiredValues),
            });
      };

      useEffect(() => {
            fetchData();
      }, [search]);

      useEffect(() => {
            if (status !== Status.Idle) return;

            fetchData();
      }, [status]);

      useEffect(() => {
            //Make sure all the state data is set to initial
            //when component is unmounted
            return () => {
                  dispatch(resetToInitialState());

                  //clear preserved pageNumber
                  preservePageNumberHandler.clear();
            };
      }, []);

      return (
            <main>
                  <Header>
                        <SuccessGuard isSucceed={status === Status.Succeeded}>
                              <span
                                    className="flex flex-col gap-4 align-bottom w-full justify-end
                                          xl:flex-row
                                    "
                              >
                                    <LeaveApplicationSearch
                                          canViewSearch={authz.isAdmin || authz.isManager}
                                          searchLeaveApplication={searchHandler}
                                          clearFilter={clearSearchHandler}
                                    />

                                    <AddButton
                                          title="New Leave Application"
                                          buttonClickHandler={openAddModal}
                                    />
                              </span>
                        </SuccessGuard>
                  </Header>

                  <LeaveApplicationTable openEditModal={openEditModal} viewDetailHandler={viewDetailModal} />

                  {addEditAction.toShow && addEditAction.type !== FieldStatus.View && (
                        <LeaveApplicationModal closeModal={closeModal} addEditAction={addEditAction} />
                  )}

                  {addEditAction.toShow && addEditAction.type === FieldStatus.View && (
                        <LeaveApplicationViewModal
                              closeModal={closeModal}
                              selectedLeaveApplication={addEditAction.selectedData}
                        />
                  )}

                  <ToastContainer />
            </main>
      );
}

export default LeaveApplication;