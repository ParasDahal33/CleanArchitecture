import { ReactElement, useEffect, useState } from "react";
import useTodoItemApiRequest from "../../hooks/toDoItems/todoItemsApiRequest";
import { useAppDispatch } from "../../app/hooks";
import { IToDoItemResponseModel, IToDoItemSearch } from "../../model/toDoItemModel";
import useModal from "../../hooks/common/useModal";
import { useURLQuery } from "../../hooks/common/useURLQuery";
import { checkURLForKey } from "../../utils/checkURLForKey";
import { Status } from "../../helpers/constants";
import { resetUserToInitialState } from "../users/feature/userSlice";
import Header from "../../components/header/Header";
import SuccessGuard from "../../helpers/SuccessGuard";
import Search from "../../components/search/Search";
import AddButton from "../../components/buttons/AddButton";
import { ToastContainer } from "react-toastify";



export default function ToDoItems(): ReactElement{
      const {
            toDoItemInfo: {status},
            getToDoItem
      } = useTodoItemApiRequest();
      const dispatch = useAppDispatch();
      const [searchedValue, setSearchedValue] = useState<IToDoItemSearch>();
      const { addEditAction, openAddModal, openEditModal, closeModal, viewDetailModal } =
            useModal<IToDoItemResponseModel>();
      const { currentPageNumber, currentOrderBy, changeURLQuery, clearURLQuery } =
            useURLQuery<IToDoItemSearch>();

      const URLHaveSerachParam = () => checkURLForKey(["ListId"]);
      
      const searchHandler = (ListId: number) => {
            setSearchedValue((prev) => {
                  return {...prev, ListId};
            });

            changeURLQuery({ListId: ListId, PageNumber:1, PageSize:10});
      };

      const clearSearchHandler = () => {
            setSearchedValue(undefined);
            
            clearURLQuery();
      }

      const fetchData = () => {
            if (  URLHaveSerachParam()) {
                  getToDoItem({
                        ListId : searchedValue?.ListId,
                        PageNumber: currentPageNumber,

                  });

                  return;
            }

            getToDoItem({
                  PageNumber: currentPageNumber,
                  ListId: 1
            });
      };

      useEffect(() => {
            fetchData();
      });
      
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

                              <AddButton title="Add ToDoItem" buttonClickHandler={openAddModal} />
                        </SuccessGuard>
                  </Header>

                   <ToDoItemsTable openEditModal={openEditModal} openViewModal={viewDetailModal} />
            {/*
                  {addEditAction.toShow && addEditAction.type !== FieldStatus.View && (
                        <UserModal addEditAction={addEditAction} closeModal={closeModal} />
                  )}

                  {addEditAction.toShow && addEditAction.type === FieldStatus.View && (
                        <UserViewModal addEditAction={addEditAction} closeModal={closeModal} />
            )} */}

                  <ToastContainer />
            </div>
      )
}