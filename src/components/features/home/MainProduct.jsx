import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/productService";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CategorySelector } from "../../shared/CategorySelector";
import { PaginationControls } from "../../shared/PaginationControls";
import { ProductGrid } from "../products/ProductGrid";
import { Typography } from "@/components/ui/typography";
import element from "@/assets/images/home-page/banner_element-2.svg";

import { Animation } from "@/components/shared/Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";

const CATEGORIES = [
  "Living Room",
  "Bedroom",
  "Dining & Kitchen",
  "Decor & Lighting",
];
const ALL_CATEGORIES = ["All", ...CATEGORIES];

const ITEMS_PER_PAGE = 6;

export const MainProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = { page: currentPage, limit: ITEMS_PER_PAGE };
        if (selectedCategory !== "All") {
          params.category = selectedCategory;
        }

        const data = await fetchProducts(params);
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError("Oops! Something went wrong while fetching products.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory, currentPage]);

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

  if (isLoading) {
    return (
      <Animation
        type="fullPage"
        loop={true}
        animationData={loadingAnimationData}
      />
    );
  }

  if (error) {
    return (
      <Animation
        type="fullPage"
        loop={true}
        animationData={errorAnimationData}
        message={error}
      />
    );
  }

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
                categories={ALL_CATEGORIES}
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
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};
