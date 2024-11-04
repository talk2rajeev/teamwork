import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../appStore/store';
import * as Types from '../../utils/types/types';

type NotificationReqpayload = Omit<Types.NotificationState, 'notification'>;

const initialState: Types.NotificationState = {
  notification: false,
  type: 'info',
  title: '',
  message: '',
};

export const appNotificationSlice = createSlice({
  name: 'notification',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<NotificationReqpayload>
    ) => {
      state.notification = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    dismissNotification: (state) => {
      state.notification = false;
      state.type = 'info';
      state.title = '';
      state.message = '';
    },
  },
});

export const { showNotification, dismissNotification } =
  appNotificationSlice.actions;

export const appNotification = (state: RootState) => state.appNotification;

export default appNotificationSlice.reducer;
