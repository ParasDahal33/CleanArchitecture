import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/constant";
import { cookiesStore } from "../../utils/cookiesHandler";
import { setNotificationConnection } from "./notificationHubSlice";
import { handlerReconnection } from "../feature/connectionHubFeature";

export const establishNotificationHub = createAsyncThunk(
      "notification/connection/establish",
      async (_, { dispatch }) => {
            const connection: HubConnection = new HubConnectionBuilder()
                  .withUrl(`${BASE_URL}/notification`, { accessTokenFactory: () => cookiesStore.getItem('access_token') as string })
                  .withAutomaticReconnect()
                  .build();

            connection.onreconnecting(() => {

                  handlerReconnection(dispatch, connection)

            });

            dispatch(setNotificationConnection({ connection }))
      }
)
