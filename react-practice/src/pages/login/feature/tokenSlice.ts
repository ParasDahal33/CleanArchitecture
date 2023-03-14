import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../../helpers/constants";
import { authApi } from "../../../api/service/authApi";

interface TokenState {
      status: Status;
      error: string | undefined;
}

const initialState: TokenState = {
      status: Status.Idle,
      error: undefined,
};

export const verifyToken = createAsyncThunk("token/verifyToken", async () => {
      let response = await authApi.verify();

      //FIX:  this works but don't this its correct way. Try to fix it !!
      /**
       * If we remove this condition user will be moved to dashboard
       * if user refresh the page, at the time of refresh-token expiry
       */
      if (response === undefined) {
            response = await authApi.verify();
      }

      return response.data;
});

const tokenSlice = createSlice({
      name: "token",
      initialState,
      reducers: {
            setTokenStatus: (state, status: PayloadAction<Status>) => {
                  state.status = status.payload;
            },
      },
      extraReducers(builder) {
            builder
                  .addCase(verifyToken.pending, (state, _) => {
                        state.status = Status.Loading;
                  })
                  .addCase(verifyToken.fulfilled, (state, _) => {
                        state.status = Status.Succeeded;
                  })
                  .addCase(verifyToken.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  });
      },
});

export default tokenSlice.reducer;

export const { setTokenStatus } = tokenSlice.actions;
