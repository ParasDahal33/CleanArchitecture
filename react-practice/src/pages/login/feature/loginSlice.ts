import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { loginUser } from "./loginRequest";
import { Status } from "../../../helpers/constants";
import { cookiesStore } from "../../../utils/cookiesHandler";
import { ILoginResponseModel } from "../../../model/authModel";

interface CurrentUserState {
      loginResponseModel: ILoginResponseModel | null;
      status: Status;
      error: string | undefined;
}

const initialState: CurrentUserState = {
      loginResponseModel: null,
      status: Status.Idle,
      error: undefined,
};

const currentUserSlice = createSlice({
      name: "currentUser",
      initialState,
      reducers: {
            setCurrentUserStatus(state, status: PayloadAction<Status>) {
                  state.status = status.payload;
            },
      },
      extraReducers(builder) {
            builder
                  .addCase(loginUser.pending, (state, _) => {
                        state.status = Status.Loading;
                  })
                  .addCase(loginUser.fulfilled, (state, action) => {
                        state.loginResponseModel = action.payload.data;

                        cookiesStore.saveItem({ key: 'access_token', data: action.payload.accessToken });
                        cookiesStore.saveItem({ key: 'refresh_token', data: action.payload.refreshToken });
                        cookiesStore.saveItem({ key: 'isNewUser', data: action.payload.isFirst || true });

                        state.status = Status.Succeeded;
                  })
                  .addCase(loginUser.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  });
      },
});

export default currentUserSlice.reducer;

export const { setCurrentUserStatus } = currentUserSlice.actions;
export const getUserStatus = (state: RootState) => state.currentUser.loginResponseModel;
