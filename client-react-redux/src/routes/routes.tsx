import React from 'react';
import { HashRouter,  Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Login from '../pages/login/Login';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/dashboard/Dashboard';
import SprintBoard from '../pages/sprintBoard/SprintBoard';
import Epics from '../pages/epics/Epics';
import Backlogs from '../pages/backlogs/Backlogs';
import Profile from '../pages/profile/Profile';
import ProtectedRoute from '../components/appComponents/protectedRoute/ProtectedRoute';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../appStore/store';
import {getSessionStorage} from '../utils/storage/storage';

const AppRoutes: React.FC = () => {

  const loginDetail = useSelector((state: RootState) => state.login);
  const login = getSessionStorage('login');

  let isLoggedIn = false;
  console.log(loginDetail.tokens);
  if(loginDetail.tokens?.expiresIn && (new Date().getTime()) < loginDetail.tokens?.expireTime) {
    isLoggedIn = true
  }
  
  const isAuthenticated = isLoggedIn;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/:productId/sprint" element={<SprintBoard />} />
          <Route path="epics" element={<Epics />} />
          <Route path="backlogs" element={<Backlogs />} />
            {/* <Route path="/:productId/sprint" element={<SprintBoard />} />
          </Route> */}
          {/* <Route path="settings/*" element={<Settings />}>
            <Route path="setting1" element={<Settings1 />} />
            <Route path="setting2" element={<Settings2 />} />
          </Route> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;


