import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "@/stores/useCartStore";
import { createOrder } from "@/services/orderService";

import { ProductCard } from "@/components/features/products/ProductCard";
import { Typography } from "@/components/ui/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShippingForm } from "@/components/features/checkout/ShippingForm";
import { OrderSummary } from "@/components/features/checkout/OrderSummary";
import { TitleBar } from "@/components/shared/TitleBar";

export const CheckoutPage = () => {
  const { cartItems, selectedItemIds, clearCheckedOutItems } = useCartStore();

  const navigate = useNavigate();

  const location = useLocation();

  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    address: "",
  });

  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsFromCart = cartItems.filter((item) =>
    selectedItemIds.includes(item._id)
  );

  const itemsToCheckout = location.state?.itemsToCheckout || itemsFromCart;

  const subtotal = itemsToCheckout.reduce((sum, item) => sum + item.price, 0);

  const isFormValid =
    formData.recipientName && formData.phoneNumber && formData.address;

  const handleConfirmOrder = () => {
    if (!isFormValid) {
      alert("Please fill in all shipping details.");
      return;
    }
    setIsConfirmAlertOpen(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        shippingDetails: formData,
        products: itemsToCheckout.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalAmount: subtotal,
      };

      await createOrder(orderData);

      clearCheckedOutItems();
      navigate("/order-success");
    } catch (error) {
      console.error("Failed to submit order:", error);
      alert(error.message || "There was an issue placing your order.");
      setIsConfirmAlertOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 my-3 lg:my-10 items-start relative">
        <div className="lg:col-span-2 space-y-6 p-6 bg-white rounded-base border-2 border-border shadow-shadow">
          <TitleBar title="Checkout" onBack={() => navigate(-1)} />
          <Typography as="h4">
            Review Your Items ({itemsToCheckout.length})
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {itemsToCheckout.map((item) => (
              <ProductCard key={item._id} product={item} variant="cart" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-3 lg:sticky top-28">
          <div className="bg-white p-6 rounded-base border-2 border-border shadow-shadow">
            <ShippingForm formData={formData} setFormData={setFormData} />
          </div>
          <div className="bg-white p-6 rounded-base border-2 border-border shadow-shadow">
            <OrderSummary
              subtotal={subtotal}
              onConfirm={handleConfirmOrder}
              isConfirmDisabled={itemsToCheckout.length === 0 || !isFormValid}
            />
          </div>
        </div>
      </div>

      <AlertDialog
        open={isConfirmAlertOpen}
        onOpenChange={setIsConfirmAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
            <AlertDialogDescription>
              Please confirm your shipping details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Confirm & Place Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
