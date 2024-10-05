import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './appStore/store';
import App from './App';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import AppNotifications from './components/widgets/appNotifications/AppNotification';
import reportWebVitals from './reportWebVitals';
import './assets/css/tailwind.css';
import './index.css';

import AppRoutes from './routes/routes';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppNotifications />
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * space between 2 vertical divs
 * grid grid-cols-1 content-between
 */
