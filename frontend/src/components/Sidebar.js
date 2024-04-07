import clsx from "clsx";
import React from "react";
import { FaTasks } from "react-icons/fa";
import {
    MdDashboard,
    MdOutlinePendingActions,
    MdTaskAlt
} from "react-icons/md";
import { SiTask } from 'react-icons/si';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <FaTasks />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <MdTaskAlt />,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <MdOutlinePendingActions />,
    }
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const sidebarLinks = user ? linkData : linkData.slice(0, 5);

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    const NavLink = ({ el }) => {
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#ed25d22d]",
                    path === el.link.split("/")[0] ?
                        "bg-indigo-500 text-neutral-100"
                        : ""
                )}
            >
                {el.icon}
                <span className='hover:text-[#2564ed]'>{el.label}</span>
            </Link>
        );
    };
    return (
        <div className='w-full  h-full flex flex-col gap-6 p-5'>
            <h1 className='flex gap-1 items-center'>
                <p className='bg-green-600 p-2 rounded-full'>
                    <SiTask className='text-white text-2xl font-black' />
                </p>
                <span className='text-2xl font-bold text-black'>My Task Manager</span>
            </h1>

            <div className='flex-1 flex flex-col gap-y-10 py-8'>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;