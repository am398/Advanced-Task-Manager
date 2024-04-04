
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import  Login  from "./pages/Login";
import { Tasks } from "./pages/Tasks";
import { Toaster } from "sonner";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "tasks", element: <Tasks /> },
    ],
  },
  {
    path: "log-in",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <div className="App" text-white >
      <RouterProvider router={router} />
      <Toaster richColors/>
    </div>
  );
}


