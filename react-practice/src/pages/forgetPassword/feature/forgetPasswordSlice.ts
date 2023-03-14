import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../../helpers/constants";
import { forgetPasswordRequest } from "./forgetPasswordRequest";

interface CurrentUserState {
      status: Status;
      error: string | undefined;
}

const initialState: CurrentUserState = {
      status: Status.Idle,
      error: undefined,
};

const forgetPasswordSlice = createSlice({
      name: "forgetPassword",
      initialState,
      reducers: {
            resetToInitialState(state) {
                  state.status = Status.Idle;
                  state.error = undefined;
            },
      },
      extraReducers(builder) {
            builder
                  .addCase(forgetPasswordRequest.pending, (state, _) => {
                        state.status = Status.Loading;
                  })
                  .addCase(forgetPasswordRequest.fulfilled, (state, action) => {
                        state.status = Status.Succeeded;
                  })
                  .addCase(forgetPasswordRequest.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  });
      },
});

export default forgetPasswordSlice.reducer;

export const { resetToInitialState } = forgetPasswordSlice.actions;
