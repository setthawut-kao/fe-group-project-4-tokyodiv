import { useCartStore } from "@/stores/useCartStore";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export const CartFAB = () => {
  // ดึงข้อมูลและ action ที่จำเป็นจาก cartStore
  const { cartItems, openCart } = useCartStore();
  const itemCount = cartItems.length;

  // ถ้าไม่มีของในตะกร้า ไม่ต้องแสดงผลอะไรเลย
  if (itemCount === 0) {
    return null;
  }

  return (
    <Button
      onClick={openCart}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
    >
      <ShoppingCart className="h-6 w-6" />
      <Badge className="absolute -top-1 -right-1">{itemCount}</Badge>
    </Button>
  );
};
