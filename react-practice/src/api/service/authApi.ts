import axios from "axios";
import { API_URL } from "../constant";
import { IConfirmEmailModel, IForgetPasswordModel, ILoginModel, IResetPasswordModel, ITokenModel } from "../../model/authModel";

export const authApi = {
      refreshToken: (oldToken: ITokenModel) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/refresh-token`,
                  data: oldToken,
            };

            return axios.request(options);
      },

      confirmEmail: (resetPasswordDetail: IConfirmEmailModel) => {
            const options = {
                  method: "GET",
                  url: `${API_URL}/Auth/confirm-email?id=${resetPasswordDetail.id}&token=${resetPasswordDetail.token}`,
            };

            return axios.request(options);
      },


      reconfirmEmail: (userId: string) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/resend-email-confirmation`,
                  data: { userId }
            };
            return axios.request(options);
      },


      forgotPassword: ({ email }: IForgetPasswordModel) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/forgot-password?email=${email}`,
            };

            return axios.request(options);
      },

      resetPassword: (resetPasswordDetail: IResetPasswordModel) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/reset-password`,
                  data: resetPasswordDetail,
            };

            return axios.request(options);
      },

      login: (body: ILoginModel) => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/user-login`,
                  data: body,
            };

            return axios.request(options);
      },

      logout: () => {
            const options = {
                  method: "POST",
                  url: `${API_URL}/Auth/revoke-loggedIn-user`,
            };

            return axios.request(options);
      },

      verify: () => {
            const options = {
                  method: "GET",
                  url: `${API_URL}/Auth/verify`,
            };

            return axios.request(options);
      },
};
