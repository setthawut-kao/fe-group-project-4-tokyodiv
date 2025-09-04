import { FeaturedCategorySection } from "@/components/features/home/FeaturedCategorySection";
import { HeroSection } from "@/components/features/home/HeroSection";
import { NewArrivalsSection } from "@/components/features/home/NewArrivalsSection";

export const HomePage = () => {
  return (
    <>
      <section className="flex flex-col gap-15 lg:gap-30 my-10 lg:my-20 ">
        <HeroSection />
        <NewArrivalsSection />
        <FeaturedCategorySection />
      </section>
    </>
  );
};
