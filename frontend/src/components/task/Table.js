import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
    MdAttachFile,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import Button from "../Button";
import ConfirmationDialogs from "../ConfirmationDialogs";
import { useNavigate } from 'react-router-dom';
import { set } from "mongoose";
import AddTask from './AddTask';

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);


    const handleOpenDialog = (taskId) => {
        setSelectedTaskId(taskId);
        setOpenDialog(true);
    };
    const handleOpenEdit = (task) => {
        setSelectedTask(task);
        setOpenEdit(true);
    };


    const navigate = useNavigate();

    const TableHeader = () => (
        <thead className='w-full border-b border-gray-300'>
            <tr className='w-full text-black  text-left'>
                <th className='py-2'>Task Title</th>
                <th className='py-2'>Priority</th>
                <th className='py-2 line-clamp-1'>Created At</th>
                <th className='py-2'>Assets</th>
            </tr>
        </thead>
    );

    const TableRow = ({ task, onEditClick, onDeleteClick }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
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
                <div className={"flex gap-1 items-center"}>
                    <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
                        {ICONS[task?.priority]}
                    </span>
                    <span className='capitalize line-clamp-1'>
                        {task?.priority} Priority
                    </span>
                </div>
            </td>

            <td className='py-2'>
                <span className='text-sm text-gray-600'>
                    {formatDate(new Date(task?.date))}
                </span>
            </td>

            <td className='py-2'>
                <div className='flex items-center gap-3'>
                    <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
                        <MdAttachFile />
                        <span>{task?.assets?.length}</span>
                    </div>
                    <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
                        <FaList />
                        <span>0/{task?.subTasks?.length}</span>
                    </div>
                </div>
            </td>

            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label='Edit'
                    type='button'
                    onClick={() => onEditClick(task)}
                />

                <Button
                    className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
                    label='Delete'
                    type='button'
                    onClick={() => onDeleteClick(task._id)}
                />
            </td>
        </tr>
    );
    return (
        <>
            <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
                <div className='overflow-x-auto'>
                    <table className='w-full '>
                        <TableHeader />
                        <tbody>
                            {tasks.map((task, index) => (
                                <>
                                    <TableRow key={index} task={task} onEditClick={() => handleOpenEdit(task)} onDeleteClick={() => handleOpenDialog(task._id)} />
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {openEdit && <AddTask open={openEdit} setOpen={setOpenEdit} currenttask={selectedTask} />}
            {openDialog && <ConfirmationDialogs open={openDialog} setOpen={setOpenDialog} taskId={selectedTaskId} />}
        </>

    );
};

export default Table;