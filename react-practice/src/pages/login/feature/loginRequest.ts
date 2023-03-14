import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../../api/service/authApi";
import { ILoginModel } from "../../../model/authModel";

export const loginUser = createAsyncThunk(
      "user/login",
      async (loginModel: ILoginModel, { rejectWithValue }) => {
            try {
                  const response = await authApi.login(loginModel);
                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);
