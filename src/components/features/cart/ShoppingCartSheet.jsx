// src/features/cart/ShoppingCartSheet.jsx

import { useCartStore } from "@/stores/useCartStore";
import { CartItem } from "./CartItem"; // เราจะใช้ CartItem ที่นี่
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Helper Components ---
// Component เล็กๆ ที่ใช้แค่ในไฟล์นี้ สามารถประกาศไว้ข้างบนได้

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Typography as="h2" className="text-lg font-semibold">
      Your cart is empty
    </Typography>
    <Typography as="p" className="text-slate-500">
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
  const subtotal = items
    .filter((item) => selectedItemIds.includes(item.id))
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="px-6 divide-y divide-slate-200">
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

      <SheetFooter className="mt-auto pt-6 bg-white">
        <div className="w-full space-y-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <Button
            className="w-full"
            size="lg"
            disabled={selectedItemIds.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetFooter>
    </div>
  );
};

// --- Main Component ---
// สังเกตว่า Component หลักของเราตอนนี้สั้นและสะอาดมาก

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
        <SheetHeader>
          <SheetTitle>Your Shopping Cart ({cartItems.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden mt-4">
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
