import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/productService";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PaginationControls } from "../../shared/PaginationControls";
import { PostFrame } from "@/components/shared/PostFrame";
import { ProductCard } from "../products/ProductCard";
import { Typography } from "@/components/ui/typography";
import element from "@/assets/images/home-page/banner_element-1.svg";

import { Animation } from "@/components/shared/Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import errorAnimationData from "@/assets/animations/error_animation.json";

export const NewArrivalsSection = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getNewArrivals = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts({ sort: "createdAt", limit: 6 });
        setProducts(data.products || []);
      } catch (err) {
        setError("Failed to load new arrivals.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getNewArrivals();
  }, []);

  const handleNext = () => {
    if (products.length === 0) return;
    const nextIndex = (currentIndex + 1) % products.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    if (products.length === 0) return;
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setCurrentIndex(prevIndex);
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

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

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
                  totalPages={products.length}
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
          <div className="sticky top-24">
            <div className="bg-white border-border border-2 rounded-lg shadow-shadow hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition duration-300">
              <AspectRatio ratio={9 / 16} className="w-full">
                <img
                  src={element}
                  alt="Promotional banner for Main Product."
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
