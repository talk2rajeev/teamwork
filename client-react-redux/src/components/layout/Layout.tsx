import React from 'react';
import { Outlet } from 'react-router-dom';

import PageHeader from '../appComponents/pageHeader/pageHeader';

type layoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: layoutProps) {
  return (
    <div className="">
      <header className="bg-white text-slate-700 p-1 pl-4 pr-4 sticky top-0 z-50 shadow-sm">
        <PageHeader />
      </header>

      {/* MAIN CONTENT */}
      <main className="p-4 h-screen bg-gray-100">{children}</main>
    </div>
  );
}

export default Layout;
