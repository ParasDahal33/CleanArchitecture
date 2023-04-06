import { createAsyncThunk } from "@reduxjs/toolkit";
import { toDoItemsApi } from "../../../api/service/toDoItemsApi"
import { IToDoItemRequestModel, IToDoItemSearch , IUpdateItemsDetailModel} from "../../../model/toDoItemModel";

/**
 * @function fetchToDoItems
 * - To fetch all toDo items with pagination.
 *
 * @returns AxiosResponse data
 * */

export const fetchToDoItems = createAsyncThunk(
      "toDoItems/getItems",
      async (searchDetail: IToDoItemSearch) => {
            const response = await toDoItemsApi.getToDoItems(searchDetail);

            return response.data;
      }
);


export const addToDoItems = createAsyncThunk(
      "toDoItems/add",
      async (newToDoItem: IToDoItemRequestModel, {rejectWithValue}) => {
            try {
                  const response = await toDoItemsApi.addToDoItems(newToDoItem);
                  return response.data;
            }
            catch(error: any){
                  return rejectWithValue(error.response);
            }
      }
);

export const updateToDoItems = createAsyncThunk(
      "toDoItems/update",
      async ({ updateToDoItems, itemsId }: { updateToDoItems: IToDoItemRequestModel, itemsId: number }, { rejectWithValue })=> {
            try {
                  const response = await toDoItemsApi.updateToDoItems(updateToDoItems, itemsId);
                  return response.data;
            }
            catch(error: any){
                  rejectWithValue(error.response.data)
            }
      }
);

export const deleteToDoItems = createAsyncThunk(
      "toDoItems/delete",
      async(itemId: number, {rejectWithValue}) => {
            try {
                  const response = await toDoItemsApi.deleteToDoItems(itemId);
                  return response;
            }
            catch (error: any)
            {
                  return rejectWithValue(error.response);
            }
      }
);

export const updateItemsDetails = createAsyncThunk(
      "toDoItems/updateItems",
      async ({ updateItemsDetails, itemsId }: { updateItemsDetails: IUpdateItemsDetailModel, itemsId: number }, { rejectWithValue })=> {
            try{
                  const response = await toDoItemsApi.updateItemsDetails(updateItemsDetails, itemsId);
                  return response;

            }     
            catch(error: any)
            {
                  return rejectWithValue(error.message);

            } 
      }
);



