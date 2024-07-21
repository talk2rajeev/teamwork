import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import * as coreComponents from '../../components/core-components';
import { AuthUtil } from '../../utils/auth/auth';

const Dashboard: React.FC = () => {
  const params = useParams<{ productId: string }>();
  const location = useLocation();

  // console.log('getUesrDetaul ', AuthUtil.getUserDetail());
  // console.log('params >>>>>>>>>>>>> ', params);
  console.log('location ;;;;; ', location);

  const isDashboardRootPage = location.pathname === '/dashboard';

  const isActive = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'inline-block  text-blue-500 hover:text-blue-600 active:text-blue-700 p-2 border-b-2 border-blue-500'
      : 'inline-block  text-slate-500 hover:text-blue-600 active:text-blue-700 p-2';

  return (
    <Layout>
      {isDashboardRootPage ? (
        <div>Dashboard Root Page</div>
      ) : (
        <div>
          <div className="grid grid-flow-col auto-cols-max gap-8">
            <div className="">
              <NavLink to="product" className={isActive}>
                Product
              </NavLink>
            </div>
            <div className="">
              <NavLink to="team" className={isActive}>
                Team
              </NavLink>
            </div>
            <div className="">
              <NavLink to="users" className={isActive}>
                User
              </NavLink>
            </div>
          </div>
          <div
            className="border-t-1 border-slate-400 border-solid"
            style={{ marginTop: '-0.10rem' }}
          >
            <Outlet />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
