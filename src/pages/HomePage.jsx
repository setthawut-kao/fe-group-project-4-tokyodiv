import { Element } from "react-scroll";

import { HeroSection } from "@/components/features/home/HeroSection";
import { NewArrivalsSection } from "@/components/features/home/NewArrivalsSection";
import { MainProduct } from "@/components/features/home/MainProduct";

export const HomePage = () => {
  return (
    <>
      <section className="flex flex-col gap-20 lg:gap-40 my-10 lg:mt-20 scroll-smooth transition">
        <HeroSection />
        <NewArrivalsSection />
        <Element name="main-product">
          <MainProduct />
        </Element>
      </section>
    </>
  );
};
