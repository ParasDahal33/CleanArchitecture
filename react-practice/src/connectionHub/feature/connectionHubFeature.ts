import { AnyAction, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { HubConnection } from '@microsoft/signalr';
import { authApi } from '../../api/service/authApi';
import { cookiesStore } from '../../utils/cookiesHandler';

const refreshToken = createAsyncThunk(
      "connection/refresh/token",
      async (_, { rejectWithValue }) => {
            try {
                  const accessToken: string | undefined = cookiesStore.getItem('access_token');
                  const refreshToken: string | undefined = cookiesStore.getItem('refresh_token');

                  const response = await authApi.refreshToken({
                        accessToken: (accessToken === undefined) ? '' : accessToken,
                        refreshToken: (refreshToken === undefined) ? '' : refreshToken,
                  });

                  return response.data;
            } catch (error: any) {
                  return rejectWithValue(error.response.data);
            }
      }
)

export const handlerReconnection = (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, connection: HubConnection) => {
      dispatch(refreshToken())
            .unwrap()
            .then((response) => {

                  cookiesStore.saveItem({ key: 'access_token', data: response.data.accessToken });
                  cookiesStore.saveItem({ key: 'refresh_token', data: response.data.refreshToken });

                  (connection as any).accessTokenFactory = response.data.accessToken as string;
            })
}