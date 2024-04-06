
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { Toaster } from "sonner";
import TaskDetails from "./pages/TaskDetails";
import { useUser } from "@clerk/clerk-react";
import { setCredentials } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTasks } from "./redux/slices/taskSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "tasks", element: <Tasks /> },
      { path: "completed/:status", element: <Tasks /> },
      { path: "in-progress/:status", element: <Tasks /> },
      { path: "todo/:status", element: <Tasks /> },
      { path: "task/:id", element: <TaskDetails /> },
    ],
  },
  {
    path: "log-in",
    element: (
      <Login />
    )
  },
]);

export default function App() {
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();

  if (isSignedIn) {
    const { id, username, fullName, primaryEmailAddress, primaryPhoneNumber, hasImage, imageUrl } = user;
    const email = primaryEmailAddress.emailAddress;
    dispatch(setCredentials({ id, username, fullName, email, primaryPhoneNumber, hasImage, imageUrl }));
    dispatch(getAllTasks(id));
  }
  return (
    <div className="App" text-white >
      <RouterProvider router={router} />
      <Toaster richColors />
    </div>
  );
}


