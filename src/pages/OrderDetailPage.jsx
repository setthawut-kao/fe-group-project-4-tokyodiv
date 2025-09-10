import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Container } from "@/components/shared/Container"; // 👈 ลบออก
import { Typography } from "@/components/ui/typography";
// import { ProductCard } from "@/features/products/ProductCard";

import { TitleBar } from "@/components/shared/TitleBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      address: "789 Backend Blvd, API City 20000",
    },
  },
];
// --- END MOCK DATA ---

import Lottie from "lottie-react";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";
import { ProductCard } from "@/components/features/products/ProductCard";
// import axios from "@/lib/axios"; // 👈 ไม่มี axios แล้ว
// import { useAuthStore } from "@/stores/useAuthStore"; // 👈 ไม่มี useAuthStore แล้ว

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- SIMULATE API CALL WITH MOCK DATA ---
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // หน่วงเวลา 1 วินาที
        const foundOrder = MOCK_ORDERS.find((o) => o._id === orderId); // ค้นหาจาก Mock Data
        setOrder(foundOrder);
      } catch (err) {
        console.error(`Failed to fetch order ${orderId}:`, err);
        setError(
          `Unable to load details for order #${orderId
            ?.slice(-6)
            .toUpperCase()}.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    } else {
      setIsLoading(false);
      setError("Invalid order ID provided.");
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center items-center min-h-[70vh]">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center items-center min-h-[70vh] text-center">
        <Lottie
          animationData={errorAnimationData}
          loop={false}
          className="w-32 h-32"
        />
        <Typography as="p" className="text-red-500 mt-4 text-lg font-semibold">
          {error}
        </Typography>
        <Button className="mt-4" onClick={() => navigate("/orders")}>
          Back to Order History
        </Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center items-center min-h-[70vh] text-center">
        <Typography as="h2" className="text-2xl font-bold">
          Order Not Found
        </Typography>
        <Typography as="p" className="text-slate-600 mt-2">
          The order details you are looking for could not be found.
        </Typography>
        <Button className="mt-4" onClick={() => navigate("/orders")}>
          Back to Order History
        </Button>
      </div>
    );
  }

  const orderDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {" "}
      {/* 👈 ใช้ div แทน Container */}
      <TitleBar
        title={`Order Details #${order._id.slice(-6).toUpperCase()}`}
        onBack={() => navigate("/orders")}
      />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-3 flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-lg border-2 border-black">
          <Typography as="p" className="text-lg font-semibold">
            Ordered On: {orderDate}
          </Typography>
          <Badge variant="outline" className="px-4 py-2 text-base">
            {order.status || "Processing"}
          </Badge>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Typography as="h3" className="text-xl font-semibold">
            Items ({order.products.length})
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {order.products.map((item) => (
              <ProductCard key={item._id} product={item} variant="cart" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8 lg:sticky top-28">
          <div className="space-y-6">
            <Typography as="h2" className="text-2xl font-bold">
              Shipping Details
            </Typography>
            <div>
              <Label htmlFor="recipientName">Full Name</Label>
              <Input
                id="recipientName"
                value={order.shippingDetails?.recipientName || ""}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={order.shippingDetails?.phoneNumber || ""}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={order.shippingDetails?.address || ""}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="p-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_#000] space-y-4">
            <Typography as="h2" className="text-2xl font-bold">
              Order Total
            </Typography>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total Paid</span>
              <span>${order.totalAmount?.toFixed(2) || "0.00"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
