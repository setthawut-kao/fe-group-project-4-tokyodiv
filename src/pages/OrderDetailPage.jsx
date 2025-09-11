import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/features/products/ProductCard";
import { Textarea } from "@/components/ui/textarea";
import { TitleBar } from "@/components/shared/TitleBar";
import { Typography } from "@/components/ui/typography";

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
      address: "789 Backend Blvd, API City 20000",
    },
  },
  {
    _id: "65f0a1b2c3d4e5f6a7b8c9s0",
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
      address: "789 Backend Blvd, API City 20000",
    },
  },
];
// --- END MOCK DATA ---

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const foundOrder = MOCK_ORDERS.find((o) => o._id === orderId);
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
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-background z-50 p-4 text-center">
        <Lottie
          animationData={errorAnimationData}
          loop={true}
          className="w-60 h-60"
        />
        <Typography as="p" className="text-red-500">
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
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-background z-50 p-4 text-center">
        <Lottie
          animationData={errorAnimationData}
          loop={true}
          className="w-60 h-60"
        />
        <Typography as="h2">Order Not Found</Typography>
        <Typography as="p">
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
    <div className="lex flex-col gap-3 lg:gap-6 my-10 lg:my-20">
      <TitleBar
        title={`Order Details #${order._id.slice(-6).toUpperCase()}`}
        onBack={() => navigate("/orders")}
      />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 items-start">
        <div className="flex flex-wrap lg:col-span-3 gap-4 justify-between items-center p-3 bg-white rounded-base border-2 border-border shadow-shadow">
          <Typography as="h4">Ordered On: {orderDate}</Typography>
          <Badge className="px-2 py-1">{order.status || "Processing"}</Badge>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Typography as="h3">Items ({order.products.length})</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-10">
            {order.products.map((item) => (
              <ProductCard key={item._id} product={item} variant="cart" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-3 lg:sticky top-28">
          <div className="bg-white p-6 space-y-3 rounded-base border-2 border-border shadow-shadow">
            <Typography as="h4">Shipping Details</Typography>
            <div className="grid gap-2">
              <Label htmlFor="recipientName">Full Name</Label>
              <Input
                id="recipientName"
                value={order.shippingDetails?.recipientName || ""}
                readOnly
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={order.shippingDetails?.phoneNumber || ""}
                readOnly
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={order.shippingDetails?.address || ""}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="bg-white p-6 space-y-3 rounded-base border-2 border-border shadow-shadow">
            <Typography as="h4">Order Total</Typography>
            <div className="flex justify-between border-t pt-3">
              <span>Total Paid</span>
              <span>{order.totalAmount?.toFixed(2) || "0.00"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
