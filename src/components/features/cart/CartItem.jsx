import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { ProductCard } from "../products/ProductCard";

export const CartItem = ({ item, isSelected, onToggleSelection, onRemove }) => {
  return (
    <div className="flex flex-col gap-3 p-4 border-b">
      <div className="flex items-center justify-between">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelection(item.id)}
        />
        <Button onClick={() => onRemove(item.id)} variant="ghost" size="icon">
          <Trash className="h-4 w-4 text-slate-500" />
        </Button>
      </div>
      <ProductCard product={item} variant="cart" />
    </div>
  );
};
