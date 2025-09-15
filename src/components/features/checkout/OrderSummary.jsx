import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import { formatCurrency } from "@/lib/utils";

export const OrderSummary = ({ subtotal, onConfirm, isConfirmDisabled }) => {
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <div className="space-y-6">
      <Typography as="h4">Order Summary</Typography>
      <div className="flex justify-between items-center">
        <Typography as="small">Subtotal</Typography>
        <div className="flex items-baseline gap-1">
          <Typography as="small">{formatCurrency(subtotal)}</Typography>
          <Typography as="small" className="text-neutral-700">
            THB
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Typography as="small">Shipping</Typography>
        <div className="flex items-baseline gap-1">
          <Typography as="small">{formatCurrency(shippingFee)}</Typography>
          <Typography as="small" className="text-neutral-700">
            THB
          </Typography>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <Typography as="h4">Total</Typography>
        <div className="flex items-baseline gap-1">
          <Typography as="h4">{formatCurrency(total)}</Typography>
          <Typography as="h4" className="text-neutral-700">
            THB
          </Typography>
        </div>
      </div>
      <Button
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        className="w-full cursor-pointer"
        size="lg"
      >
        Confirm Order
      </Button>
    </div>
  );
};
