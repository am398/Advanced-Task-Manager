import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const Login = () => {
    const { user } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
                {/* left side */}
                <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base font-semibold border-gray-300 text-gray-900 bg-blue-200 shadow-md'>
                            Stay ahead, Stay Organized: Task Manager to the rescue!
                        </span>

                        <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                            <span className="text-pink-500"> My </span>
                            <span className="text-pink-500">Task Manager</span>
                        </p>

                        <div className='cell'>
                            <div className=' bg-gradient-to-br from-purple-400 to-pink-500 animate-pulse shadow-lg'></div>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form
                        onSubmit={handleSubmit()}
                        className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
                    >
                        <div className=''>
                            <p className='text-blue-600 text-3xl font-bold text-center'>
                                Welcome !
                            </p>
                            <p className='text-center text-base text-gray-700 '>
                                Unlock your potential with seamless task management
                            </p>
                        </div>

                        <div className='flex flex-col items-center gap-y-5'>
                            <p className="text-center text-purple-700">Sign in to access your account</p>
                            <div className='w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full h-10'>
                                <SignInButton />
                            </div>


                            <div className='w-full flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full h-10'>
                                <SignUpButton />
                            </div>
                            <p className="text-center text-green-700">Don't have an account? Sign up now!</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;