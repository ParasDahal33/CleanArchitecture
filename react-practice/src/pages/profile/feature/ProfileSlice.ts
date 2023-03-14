import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../../helpers/constants";
import { IUsersResponseModel } from "../../../model/userModel";
import { changePasswordRequest, editProfileRequest, getLoggedInUser } from "./ProfileRequest";

interface ProfileState {
      status: Status;
      error: string | undefined;
      user: IUsersResponseModel | null;
}

const initialState: ProfileState = {
      user: null,
      status: Status.Idle,
      error: undefined,
};

const profileSlice = createSlice({
      name: "profile",
      initialState,
      reducers: {
            resetToInitialState: (state) => {
                  state.user = null;
                  state.error = undefined;
                  state.status = Status.Idle;
            },
      },
      extraReducers(builder) {
            builder
                  .addCase(getLoggedInUser.fulfilled, (state, action) => {
                        state.status = Status.Succeeded;
                        state.user = action.payload;
                  })
                  .addCase(getLoggedInUser.pending, (state, _) => {
                        state.status = Status.Loading;
                  })

                  .addCase(getLoggedInUser.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  })

                  .addCase(editProfileRequest.fulfilled, (state, _) => {
                        /**
                         * @summary
                         * Set the profile status to Idle so that the data we just
                         * deleted will be fetched and shown.
                         */
                        state.status = Status.Idle;
                  })
                  .addCase(changePasswordRequest.fulfilled, (state, _) => {
                        /**
                         * @summary
                         * Set the profile status to Idle so that the data we just
                         * deleted will be fetched and shown.
                         */
                        state.status = Status.Idle;
                  })
      },
});

export default profileSlice.reducer;

export const { resetToInitialState } = profileSlice.actions;
