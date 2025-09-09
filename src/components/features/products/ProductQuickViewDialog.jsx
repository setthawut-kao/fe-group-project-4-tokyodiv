import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { useNavigate } from "react-router-dom";

import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import ImageCard from "@/components/ui/image-card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, ShoppingBag } from "lucide-react";

export const ProductQuickViewDialog = ({
  product,
  showActions = true,
  onClose,
}) => {
  const { isLoggedIn, openAuthDialog } = useAuthStore();
  const { cartItems, addToCart, openCart } = useCartStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const isExisting = cartItems.find((item) => item.id === product.id);
    if (isExisting) {
      setIsAlertOpen(true);
    } else {
      addToCart(product);
      if (onClose) onClose();
      openCart();
    }
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      // 💥 ไม่ต้องใช้ getState() ที่นี่
      // เราใช้ `cartItems` และ `addToCart` ที่ดึงมาจาก hook ด้านบนได้เลย
      const isExisting = cartItems.find((item) => item.id === product.id);
      if (!isExisting) {
        addToCart(product);
      }
      // เราควรจะสั่งปิด Dialog ก่อนที่จะ navigate ด้วย
      if (onClose) onClose();
      navigate("/checkout");
    } else {
      if (onClose) onClose(); // ปิด Quick View ก่อนเปิด Auth Dialog เพื่อ UX ที่ดี
      openAuthDialog(() => navigate("/checkout"));
    }
  };

  return (
    <>
      <DialogContent className="max-w-sm px-4">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <ImageCard caption={product.name} imageUrl={product.imageUrl} />
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{product.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col lg:flex-row w-full px-3 py-2 gap-3 items-center justify-between bg-white rounded-base border-2 border-border shadow-shadow overflow-hidden">
            <div className="flex flex-col items-center gap-1">
              <Badge variant="neutral" className="self-start">
                {product.category}
              </Badge>
              <div className="flex items-baseline gap-1">
                <Typography as="h4">{product.price}</Typography>
                <Typography
                  as="small"
                  className="text-neutral-700 font-semibold"
                >
                  THB
                </Typography>
              </div>
            </div>

            {showActions && (
              <div className="flex items-center gap-3">
                <DialogClose asChild>
                  <Button size="icon" variant="reverse" className="bg-white">
                    <X className="w-4 h-4" />
                  </Button>
                </DialogClose>

                <Button onClick={handleAddToCart} size="icon" variant="neutral">
                  <ShoppingCart className="w-4 h-4" />
                </Button>

                <Button onClick={handleBuyNow}>
                  <Typography as="p">Buy Now</Typography>
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This item is already in your cart!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can find this item in your shopping cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Got it!
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
