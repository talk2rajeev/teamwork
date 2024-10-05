import React, { FC, useEffect } from 'react';
import { notification } from 'antd';
import {
  dismissNotification,
  appNotification,
} from '../../../slices/notificationSlice/notificationSlice';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';

interface AppNotificationProps {}

const AppNotifications: FC<AppNotificationProps> = () => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();
  const appNotif = useAppSelector(appNotification);

  const closeNotification = () => {
    dispatch(
      dismissNotification({
        message: '',
        title: '',
        showNotification: false,
        type: 'info',
      })
    );
  };

  useEffect(() => {
    if (appNotif.showNotification) {
      api[appNotif.type]({
        message: appNotif.title,
        description: appNotif.message,
        showProgress: true,
        duration: 0,
        onClose: closeNotification,
      });
    }
  }, [appNotif.showNotification]);

  return <>{contextHolder}</>;
};

export default AppNotifications;
