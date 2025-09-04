import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/ui/typography";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

export const ProductCard = () => {
  const product = {
    name: "Vintage Wooden Chair",
    price: "150.00",
    imageUrl:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop",
  };

  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-transform duration-300">
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full rounded-t-md object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <Typography as="h3" className="font-bold text-lg truncate">
          {product.name}
        </Typography>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Typography as="p" className="text-xl font-semibold">
          ${product.price}
        </Typography>
        <Button size="icon">
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
