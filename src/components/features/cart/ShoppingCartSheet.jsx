import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/useCartStore";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CartItem } from "./CartItem";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingBag } from "lucide-react";

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Typography as="h2">Your cart is empty</Typography>
    <Typography as="p" className="text-emerald-700">
      Find something special to give it a new life.
    </Typography>
  </div>
);

const ActiveCartView = ({
  items,
  selectedItemIds,
  removeFromCart,
  toggleItemSelection,
}) => {
  const { isLoggedIn, openAuthDialog } = useAuthStore(); // 👈 ดึง state และ action ของ Auth มา
  const { closeCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      // เมื่อยังไม่ Login ให้ฝากงานไว้ว่า "หลังจาก login เสร็จ ให้ปิดตะกร้า แล้วพาไป checkout"
      closeCart(); // ปิดตะกร้าก่อนเปิดหน้า login เพื่อ UX ที่ดี
      openAuthDialog(() => navigate("/checkout"));
    }
  };

  const subtotal = items
    .filter((item) => selectedItemIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col w-full h-full">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              isSelected={selectedItemIds.includes(item.id)}
              onToggleSelection={toggleItemSelection}
              onRemove={removeFromCart}
            />
          ))}
        </div>
      </ScrollArea>

      <SheetFooter className="bg-white">
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <div>
              <Typography as="p">Subtotal</Typography>
            </div>
            <div className="flex items-baseline gap-1">
              <Typography as="h4">{subtotal}</Typography>
              <Typography as="small" className="text-neutral-700 font-semibold">
                THB
              </Typography>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full"
            size="lg"
            disabled={selectedItemIds.length === 0}
          >
            <ShoppingBag />
            Proceed to Checkout <ArrowRight />
          </Button>
        </div>
      </SheetFooter>
    </div>
  );
};

export const ShoppingCartSheet = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    selectedItemIds,
    toggleItemSelection,
  } = useCartStore();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col">
        <SheetHeader className="bg-white">
          <SheetTitle>
            Your Shopping Cart <Badge>{cartItems.length}</Badge>
          </SheetTitle>
          <SheetDescription>
            Review and manage the items in your cart here.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {cartItems.length === 0 ? (
            <EmptyCartView />
          ) : (
            <ActiveCartView
              items={cartItems}
              selectedItemIds={selectedItemIds}
              removeFromCart={removeFromCart}
              toggleItemSelection={toggleItemSelection}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
