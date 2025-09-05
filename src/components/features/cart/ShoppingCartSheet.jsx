import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/stores/useCartStore";

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <p className="text-lg font-semibold">Your cart is empty</p>
    <p className="text-slate-500">
      Find something special to give it a new life.
    </p>
  </div>
);

const ActiveCartView = ({ items, removeFromCart }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-16 w-16 object-cover rounded-md"
          />
          <div className="flex-1">
            <p className="font-semibold">{item.name}</p>
            <p className="text-slate-500">${item.price}</p>
          </div>
          <Button
            onClick={() => removeFromCart(item.id)}
            variant="ghost"
            size="sm"
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
    <SheetFooter className="mt-4">
      <div className="w-full space-y-4">
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>
            ${" "}
            {items
              .reduce((sum, item) => sum + parseFloat(item.price), 0)
              .toFixed(2)}
          </span>
        </div>
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </SheetFooter>
  </div>
);

export const ShoppingCartSheet = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const cartItems = useCartStore((state) => state.cartItems);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeFormCart = useCartStore((state) => state.removeFormCart);

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Shopping Cart ({cartItems.length})</SheetTitle>
          <SheetDescription>Make your exp.</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-10 px-4">
          {cartItems.length === 0 ? (
            <EmptyCartView />
          ) : (
            <ActiveCartView items={cartItems} removeFromCart={removeFormCart} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
