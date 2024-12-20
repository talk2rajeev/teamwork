import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import SprintBoard from '../pages/sprintBoard/SprintBoard';
import Epics from '../pages/epics/Epics';
import Backlogs from '../pages/backlogs/Backlogs';
import Profile from '../pages/profile/Profile';
import Product from '../pages/product/Product';
import Team from '../pages/team/Team';
import Users from '../pages/users/Users';
import ProtectedRoute from '../components/appComponents/protectedRoute/ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../appStore/store';
import { AuthUtil } from '../utils/auth/auth';
import EpicDetail from '../pages/epicDetail/EpicDetail';
import Layout from '../components/layout/Layout';
import SprintList from '../pages/sprintList/SprintList';
import UserStoryDetail from '../pages/userStoryDetail/UserStoryDetail';

const AppRoutes: React.FC = () => {
  const loginDetail = useSelector((state: RootState) => state.login);

  let loginTrue = false;
  if (
    AuthUtil.isLoggedIn() ||
    (loginDetail.tokens?.expiresIn &&
      new Date().getTime() < loginDetail.tokens?.expireTime)
  ) {
    loginTrue = true;
  }

  const isAuthenticated = loginTrue;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="product" element={<Product />} />
            <Route path="team" element={<Team />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route
            path="/product"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/team"
            element={
              <Layout>
                <Team />
              </Layout>
            }
          />
          <Route
            path="/:productId/sprint/:sprintId"
            element={<SprintBoard />}
          />
          <Route
            path="product/:productId/sprintList"
            element={<SprintList />}
          />
          <Route
            path="userStoryDetail/:productId/:sprintId/:userStoryId"
            element={<UserStoryDetail />}
          />
          <Route path="epics" element={<Epics />} />
          <Route path="epics/:epicId" element={<EpicDetail />} />
          <Route path="backlogs" element={<Backlogs />} />
          <Route
            path="*"
            element={
              <Layout>
                <div>Page Not Found</div>
              </Layout>
            }
          />

          {/* <Route path="settings/*" element={<Settings />}>
            <Route path="setting1" element={<Settings1 />} />
            <Route path="setting2" element={<Settings2 />} />
          </Route> */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
