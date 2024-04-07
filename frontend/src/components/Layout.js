import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


export const Layout = () => {
    const { user } = useSelector((state) => state.auth);

    const location = useLocation();

    return user ? (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
                <Sidebar />
            </div>
            <MobileSidebar />

            <div className='flex-1 overflow-y-auto'>
                <Navbar />

                <div className='p-4 2xl:px-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to='/log-in' state={{ from: location }} replace />
    );
}


