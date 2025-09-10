import { ProductCard } from "@/components/features/products/ProductCard";

import { MOCK_FEATURED_PRODUCTS } from "@/data/mockProducts";

export const ProductGrid = () => {
  const newProducts = MOCK_FEATURED_PRODUCTS.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      {newProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
