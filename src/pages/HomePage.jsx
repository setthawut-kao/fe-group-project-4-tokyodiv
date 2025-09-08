import { HeroSection } from "@/components/features/home/HeroSection";
import { NewArrivalsSection } from "@/components/features/home/NewArrivalsSection";
import { MainProduct } from "@/components/features/home/MainProduct";

export const HomePage = () => {
  return (
    <>
      <section className="flex flex-col gap-15 lg:gap-30 my-10 lg:my-20 ">
        <HeroSection />
        <NewArrivalsSection />
        <MainProduct />
      </section>
    </>
  );
};
