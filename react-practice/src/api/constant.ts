import axios, { AxiosError } from "axios";
import { authApi } from "./service/authApi";
import { cookiesStore } from "../utils/cookiesHandler";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = BASE_URL + "/api";

axios.interceptors.request.use(
      (config) => {
            const accessToken = cookiesStore.getItem("access_token");

            if (accessToken) {
                  if (config.headers) {
                        config.headers["Authorization"] = "Bearer " + accessToken;
                        config.headers["Content-Type"] = "application/json;charset=utf-8";
                        config.headers["Accept"] =
                              "application/json, application/xml, text/plain, text/html, *.*";
                        config.headers["Access-Control-Allow-Origin"] = "*";
                        config.headers["Access-Control-Allow-Credentials"] = "true";
                  }
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

axios.interceptors.response.use(
      (value) => {
            return value;
      },
      (err) => {
            try {
                  const axiosError = err as AxiosError;
                  const originalRequest = err.config;

                  if (axiosError.response?.status === 401) {
                        return authApi
                              .refreshToken({
                                    accessToken: cookiesStore.getItem("access_token") ?? "",
                                    refreshToken: cookiesStore.getItem("refresh_token") ?? "",

                              })
                              .then((i: any) => {
                                    cookiesStore.saveItem({ key: 'access_token', data: i.data.accessToken });
                                    cookiesStore.saveItem({ key: 'refresh_token', data: i.data.refreshToken });


                                    // Resend the original request but with new access token.
                                    return axios({
                                          ...originalRequest,
                                          headers: {
                                                ...originalRequest.headers,
                                                Authorization: "Bearer " + i.data.accessToken,
                                                sent: true,
                                          },
                                    });
                              })
                              .catch((error: any) => {
                                    return Promise.reject(error);
                              });
                  }
            } catch (error: any) {
                  console.error("Error fetching from axios.", error);
            }

            return Promise.reject(err);
      }
);
