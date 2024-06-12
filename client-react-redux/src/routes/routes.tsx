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

const AppRoutes: React.FC = () => {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;


