import { ProductCard } from "@/components/features/products/ProductCard";
import { mockupData } from "@/data/mockupData";

export const ProductGrid = () => {
  const newProducts = mockupData.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      {newProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
