import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "../../../api/service/profileApi";
import { IChangePassword } from "../../../model/authModel";
import { IEditProfileRequest } from "../../../model/profileModel";

export const getLoggedInUser = createAsyncThunk(
      "loggedInUser/get",
      async () => {
            const response = await profileApi.getLoggedInUser();

            return response.data;
      }
);

export const editProfileRequest = createAsyncThunk(
      "admin/edit-profile",
      async (editedProfileDetail: IEditProfileRequest, { rejectWithValue }) => {
            try {
                  const response = await profileApi.editProfile(editedProfileDetail);

                  return response.data.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);

export const changePasswordRequest = createAsyncThunk(
      "admin/change-password",
      async (updatedPasswordDetail: IChangePassword, { rejectWithValue }) => {
            try {
                  const response = await profileApi.changePassword(updatedPasswordDetail);

                  return response.data.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);