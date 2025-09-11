import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./components/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
// import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";

import Lottie from "lottie-react";
import errorAnimationData from "@/assets/animations/error_animation.json";
import { AboutPages } from "./pages/AboutPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <section className="w-full h-screen flex justify-center items-center">
        <Lottie
          animationData={errorAnimationData}
          loop={true}
          autoplay={true}
        />
      </section>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about-us",
        element: <AboutPages />,
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "/checkout",
      //       element: <CheckoutPage />,
      //     },
      //     {
      //       path: "/order-success",
      //       element: <OrderSuccessPage />,
      //     },
      //     {
      //       path: "/orders",
      //       element: <OrderHistoryPage />,
      //     },
      //   ],
      // },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "/orders",
        element: <OrderHistoryPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailPage />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
