import axios from "axios";
import { API_URL } from "../constant";
import { IChangePassword } from "../../model/authModel";
import { IEditProfileRequest } from "../../model/profileModel";

export const profileApi = {
      getLoggedInUser: () => {
            const options = {
                  method: "GET",
                  url: `${API_URL}/Admin/get-loggedin-user`,
            };

            return axios.request(options);
      },

      editProfile: (data: IEditProfileRequest) => {
            const options = {
                  method: "PUT",
                  url: `${API_URL}/Admin/edit-logged-in-user`,
                  data: data,
            };

            return axios.request(options);
      },

      changePassword: (passwordData: IChangePassword) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/change-password`,
                  data: passwordData,
            };

            return axios.request(options);
      }
};
