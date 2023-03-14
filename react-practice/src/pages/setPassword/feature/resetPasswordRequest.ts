import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../../api/service/authApi";
import { IResetPasswordModel } from "../../../model/authModel";

export const resetPasswordRequest = createAsyncThunk(
      "password/reset",
      async (resetPasswordData: IResetPasswordModel, { rejectWithValue }) => {
            try {
                  const response = await authApi.resetPassword(resetPasswordData);

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);
