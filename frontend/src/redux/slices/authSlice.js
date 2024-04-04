import { createSlice } from "@reduxjs/toolkit";


const user = {
    _id: "662f32ffd1303cc",
    name: "Codewave",
    title: "Administrator",
    role: "Admin",
    email: "admin@mts.com",
    isAdmin: true,
    tasks: [],
    createdAt: "2024-02-06T09:58:44.794Z",
    updatedAt: "2024-02-07T06:13:26.757Z",
    __v: 0,
    isActive: true,
};

const initialState = {
    user: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : user,

    isSidebarOpen: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;