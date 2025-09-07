import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import {
  Dialog,
  DialogClose, // 👈 Import DialogClose สำหรับปุ่มปิด
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import ImageCard from "@/components/ui/image-card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, ShoppingBag } from "lucide-react"; // 👈 Import ไอคอนเพิ่ม

export const ProductQuickViewDialog = ({ product, showActions = true }) => {
  // Logic การจัดการ State ยังคงเหมือนเดิม
  const { cartItems, addToCart, openCart } = useCartStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAddToCart = () => {
    const isExisting = cartItems.find((item) => item.id === product.id);
    if (isExisting) {
      setIsAlertOpen(true);
    } else {
      addToCart(product);
      openCart();
    }
  };

  return (
    <>
      <DialogContent className="max-w-sm px-3">
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

          <div className="flex flex-col lg:flex-row w-full px-3 py-2 items-center justify-between bg-white rounded-base border-2 border-border shadow-shadow overflow-hidden">
            <div className="flex flex-col items-center">
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

                <Button>
                  <Typography as="p">Buy Now</Typography>
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <AlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
      ></AlertDialog>
    </>
  );
};
