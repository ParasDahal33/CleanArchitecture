import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../../api/service/userApi";
import { authApi } from "../../../api/service/authApi";
import { IUserRequestModel, IUserSearchData } from "../../../model/userModel";

/**
 * @function fetchUsers
 * - To fetch all users wit pagination.
 *
 * @prop {number | null }pageNumber - user requested page number
 *
 * @returns AxiosResponse data
 * */
export const fetchUsers = createAsyncThunk(
      "admin/getUsers",
      async (searchDetail: IUserSearchData) => {
            const response = await userApi.getUsers(searchDetail);

            return response.data;
      }
);

/**
 * @function fetchUsersByName
 * - To fetch users by user name with pagination.
 *
 * @prop {string | undefined}userName - name of the user
 * @prop {number | null}pageNumber - user requested page number
 * @prop {RejectWithValue}rejectWithValue - to return error message from axios
 *
 * @returns AxiosResponse data or RejectWithValue
 * */
export const fetchUserByName = createAsyncThunk(
      "admin/fetch-user/by-name",
      async (searchDetail: IUserSearchData, { rejectWithValue }) => {
            try {
                  const response = await userApi.getUserByName(searchDetail);

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);

/**
 * @function addUser
 * - To add new user detail
 *
 * @prop {IUserRequestModel}newUser - new user detail
 * @prop {RejectWithValue}rejectWithValue - to return error message from axios
 *
 * @returns AxiosResponse data or RejectWithValue
 * */
export const addUser = createAsyncThunk(
      "admin/user/add",
      async (newUser: IUserRequestModel, { rejectWithValue }) => {
            try {
                  const response = await userApi.addUser(newUser);

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      });

/**
 * @function updateUser
 * - To update user detail
 *
 * @prop {IUserRequestModel}updateUser - user updated data
 * @prop {RejectWithValue}rejectWithValue - to return error message from axios
 *
 * @returns AxiosResponse data or RejectWithValue
 * */
export const updateUser = createAsyncThunk(
      "admin/user/update",
      async (updatedUser: IUserRequestModel, { rejectWithValue }) => {
            try {
                  const response = await userApi.updateUser(updatedUser);

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);

/**
 * @function deleteUser
 * - To delete user by user id.
 *
 * @prop {string}userId - deleting user id.
 * @prop {RejectWithValue}rejectWithValue - to return error message from axios
 *
 * @returns AxiosResponse data or RejectWithValue
 * */
export const deleteUser = createAsyncThunk(
      "admin/user/delete",
      async (userId: string, { rejectWithValue }) => {
            try {
                  const response = await userApi.deleteUser(userId);

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);


export const postReconfirmEmail = createAsyncThunk(
      "admin/reconfirmEmail/id",
      async ({ userId }: { userId: string }, { rejectWithValue }) => {
            try {
                  const response = await authApi.reconfirmEmail(userId);

                  return response.data.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
);



