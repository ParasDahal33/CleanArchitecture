import { createImmutableStateInvariantMiddleware, createSlice } from "@reduxjs/toolkit";
import { IUsersResponse } from "../../../model/userModel";
import { ShowingDataType, Status } from "../../../helpers/constants";

import { IToDoItemResponse } from "../../../model/toDoItemModel";
import { addToDoItems, deleteToDoItems, fetchToDoItems, updateItemsDetails, updateToDoItems }
 from "./itemsRequest";


interface ToDoItmeState{
      status: Status;
      toDoItems: IToDoItemResponse;
      error: string | undefined;
      showingResultOf: ShowingDataType;
}

const initialState: ToDoItmeState = {
      error: undefined,
      status: Status.Pending,
      showingResultOf: ShowingDataType.All,
      toDoItems:{totalPages: 0, items: []},
}

const TodoItemSlice = createSlice({
      name: "toDoItems",
      initialState,
      reducers: {
            resetToDoItemsToInitialState:(state) => {
                  state.error = undefined;
                  state.status = Status.Pending;
                  state.showingResultOf = ShowingDataType.All; 
                  state.toDoItems= {totalPages: 0, items: [] };
            },
            changeToDoItemSatusToIdle: (state) => {
                  state.status = Status.Idle;
            }
      }, 
      extraReducers(builder){
            builder
            .addCase(fetchToDoItems.pending, (state, _)=> 
            {
                  state.status = Status.Loading;
                  state.showingResultOf = ShowingDataType.All;
            })
            .addCase(fetchToDoItems.fulfilled, (state, action) => {
                  state.toDoItems = action.payload;
                  state.status= Status.Succeeded;
            })
            .addCase(addToDoItems.fulfilled, (state, _)=>{
                  if(window.location.search === "?pageNumber=1")
                  state.status = Status.Idle;
            })
            .addCase(updateToDoItems.fulfilled, (state, _ )=> {
                  state.status = Status.Idle;
            })
            .addCase(updateItemsDetails.fulfilled, (state, _) => {
                  state.status = Status.Idle;
            })
            .addCase(deleteToDoItems.fulfilled, (state,_)=> {
                  state.status = Status.Idle;
            })
            .addCase(deleteToDoItems.rejected,(state,_)=> {
                  state.status = Status.Idle;
                  state.toDoItems = {totalPages: 0, items: []};
            })
      }


});

export default TodoItemSlice.reducer;
export const{resetToDoItemsToInitialState, changeToDoItemSatusToIdle} = TodoItemSlice.actions;