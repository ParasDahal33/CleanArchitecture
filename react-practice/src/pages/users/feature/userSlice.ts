import { createSlice } from "@reduxjs/toolkit";
import { IUsersResponse } from "../../../model/userModel";
import { ShowingDataType, Status } from "../../../helpers/constants";
import {
      addUser,
      deleteUser,
      fetchUserByName,
      fetchUsers,
      fetchUsersByDepartment,
      updateUser,
} from "./userRequest";

interface UsersState {
      status: Status;
      users: IUsersResponse;
      error: string | undefined;
      showingResultOf: ShowingDataType;
}

const initialState: UsersState = {
      error: undefined,
      status: Status.Pending,
      showingResultOf: ShowingDataType.All,
      users: { totalPages: 0, userData: [] },
};

const usersSlice = createSlice({
      name: "users",
      initialState,
      reducers: {
            resetUserToInitialState: (state) => {
                  state.error = undefined;
                  state.status = Status.Pending;
                  state.showingResultOf = ShowingDataType.All;
                  state.users = { totalPages: 0, userData: [] };
            },
            changeUserStatusToIdle: (state) => {
                  state.status = Status.Idle;
            }
      },
      extraReducers(builder) {
            builder
                  .addCase(fetchUsers.pending, (state, _) => {
                        state.status = Status.Loading;
                        state.showingResultOf = ShowingDataType.All;
                  })
                  .addCase(fetchUsers.fulfilled, (state, action) => {
                        /**
                         * Set the status to succeeded
                         *  so that component responsible to show data will be only visible
                         *  after fetchStaffs is fulfilled.
                         */
                        state.users = action.payload;
                        state.status = Status.Succeeded;
                  })
                  .addCase(fetchUsers.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  })


                  .addCase(fetchUserByName.pending, (state, _) => {
                        state.showingResultOf = ShowingDataType.Searched;
                  })
                  .addCase(fetchUserByName.fulfilled, (state, action) => {
                        /**
                         * Set the status to succeeded
                         *  so that component responsible to show data will be only visible
                         *  after fetchUserByName is fulfilled.
                         */
                        state.users = action.payload;
                        state.status = Status.Succeeded;
                  })
                  .addCase(fetchUserByName.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  })


                  .addCase(fetchUsersByDepartment.fulfilled, (state, action) => {
                        state.users = action.payload;
                        state.status = Status.Succeeded;
                  })


                  .addCase(addUser.fulfilled, (state, _) => {
                        //if user is already in page one with no other params
                        //then clearURLQuery will not helps to refetch data.
                        //so changing status to  Idle will helps to refetch
                        if (window.location.search === "?pageNumber=1")
                              state.status = Status.Idle;
                  })


                  .addCase(updateUser.fulfilled, (state, _) => {
                        /**
                         * Set the user status to Idle so that the data we just
                         * updated will be fetched and shown.
                         */
                        state.status = Status.Idle;
                  })


                  .addCase(deleteUser.fulfilled, (state, _) => {
                        /**
                         * Set the user status to Idle so that the data we just
                         * deleted will be fetched and shown.
                         */
                        state.status = Status.Idle;
                  })
                  .addCase(deleteUser.rejected, (state, _) => {
                        //to refetch all data
                        state.status = Status.Idle;
                        state.users = { totalPages: 0, userData: [] };
                  })
      },
});

export default usersSlice.reducer;
export const { resetUserToInitialState, changeUserStatusToIdle } = usersSlice.actions;
