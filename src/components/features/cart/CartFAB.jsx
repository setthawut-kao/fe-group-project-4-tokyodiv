import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { motion } from "motion/react";

export const CartFAB = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const openCart = useCartStore((state) => state.openCart);

  const itemCount = cartItems.length;

  if (itemCount === 0) {
    return null;
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={openCart}
        size="icon"
        className="relative w-12 h-12 rounded-full border-2 border-border shadow-shadow"
      >
        <ShoppingCart className="w-4 h-4" />
        <Badge
          variant="neutral"
          className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full"
        >
          {itemCount}
        </Badge>
      </Button>
    </motion.div>
  );
};
