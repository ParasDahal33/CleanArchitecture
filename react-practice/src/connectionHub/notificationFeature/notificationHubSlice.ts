import * as signalR from '@microsoft/signalr';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface IInitialState {
      notificationConnection: signalR.HubConnection | null,
}

const initialState: IInitialState = {
      notificationConnection: null,
}

const notificationHub = createSlice({
      name: 'notificationConnectionHub',
      initialState,
      reducers: {
            setNotificationConnection: (state, { payload: { connection } }: PayloadAction<{ connection: signalR.HubConnection }>) => {
                  state.notificationConnection = connection;
            },
            disconnectNotification: (state) => {
                  state.notificationConnection?.stop();

                  state.notificationConnection = null;
            },
      }
})


export default notificationHub.reducer;
export const { setNotificationConnection, disconnectNotification } = notificationHub.actions;