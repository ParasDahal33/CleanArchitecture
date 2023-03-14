import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../../api/service/authApi";
import { IConfirmEmailModel } from "../../../model/authModel";

export const confirmEmailRequest = createAsyncThunk(
      "email/confirm",
      async (resetPasswordData: IConfirmEmailModel, { rejectWithValue }) => {
            try {
                  const response = await authApi.confirmEmail(resetPasswordData);

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);
