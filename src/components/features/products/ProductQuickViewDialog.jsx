import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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

export const ProductQuickViewDialog = ({ product }) => {
  const { addToCart } = useCart;

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAddToCart = () => {
    const wasSuccessful = addToCart(product);
    if (!wasSuccessful) {
      setIsAlertOpen(true);
    }
  };
  return (
    <>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="text-2xl font-bold">${product.price}</p>
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{product.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-6 flex gap-4">
              <Button onClick={handleAddToCart} className="w-full">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This item is already in your cart!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction>Got it!</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
