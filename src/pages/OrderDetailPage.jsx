import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderById } from "@/services/orderService";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/features/products/ProductCard";
import { Textarea } from "@/components/ui/textarea";
import { TitleBar } from "@/components/shared/TitleBar";
import { Typography } from "@/components/ui/typography";

import { formatCurrency, formatDate } from "@/lib/utils";

import { Animation } from "@/components/shared/Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const foundOrder = await fetchOrderById(orderId);
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
      getOrderDetails();
    } else {
      setIsLoading(false);
      setError("Invalid order ID provided.");
    }
  }, [orderId]);

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

  if (!order) {
    return (
      <div>
        <Animation
          type="fullPage"
          loop={true}
          animationData={errorAnimationData}
          message={error}
        />
        ;
        <Button className="mt-3" onClick={() => navigate("/orders")}>
          Back to Order History
        </Button>
      </div>
    );
  }

  return (
    <div className="lex flex-col gap-3 lg:gap-10 my-10 lg:my-20">
      <TitleBar
        title={`Order Details #${order._id.slice(-6).toUpperCase()}`}
        onBack={() => navigate("/orders")}
      />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 items-start">
        <div className="flex flex-wrap lg:col-span-3 gap-4 justify-between items-center p-3 bg-white rounded-base border-2 border-border shadow-shadow">
          <Typography as="h4">
            Ordered On: {formatDate(order.orderDate)}
          </Typography>
          <Badge className="px-2 py-1">{order.status || "Delivered"}</Badge>
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
              <span>
                <Typography as="p">Total Paid</Typography>
              </span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
