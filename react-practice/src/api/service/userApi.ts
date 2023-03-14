import axios from "axios";
import { API_URL } from "../constant";
import { createQueryString } from "../../utils/createQueryString";
import { IUserRequestModel, IUserSearchData } from "../../model/userModel";

export const userApi = {
      getUsers: ({ userType, pageNumber, sortBy, order }: IUserSearchData) => {
            const options = {
                  method: "GET",
                  url: `${API_URL}/Admin/get-users${createQueryString({ pageNumber, sortBy, userType, order })}`,
            };

            return axios.request(options);
      },

      getUserByName: (searchedData: IUserSearchData) => {
            const option = {
                  method: "GET",
                  url: `${API_URL}/Admin/get-users${createQueryString(searchedData)}`,
            };

            return axios.request(option);
      },


      addUser: (userModel: IUserRequestModel) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Admin/register-user`,
                  data: userModel,
            };

            return axios.request(options);
      },

      updateUser: (user: IUserRequestModel) => {
            const options = {
                  method: "PUT",
                  url: `${API_URL}/Admin/edit-user`,
                  data: user,
            };

            return axios.request(options);
      },

      deleteUser: (userId: string) => {
            const options = {
                  method: "DELETE",
                  url: `${API_URL}/Admin/user?userId=${userId}`,
            };
            return axios.request(options);
      },
};
