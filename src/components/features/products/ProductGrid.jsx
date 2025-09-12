import { ProductCard } from "@/components/features/products/ProductCard";
import { Typography } from "@/components/ui/typography";

export const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return <Typography as="p">No products found in this category</Typography>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
