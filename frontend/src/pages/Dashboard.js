import clsx from "clsx";
import moment from "moment";
import React from "react";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import {
    MdAdminPanelSettings,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TaskTable = ({ tasks }) => {
    const navigate = useNavigate();
    const ICONS = {
        high: <MdKeyboardDoubleArrowUp />,
        medium: <MdKeyboardArrowUp />,
        low: <MdKeyboardArrowDown />,
    };

    const TableHeader = () => (
        <thead className='border-b border-gray-300 '>
            <tr className='text-black text-left'>
                <th className='py-2'>Task Title</th>
                <th className='py-2'>Priority</th>
                <th className='py-2 hidden md:block'>Created At</th>
            </tr>
        </thead>
    );

    const TableRow = ({ task }) => (
        <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                <div className='flex items-center gap-2'>
                    <div
                        className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
                    />

                    <button onClick={() => navigate(`/task/${task._id}`)} className='text-base text-black bg-transparent border-none cursor-pointer'>
                        {task.title}
                    </button>
                </div>
            </td>

            <td className='py-2'>
                <div className='flex gap-1 items-center'>
                    <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
                        {ICONS[task.priority]}
                    </span>
                    <span className='capitalize'>{task.priority}</span>
                </div>
            </td>

            <td className='py-2 hidden md:block'>
                <span className='text-base text-gray-600'>
                    {moment(task?.date).fromNow()}
                </span>
            </td>
        </tr>
    );
    return (
        <>
            <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
                <table className='w-full'>
                    <TableHeader />
                    <tbody>
                        {tasks?.map((task, id) => (
                            <TableRow key={id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const Dashboard = () => {

    const totalTasks = useSelector((state) => state.task.tasks);
    const todoTasks = useSelector((state) => state.task.todoTasks);
    const completedTasks = useSelector((state) => state.task.completedTasks);
    const inProgressTasks = useSelector((state) => state.task.inProgressTasks);
    const user = useSelector((state) => state.auth.user);
    const fullName = user ? user.fullName : '';

    const stats = [
        {
            _id: "1",
            label: "TOTAL TASK",
            total: totalTasks?.length || 0,
            icon: <FaNewspaper />,
            bg: "bg-[#1d4ed8]",
        },
        {
            _id: "2",
            label: "COMPLETED TASK",
            total: completedTasks.length || 0,
            icon: <MdAdminPanelSettings />,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "TASK IN PROGRESS ",
            total: inProgressTasks.length || 0,
            icon: <LuClipboardEdit />,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "TODOS",
            total: todoTasks.length || 0,
            icon: <FaArrowsToDot />,
            bg: "bg-[#be185d]" || 0,
        },
    ];

    const Card = ({ label, count, bg, icon }) => {
        return (
            <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
                <div className='h-full flex flex-1 flex-col justify-between'>
                    <p className='text-base text-gray-600'>{label}</p>
                    <span className='text-2xl font-semibold'>{count}</span>
                </div>

                <div
                    className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white",
                        bg
                    )}
                >
                    {icon}
                </div>
            </div>
        );
    };
    return (
        <div className='h-full py-4'>
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-left text-purple-700 font-bold mt-8 pl-3 pb-8">
                Hey, {user && fullName}!
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {stats.map(({ icon, bg, label, total }, index) => (
                    <Card key={index} icon={icon} bg={bg} label={label} count={total} />
                ))}
            </div>

            <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
                <TaskTable tasks={totalTasks} />
            </div>
        </div>
    );
};

export default Dashboard;