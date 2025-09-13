import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./components/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPages } from "./pages/AboutPages";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";

import Lottie from "lottie-react";
import errorAnimationData from "@/assets/animations/error_animation.json";
<<<<<<< HEAD
import { AboutPages } from "./pages/AboutPages";
import EditUser from "./pages/EditUser";
=======
>>>>>>> 49680e055f23d9889d292d795f3bfd7b10ed5d07

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
          className="w-140 h-140"
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
      {
<<<<<<< HEAD
        path: "/edit-user",
        element: <EditUser />,
=======
        element: <ProtectedRoute />,
        children: [
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/order-success",
            element: <OrderSuccessPage />,
          },
          // {
          //   path: "/profile",
          //   element: <ProfilePage />,
          // },
          {
            path: "/orders",
            element: <OrderHistoryPage />,
          },
          {
            path: "/orders/:orderId",
            element: <OrderDetailPage />,
          },
        ],
>>>>>>> 49680e055f23d9889d292d795f3bfd7b10ed5d07
      },
      // {
      //   path: "/checkout",
      //   element: <CheckoutPage />,
      // },
      // {
      //   path: "/order-success",
      //   element: <OrderSuccessPage />,
      // },
      // {
      //   path: "/orders",
      //   element: <OrderHistoryPage />,
      // },
      // {
      //   path: "/orders/:orderId",
      //   element: <OrderDetailPage />,
      // },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
