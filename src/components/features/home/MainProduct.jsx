import { useMemo, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CategorySelector } from "../../shared/CategorySelector";
import { PaginationControls } from "../../shared/PaginationControls";
import { ProductGrid } from "../products/ProductGrid";
import { Typography } from "@/components/ui/typography";
import element from "@/assets/images/home-page/banner_element-2.svg";

import { MOCK_NEW_ARRIVALS } from "@/data/mockProducts";

const CATEGORIES = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Home Office",
  "Decorations",
];
const ITEMS_PER_PAGE = 6;

export const MainProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProducts = useMemo(() => {
    console.log(`Filtering for: ${selectedCategory}`);
    return MOCK_NEW_ARRIVALS.filter((p) => p.category === selectedCategory);
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
    <section id="main-product">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <div className="bg-white border-border border-2 rounded-lg shadow-shadow hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition duration-300">
              <AspectRatio ratio={9 / 16} className="w-full">
                <img
                  src={element}
                  alt="Promotional banner for Main Product."
                  className="h-full w-full rounded-sm object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-2 gap-10">
          <div>
            <Typography as="h2">The Collection!</Typography>
            <Typography as="p" className="text-teal-900">
              Browse all our available pieces or select a category to find
              exactly what you're looking for
            </Typography>
          </div>

          <div className="flex flex-col lg:flex-row p-1.5 gap-1.5 items-center lg:p-3 sticky top-1 bg-white border-border border-2 rounded-lg shadow-shadow hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition duration-300 ease-out">
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

          <div className="flex w-full justify-center">
            <ProductGrid products={paginatedProducts} />
          </div>
        </div>
      </div>
    </section>
  );
};
