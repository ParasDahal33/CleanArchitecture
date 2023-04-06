import axios from "axios";
import { API_URL } from "../constant";
import { createQueryString } from "../../utils/createQueryString";
import { IToDoItemSearch, IToDoItemRequestModel, IUpdateItemsDetailModel} from "../../model/toDoItemModel";

export const toDoItemsApi = {
      getToDoItems: ({  ListId, PageNumber, PageSize }: IToDoItemSearch) => {
            const options = {
                  method: "GET",
                  url: `${API_URL}/TodoItems/${createQueryString({ ListId, PageNumber, PageSize })}`,
            };

            return axios.request(options);
      },


      addToDoItems: (toDoItemModel: IToDoItemRequestModel) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/ToDoItems`,
                  data: toDoItemModel,
            };

            return axios.request(options);
      },

      updateToDoItems: (todoItems: IToDoItemRequestModel, itemId: number) => {
            const options = {
                  method: "PUT",
                  url: `${API_URL}/ToDoITems/${itemId}`,
                  data: todoItems,
            };

            return axios.request(options);
      },

      updateItemsDetails: (itemDetails: IUpdateItemsDetailModel, itemsId: number) => {
            const options = {
                  method: "PUT",
                  url : `${API_URL}/ToDoItems/UpdateItemDetails?id=${itemsId}`,
                  data: itemDetails,
            }
            return axios.request(options);
      },

      deleteToDoItems: (itemsId: number) => {
            const options = {
                  method: "DELETE",
                  url: `${API_URL}/ToDoITems/${itemsId}`,
            };
            return axios.request(options);
      },

};
