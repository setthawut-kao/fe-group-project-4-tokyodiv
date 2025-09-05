import { ProductCard } from "@/components/features/products/ProductCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/ui/typography";
import { mockupData } from "@/data/mockupData";

export const NewArrivalsSection = () => {
  const newProducts = mockupData.slice(0, 1);

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="flex flex-col gap-10">
          <div>
            <Typography as="h2">Just Re:furbished</Typography>
            <Typography as="p" className="text-teal-900">
              Freshly refurbished, one-of-a-kind pieces waiting for a new home.
            </Typography>
          </div>
          <div className="flex w-full sticky top-0 justify-center items-center">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block bg-white border-4 border-black rounded-xl  hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition duration-300">
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
      </div>
    </section>
  );
};
