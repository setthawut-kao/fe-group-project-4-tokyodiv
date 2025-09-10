import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { ArrowRight } from "lucide-react";

export const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const orderDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-base border-2 border-border shadow-shadow p-6 space-y-3">
      <div className="flex flex-col items-start border-b pb-3">
        <div className="flex gap-3 items-center">
          <Typography as="h4">
            Order{" "}
            <span className="text-emerald-700">
              #{order._id.slice(-6).toUpperCase()}
            </span>
          </Typography>
          <div>
            <Badge variant="outline">{order.status || "Processing"}</Badge>
          </div>
        </div>
        <Typography as="p" className="text-neutral-600">
          Placed on {orderDate}
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Typography as="p">Total Amount:</Typography>
          <div className="flex items-baseline gap-1">
            <Typography as="h4">{order.totalAmount.toFixed(2)}</Typography>
            <Typography as="p" className="text-neutral-700">
              THB
            </Typography>
          </div>
        </div>
        <div className="flex flex-col justify-between text-right">
          <Typography as="p">Items</Typography>
          <Typography as="h4">{order.products.length}</Typography>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t flex justify-end">
        <Button
          variant="neutral"
          onClick={() => navigate(`/orders/${order._id}`)}
        >
          View Details <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
