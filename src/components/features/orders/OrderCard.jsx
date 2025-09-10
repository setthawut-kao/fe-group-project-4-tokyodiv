import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const orderDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_#000] p-6 space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center border-b pb-3 mb-3">
        <div>
          <Typography as="h3" className="text-xl font-bold">
            Order{" "}
            <span className="text-emerald-700">
              #{order._id.slice(-6).toUpperCase()}
            </span>
          </Typography>
          <Typography as="p" className="text-sm text-slate-500">
            Placed on {orderDate}
          </Typography>
        </div>
        <Badge variant="outline">{order.status || "Processing"}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-slate-700">
        <div>
          <Typography as="p" className="font-semibold">
            Total Amount:
          </Typography>
          <Typography as="p" className="text-lg font-bold">
            ${order.totalAmount.toFixed(2)}
          </Typography>
        </div>
        <div className="text-right">
          <Typography as="p" className="font-semibold">
            Items:
          </Typography>
          <Typography as="p" className="text-lg font-bold">
            {order.products.length}
          </Typography>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-end">
        <Button
          variant="outline"
          onClick={() => navigate(`/orders/${order._id}`)}
        >
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
