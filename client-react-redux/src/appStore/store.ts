import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../slices/login/loginSlice';
import productReducer from '../slices/product/productSlice';
import teamReducer from '../slices/team/teamSlice';
import userReducer from '../slices/users/userSlice';
import epicReducer from '../slices/epic/epicSlice';
import NotificationReducer from '../slices/notificationSlice/notificationSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    product: productReducer,
    team: teamReducer,
    user: userReducer,
    appNotification: NotificationReducer,
    epic: epicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
