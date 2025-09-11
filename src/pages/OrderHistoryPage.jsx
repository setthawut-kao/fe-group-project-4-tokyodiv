import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/features/orders/OrderCard";
import { Typography } from "@/components/ui/typography";
import { TitleBar } from "@/components/shared/TitleBar";

import Lottie from "lottie-react";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";

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
  {
    _id: "65f0a1b2c3d4e5f6a7b8c9d2",
    orderDate: "2024-02-22T14:30:00.000Z",
    totalAmount: 2000.0,
    status: "Delivered",
    products: [
      {
        _id: "prod4",
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <div className="fixed inset-0 flex justify-center items-center bg-background z-50">
        <Lottie
          animationData={loadingAnimationData}
          loop={true}
          className="w-60 h-60"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-background z-50">
        <Lottie
          animationData={errorAnimationData}
          loop={true}
          className="w-60 h-60"
        />
        <Typography as="p" className="text-red-500">
          {error}
        </Typography>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-6 my-10 lg:my-20 items-center">
      <TitleBar title="Your Order History" onBack={() => navigate("/")} />
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-3 lg:gap-10">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <div className="p-8 text-center bg-white rounded-base border-2 border-border shadow-shadow">
            <Typography as="h4">You haven't placed any orders yet.</Typography>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
