import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ImageCard from "@/components/ui/image-card";
import { Typography } from "@/components/ui/typography";

import { ChevronDown, ShoppingBag } from "lucide-react";

import { ProductQuickViewDialog } from "./ProductQuickViewDialog";

export const ProductCard = ({ product, variant = "default" }) => {
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);

  if (!product) return null;

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={setQuickViewOpen}>
      <div className="flex flex-col gap-2 h-full">
        <ImageCard caption={product.name} imageUrl={product.imageUrl} />
        <div className="flex w-full px-3 py-2 gap-3 items-center justify-between bg-white rounded-base border-2 border-border shadow-shadow overflow-hidden mt-auto">
          <div className="flex flex-col items-center">
            <Badge variant="neutral" className="self-start">
              {product.category}
            </Badge>
            <div className="flex items-baseline gap-1">
              <Typography as="h4">{product.price}</Typography>
              <Typography as="small" className="text-neutral-700 font-semibold">
                THB
              </Typography>
            </div>
          </div>

          <DialogTrigger asChild>
            <Button size="icon">
              {variant === "default" ? (
                <ShoppingBag className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <ProductQuickViewDialog
        product={product}
        showActions={variant === "default"}
        onClose={() => setQuickViewOpen(false)}
      />
    </Dialog>
  );
};
