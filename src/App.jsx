import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./components/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { CheckOutPage } from "./pages/CheckOutPage";
import AboutPages from "./pages/AboutPages";

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
      {
        path: "/checkout",
        element: <CheckOutPage />,
      },
       {
        path: "/about-us",
        element: <AboutPages />,
      }
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
