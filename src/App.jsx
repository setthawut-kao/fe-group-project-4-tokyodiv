import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./components/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found</h1>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
