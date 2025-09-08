import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { ProductCard } from "../products/ProductCard";

export const CartItem = ({ item, isSelected, onToggleSelection, onRemove }) => {
  return (
    <div className="flex gap-3 p-6 border-b-1 border-emerald-700 ">
      <div className="flex flex-col py-2 items-center justify-between">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelection(item.id)}
        />
        <Button onClick={() => onRemove(item.id)} variant="neutral" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <ProductCard product={item} variant="cart" />
    </div>
  );
};
