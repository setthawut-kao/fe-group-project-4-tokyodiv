import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "@/services/orderService";

import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/features/orders/OrderCard";
import { Typography } from "@/components/ui/typography";
import { TitleBar } from "@/components/shared/TitleBar";

import { Animation } from "@/components/shared/Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";

export const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedOrders = await fetchMyOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError("Unable to load order history.");
      } finally {
        setIsLoading(false);
      }
    };
    getOrders();
  }, []);

  if (isLoading) {
    return (
      <Animation
        type="fullPage"
        loop={true}
        animationData={loadingAnimationData}
      />
    );
  }

  if (error) {
    return (
      <Animation
        type="fullPage"
        loop={true}
        animationData={errorAnimationData}
        message={error}
      />
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
