import React from 'react';
import { Outlet } from 'react-router-dom';

import PageHeader from '../pageHeader/pageHeader';

type layoutProps = {
    children: React.ReactNode
}

function Layout({children}: layoutProps) {
    return (
        <div className="">
            <header className="bg-white text-slate-700 p-1 pl-4 pr-4 sticky top-0 z-50 shadow-sm">
                <PageHeader />
            </header>

            {/* MAIN CONTENT */}
            <main className="p-4 h-screen bg-gray-100">
                {children}
                {/* 
                Add more content to make the page scrollable 
                <div className="p-4 h-screen bg-gray-100">More content</div>
                <div className="p-4 h-screen bg-gray-200">Even more content</div>
                */}
            </main> 
        </div>
    );
}

export default Layout;
