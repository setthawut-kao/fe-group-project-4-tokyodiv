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
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { CartItem } from "./CartItem";

import { formatCurrency } from "@/lib/utils";

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
      closeCart();
      navigate("/checkout");
    } else {
      closeCart();
      openAuthDialog(() => navigate("/checkout"));
    }
  };

  const subtotal = items
    .filter((item) => selectedItemIds.includes(item._id))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              isSelected={selectedItemIds.includes(item._id)}
              onToggleSelection={() => toggleItemSelection(item._id)}
              onRemove={() => removeFromCart(item._id)}
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
              <Typography as="h4">{formatCurrency(subtotal)}</Typography>
              <Typography as="small" className="text-neutral-700 font-semibold">
                THB
              </Typography>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full cursor-pointer"
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
