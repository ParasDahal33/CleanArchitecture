import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../../api/service/authApi";

export const logoutUser = createAsyncThunk(
      "user/logout",
      async (_, { rejectWithValue }) => {
            try {
                  const response = await authApi.logout();

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);
