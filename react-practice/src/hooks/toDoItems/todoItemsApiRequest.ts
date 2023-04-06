import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IToDoItemRequestModel, IUpdateItemsDetailModel } from "../../model/toDoItemModel";
import { IToDoItemSearch } from "../../model/toDoItemModel";
import { addToDoItems, deleteToDoItems, fetchToDoItems, updateItemsDetails, updateToDoItems } from "../../pages/ToDoItems/feature/itemsRequest";
import { closeSwalLoading, errorToastMessage, loadingSwalMessage, successToastMessage } from "../../utils/toastMessage";



function useTodoItemApiRequest(){
      const dispatch = useAppDispatch();
      const toDoItemInfo = useAppSelector((state)=> state.toDoItem);

      const getToDoItem = async (searchedData: IToDoItemSearch) => {
            loadingSwalMessage();
            await dispatch(fetchToDoItems(searchedData))
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

      const addNewToDoItem = async (newToDoItem: IToDoItemRequestModel) =>{
            loadingSwalMessage();
            await dispatch(addToDoItems(newToDoItem))
                  .unwrap()
                  .then(({message}) => {
                        successToastMessage({title: "Added Successfully.", message:message});
                  })
                  .catch((erroMessage) => {
                        closeSwalLoading();

                        if(erroMessage.errors !== undefined){
                              errorToastMessage(erroMessage.errors[0]);
                        }
                        throw new Error(erroMessage);
                  })
      }

      const deleteToDoItemHandler = (listId: number)=> {
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
                  if (result.isConfirmed){
                        loadingSwalMessage();
                        dispatch(deleteToDoItems(listId))
                              .unwrap()
                              .then(({data}) => {
                                    successToastMessage({title: "Delete Successfully.", message:data});
                              })
                              .catch((errorMessage) => {
                                    closeSwalLoading();
                                    errorToastMessage(errorMessage);
                              })
                  }
            })
      }

      const editToDoList = async (update: IToDoItemRequestModel, itemId: number) => {
            loadingSwalMessage();

            await dispatch(updateToDoItems({updateToDoItems:update, itemsId:itemId} ))
                  .unwrap()
                  .then(({ message }) => {
                        successToastMessage({ title: "Updated!", message: message });
                  })
                  .catch((errorMessage) => {
                        closeSwalLoading();

                        errorToastMessage(errorMessage);

                        throw new Error(errorMessage);
                  });
      };

      const itemsDetails = async(update: IUpdateItemsDetailModel , itemId: number) => {
            loadingSwalMessage();

            await dispatch(updateItemsDetails({updateItemsDetails: update, itemsId: itemId}))
            .unwrap()
            .then(({ data }) => {
                  successToastMessage({ title: "Updated!", message: data });
            })
            .catch((errorMessage) => {
                  closeSwalLoading();

                  errorToastMessage(errorMessage);

                  throw new Error(errorMessage);
            });
      };

      return {
            toDoItemInfo,
            getToDoItem,
            addNewToDoItem,
            deleteToDoItemHandler,
            editToDoList,
            itemsDetails
      } as const;
}

export default useTodoItemApiRequest;
