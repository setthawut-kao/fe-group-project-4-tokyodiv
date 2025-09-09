import { useState } from "react";

import { CheckoutItem } from "@/components/features/checkout/CheckoutItem";
import { OrderSummary } from "@/components/features/checkout/OrderSummary";
import { ShippingForm } from "@/components/features/checkout/ShippingForm";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useCartStore } from "@/stores/useCartStore";
import { ArrowLeft } from "lucide-react";

export const CheckOutPage = () => {
  const { cartItems, selectedItemIds } = useCartStore();

  // State สำหรับฟอร์ม
  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    address: "",
  });

  // State สำหรับควบคุม Alert
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);

  // กรองเฉพาะสินค้าที่ถูกเลือกมาแสดง
  const itemsToCheckout = cartItems.filter((item) =>
    selectedItemIds.includes(item.id)
  );

  // คำนวณราคารวม
  const subtotal = itemsToCheckout.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = () => {
    // TODO: เช็คว่าฟอร์มถูกกรอกครบถ้วนหรือไม่
    setIsConfirmAlertOpen(true);
  };

  const handleFinalSubmit = () => {
    // TODO: รวบรวมข้อมูลทั้งหมด (formData, itemsToCheckout) แล้วยิง API ไปยัง Backend
    console.log("Submitting order...", { formData, itemsToCheckout });
    // TODO: เมื่อสำเร็จ ให้ navigate ไปหน้า /order-success
  };

  return (
    <section className="flex flex-col gap-10 lg:gap-30 my-10 lg:my-20 ">
      <div className="flex gap-3">
        <Button variant="neutral" size="icon">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Typography as="h2">Checkout</Typography>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white border-2 border-black rounded-lg p-2 space-y-2">
            {itemsToCheckout.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </div>
          <div className="space-y-8">
            <ShippingForm formData={formData} setFormData={setFormData} />
            <OrderSummary
              subtotal={subtotal}
              onConfirm={handleConfirmOrder}
              isConfirmDisabled={itemsToCheckout.length === 0}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
