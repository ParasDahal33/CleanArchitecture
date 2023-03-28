import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../../api/service/authApi";
import { IForgetPasswordModel } from "../../../model/authModel";

export const forgetPasswordRequest = createAsyncThunk(
      "password/forget",
      async (resetPasswordData: IForgetPasswordModel, { rejectWithValue }) => {
            try {
                  const response = await authApi.forgotPassword(resetPasswordData);
                  return response.data;
            } catch (error: any) {
                  const response = await authApi.forgotPassword(resetPasswordData);
                  return response.status;
            }
      }
);
