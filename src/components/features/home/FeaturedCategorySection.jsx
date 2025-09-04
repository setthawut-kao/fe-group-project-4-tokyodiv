import { useMemo, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/ui/typography";
import { mockupData } from "@/data/mockupData";
import { CategorySelector } from "./CategorySelector";
import { ProductGrid } from "./ProductGrid";
import { PaginationControls } from "./PaginationControls";

const CATEGORIES = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Home Office",
  "Decorations",
];
const ITEMS_PER_PAGE = 6;

export const FeaturedCategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProducts = useMemo(() => {
    console.log(`Filtering for: ${selectedCategory}`);
    return mockupData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [currentPage, filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10">
        <div className="bg-white border-4 border-black rounded-xl  hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition duration-300">
          <div className="sticky top-0">
            <AspectRatio ratio={9 / 16} className="w-full rounded-lg">
              <img
                src="https://github.com/shadcn.png"
                alt="Image hero section"
                className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </AspectRatio>
          </div>
        </div>
        <div className="flex flex-col lg:col-span-2 gap-10">
          <Typography as="h2">Ready for a New Home!</Typography>
          <div
            className="flex flex-col lg:flex-row rounded-lg p-1 gap-1.5 lg:gap-3 lg:p-3 sticky top-0 z-50
        transition-transform duration-300 ease-in-out
        bg-white border-4 border-black"
          >
            <div className="flex w-full">
              <CategorySelector
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
            />
          </div>
          <div>
            <ProductGrid products={paginatedProducts} />
          </div>
        </div>
      </div>
    </section>
  );
};
