import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
    MdOutlineDoneAll,
    MdOutlineMessage,
    MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loader";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { MdAttachFile } from "react-icons/md";

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
};

const bgColor = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-blue-200",
};

const TABS = [
    { title: "Task Detail", icon: <FaTasks /> },
];


const TaskDetails = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState(0);
    const tasks = useSelector((state) => state.task.tasks);
    const task = tasks.find((task) => task._id === id);

    if (!task) {
        return (
            <div className='w-full flex items-center justify-center h-screen'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
            <h1 className='text-2xl text-gray-600 font-bold'>{task?.title}</h1>

            <Tabs tabs={TABS} setSelected={setSelected}>
                <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto'>
                    {/* LEFT */}
                    <div className='w-full md:w-1/2 space-y-8'>
                        <div className='flex items-center gap-5'>
                            <div
                                className={clsx(
                                    "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                                    PRIOTITYSTYELS[task?.priority],
                                    bgColor[task?.priority]
                                )}
                            >
                                <span className='text-lg'>{ICONS[task?.priority]}</span>
                                <span className='uppercase'>{task?.priority} Priority</span>
                            </div>

                            <div className={clsx("flex items-center gap-2")}>
                                <div
                                    className={clsx(
                                        "w-4 h-4 rounded-full",
                                        TASK_TYPE[task.stage]
                                    )}
                                />
                                <span className='text-black uppercase'>{task?.stage}</span>
                            </div>
                        </div>

                        <p className='text-gray-500'>
                            Created At: {new Date(task?.date).toDateString()}
                        </p>

                        <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
                            <div className='space-x-2'>
                                <span className='font-semibold'>Assets :</span>
                                <span>{task?.assets?.length}</span>
                            </div>

                            <span className='text-gray-400'>|</span>

                            <div className='space-x-2'>
                                <span className='font-semibold'>Sub-Task :</span>
                                <span>{task?.subTasks?.length}</span>
                            </div>
                        </div>

                        <div className='space-y-4 py-6'>
                            <p className='text-gray-500 font-semibold text-sm'>
                                SUB-TASKS
                            </p>
                            <div className='space-y-8'>
                                {task?.subTasks?.map((el, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200'>
                                            <MdTaskAlt className='text-violet-600' size={26} />
                                        </div>

                                        <div className='space-y-1'>
                                            <div className='flex gap-2 items-center'>
                                                <span className='text-sm text-gray-500'>
                                                    {new Date(el?.date).toDateString()}
                                                </span>

                                                <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                                                    {el?.tag}
                                                </span>
                                            </div>

                                            <p className='text-gray-700'>{el?.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className='w-full md:w-1/2 space-y-8'>
                        <p className='text-lg font-semibold'>ASSETS</p>

                        <div className='w-full grid grid-cols-2 gap-4'>
                            {task?.assets?.map((el, index) => (
                                <img
                                    key={index}
                                    src={el}
                                    alt={task?.title}
                                    className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default TaskDetails;