import { useState, useEffect } from "react";
// import { Container } from "@/components/shared/Container"; // 👈 ลบออก
import { Typography } from "@/components/ui/typography";

import { TitleBar } from "@/components/shared/TitleBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- MOCK DATA TEMPORARY ---
const MOCK_ORDERS = [
  {
    _id: "65f0a1b2c3d4e5f6a7b8c9d0",
    orderDate: "2024-03-10T10:00:00.000Z",
    totalAmount: 12500.0,
    status: "Processing",
    products: [
      {
        _id: "prod1",
        name: "Vintage Wooden Chair",
        imageUrl: "/placeholders/chair1.webp",
        price: 1500,
        quantity: 1,
      },
      {
        _id: "prod2",
        name: "Classic Leather Sofa",
        imageUrl: "/placeholders/sofa1.webp",
        price: 10000,
        quantity: 1,
      },
    ],
    shippingDetails: {
      recipientName: "Test User 1",
      phoneNumber: "0812345678",
      address: "123 Main St, City, Country 10000",
    },
  },
  {
    _id: "65f0a1b2c3d4e5f6a7b8c9d1",
    orderDate: "2024-02-22T14:30:00.000Z",
    totalAmount: 2000.0,
    status: "Delivered",
    products: [
      {
        _id: "prod3",
        name: "Industrial Coffee Table",
        imageUrl: "/placeholders/table1.webp",
        price: 2000,
        quantity: 1,
      },
    ],
    shippingDetails: {
      recipientName: "Test User 1",
      phoneNumber: "0812345678",
      address: "123 Main St, City, Country 10000",
    },
  },
];
// --- END MOCK DATA ---

import Lottie from "lottie-react";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";
import { OrderCard } from "@/components/features/orders/OrderCard";
// import axios from "@/lib/axios"; // 👈 ไม่มี axios แล้ว
// import { useAuthStore } from "@/stores/useAuthStore"; // 👈 ไม่มี useAuthStore แล้ว

export const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- SIMULATE API CALL WITH MOCK DATA ---
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // หน่วงเวลา 1 วินาที
        setOrders(MOCK_ORDERS);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError(
          "Unable to load order history. Please try again or contact support."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center items-center min-h-[50vh]">
        <Lottie
          animationData={loadingAnimationData}
          loop={true}
          className="w-32 h-32"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center items-center min-h-[50vh] text-center">
        <Lottie
          animationData={errorAnimationData}
          loop={false}
          className="w-32 h-32"
        />
        <Typography as="p" className="text-red-500 mt-4 text-lg font-semibold">
          {error}
        </Typography>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {" "}
      {/* 👈 ใช้ div แทน Container */}
      <TitleBar title="Your Order History" onBack={() => navigate(-1)} />
      <div className="mt-8 space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <div className="p-8 text-center bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_#000]">
            <Typography as="p" className="text-slate-600 text-lg">
              You haven't placed any orders yet.
            </Typography>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
