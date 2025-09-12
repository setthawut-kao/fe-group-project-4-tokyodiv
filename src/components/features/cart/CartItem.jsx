import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { ProductCard } from "../products/ProductCard";

export const CartItem = ({ item, isSelected, onToggleSelection, onRemove }) => {
  return (
    <div className="flex flex-col gap-1 p-6 w-full border-b-1 border-emerald-700 ">
      <div className="flex py-2 items-center justify-between">
        <Checkbox
          className="cursor-pointer"
          checked={isSelected}
          onCheckedChange={onToggleSelection}
        />
        <Button
          onClick={onRemove}
          variant="neutral"
          size="icon"
          className="cursor-pointer"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <ProductCard product={item} variant="cart" />
    </div>
  );
};
