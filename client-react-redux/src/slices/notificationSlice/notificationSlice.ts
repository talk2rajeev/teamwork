import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../appStore/store';
import * as Types from '../../utils/types/types';

const initialState: Types.NotificationState = {
  showNotification: false,
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
      action: PayloadAction<Types.NotificationState>
    ) => {
      state.showNotification = action.payload.showNotification;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    dismissNotification: (
      state,
      action: PayloadAction<Types.NotificationState>
    ) => {
      state.showNotification = action.payload.showNotification;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
  },
});

export const { showNotification, dismissNotification } =
  appNotificationSlice.actions;

export const appNotification = (state: RootState) => state.appNotification;

export default appNotificationSlice.reducer;
