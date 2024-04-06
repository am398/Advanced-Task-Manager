import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import { deleteTask } from "../redux/slices/taskSlice";
import { useDispatch } from 'react-redux';

export default function ConfirmationDialog({
    open,
    setOpen,
    taskId,
}) 
{
    const dispatch = useDispatch();
    const deleteHandler = (taskId) => {
        const success = deleteTask(taskId,dispatch);
        if (success) {
            setOpen(false);
        }
     };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                    <Dialog.Title as='h3' className=''>
                        <p
                            className=
                            "p-3 rounded-full text-red-600 bg-red-200"
                        >
                            <FaQuestion size={60} />
                        </p>
                    </Dialog.Title>

                    <p className='text-center text-gray-500'>
                        {"Are you sure you want to delete the selected record?"}
                    </p>

                    <div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
                        <Button
                            type='button'
                            className="px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500"
                            onClick={() => deleteHandler(taskId)}
                            label={"Delete"}
                        />

                        <Button
                            type='button'
                            className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
                            onClick={() => setOpen(false)}
                            label='Cancel'
                        />
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
}