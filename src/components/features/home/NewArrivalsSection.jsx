import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PaginationControls } from "./PaginationControls";
import { PostFrame } from "@/components/shared/PostFrame";
import { ProductCard } from "../products/ProductCard";
import { Typography } from "@/components/ui/typography";

import { MOCK_NEW_ARRIVALS } from "@/data/mockProducts";

export const NewArrivalsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % MOCK_NEW_ARRIVALS.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + MOCK_NEW_ARRIVALS.length) % MOCK_NEW_ARRIVALS.length;
    setCurrentIndex(prevIndex);
  };

  const currentProduct = MOCK_NEW_ARRIVALS[currentIndex];

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="flex flex-col gap-10">
          <div>
            <Typography as="h2">This Week's Highlights</Typography>
            <Typography as="p" className="text-teal-900">
              More than just furniture.
              <br />
              Explore this week's highlights, each with a soul of its own.
              <br />
              Use the arrows to find yours
            </Typography>
          </div>

          <div className="flex sticky top-24">
            <PostFrame
              headerTitle="Re:Furnish"
              headerDescription="Freshly refurbished, one-of-a-kind pieces waiting for a new home"
              paginationControls={
                <PaginationControls
                  onPrev={handlePrev}
                  onNext={handleNext}
                  currentPage={currentIndex + 1}
                  totalPages={MOCK_NEW_ARRIVALS.length}
                />
              }
            >
              <div className="max-w-xs">
                <ProductCard product={currentProduct} />
              </div>
            </PostFrame>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className=" bg-white border-border border-2 rounded-lg shadow-shadow hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition ease-out duration-300">
            <AspectRatio ratio={9 / 16} className="w-full">
              <img
                src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1887&auto=format&fit=crop"
                alt="Promotional banner for new arrivals."
                className="h-full w-full rounded-sm object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};
