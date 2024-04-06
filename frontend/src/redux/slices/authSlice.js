import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isSidebarOpen: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export const setUserInfo = (userInfo) => (dispatch) => {
    dispatch(setCredentials(userInfo));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const clearUserInfo = () => (dispatch) => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
};

export default authSlice.reducer;
