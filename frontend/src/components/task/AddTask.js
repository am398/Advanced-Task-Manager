import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
// import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { addTask } from "../../redux/slices/taskSlice";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen,currenttask }) => {
    const task = "";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [stage, setStage] = useState(currenttask?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState(
        currenttask?.priority?.toUpperCase() || PRIORIRY[2]
    );
    setValue('priority', priority);
    setValue('stage', stage);
    const [loading, setloading] = useState(false);

    let user = useSelector(state => state.auth.user);
    if (user)
        user = user.id;

    const dispatch = useDispatch();

    const submitHandler = async (formData) => {
        formData.user_id = user;
        setloading(true);
        const success = addTask(formData,dispatch);
        if (success) {
            setloading(false);
            setOpen(false);
        }
    };


    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {currenttask ? "UPDATE TASK" : "ADD TASK"}
                    </Dialog.Title>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Task Title'
                            type='text'
                            name='title'
                            label='Task Title'
                            className='w-full rounded'
                            defaultValue={currenttask ? currenttask.title : ""}
                            register={register("title", { required: "Title is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <div className='flex gap-4'>
                            <SelectList
                                label='Task Stage'
                                lists={LISTS}
                                selected={stage}
                                setSelected={(selected) => {
                                    setStage(selected);
                                    setValue('stage', stage);
                                }}
                            />

                            <div className='w-full'>
                                <Textbox
                                    placeholder='Date'
                                    type='date'
                                    name='date'
                                    label='Task Date'
                                    className='w-full rounded'
                                    register={register("date", {
                                        required: "Date is required!",
                                    })}
                                    error={errors.date ? errors.date.message : ""}
                                />
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div className='flex-1'>
                                <SelectList
                                    label='Priority Level'
                                    lists={PRIORIRY}
                                    selected={priority}
                                    setSelected={(selected) => {
                                        setPriority(selected);
                                        setValue('priority', priority);
                                    }}
                                />
                            </div>

                            <div className='flex-1'>
                                <div className='w-full'>
                                    <Textbox
                                        placeholder='Paste link here...'
                                        type='text'
                                        name='assetLink'
                                        label='Asset Link'
                                        className='w-full rounded'
                                        register={register("assetLink")}
                                        error={errors.assetLink ? errors.assetLink.message : ""}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
                            {loading ? (
                                <span className='text-sm py-2 text-red-500'>
                                    Submitting ...
                                </span>
                            ) : (
                                <Button
                                    label='Submit'
                                    type='submit'
                                    className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                                />
                            )}

                            <Button
                                type='button'
                                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                onClick={() => setOpen(false)}
                                label='Cancel'
                            />
                        </div>
                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

export default AddTask;