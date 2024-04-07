import clsx from "clsx";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddTask from "./task/AddTask";

const TaskTitle = ({ label, className }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full ", className)} />
        <p className='text-sm md:text-base text-gray-600'>{label}</p>
      </div>

      <button onClick={() => setOpenEdit(true)} className='hidden md:block'>

        <IoMdAdd className='text-lg text-black' />
      </button>
      <AddTask
        open={openEdit}
        value={label} 
        setOpen={setOpenEdit}
        key={new Date().getTime()}
      />
    </div>
  );
};

export default TaskTitle;