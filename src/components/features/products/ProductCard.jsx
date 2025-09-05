import { Typography } from "@/components/ui/typography";
import { Button } from "../../ui/button";
import { ShoppingBag } from "lucide-react";
import ImageCard from "@/components/ui/image-card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductQuickViewDialog } from "./ProductQuickViewDialog";

export const ProductCard = ({ product }) => {
  const displayProduct = product || {
    id: 1,
    name: "Product Name",
    price: "150.00",
    badge: "cate",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*",
  };

  return (
    <div className="flex flex-col gap-2">
      <ImageCard
        caption={displayProduct.name}
        imageUrl="https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*"
      ></ImageCard>
      <div className="flex w-[250px] px-3 py-1 items-center gap-3 bg-white rounded-base border-2 border-border shadow-shadow overflow-hidden">
        <div className="flex gap-1 w-full">
          <Typography as="p">{displayProduct.price}</Typography>
          <Badge className="bg-lime-300">{displayProduct.badge}</Badge>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="reverse" className="bg-white">
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <ProductQuickViewDialog product={product} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="neutral">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
