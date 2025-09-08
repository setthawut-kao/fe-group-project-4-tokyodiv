import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export const OrderSummary = ({ subtotal, onConfirm, isConfirmDisabled }) => {
  const shippingFee = 0; // สมมติว่าค่าส่งฟรีสำหรับ MVP
  const total = subtotal + shippingFee;

  return (
    <div className="p-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_#000] space-y-4">
      <Typography as="h2" className="text-2xl font-bold">
        Order Summary
      </Typography>
      <div className="flex justify-between text-slate-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Shipping</span>
        <span>${shippingFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-xl border-t pt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        className="w-full"
        size="lg"
      >
        Confirm Order
      </Button>
    </div>
  );
};
