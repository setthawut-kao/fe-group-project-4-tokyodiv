import { Element } from "react-scroll";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

import { HeroSection } from "@/components/features/home/HeroSection";
import { NewArrivalsSection } from "@/components/features/home/NewArrivalsSection";
import { MainProduct } from "@/components/features/home/MainProduct";

export const HomePage = () => {
  return (
    <>
      <section className="flex flex-col gap-20 lg:gap-40 my-10 lg:mt-20 scroll-smooth transition">
        <ScrollReveal direction="up" duration={1}>
          <HeroSection />
        </ScrollReveal>

        <ScrollReveal direction="up" duration={1}>
          <NewArrivalsSection />
        </ScrollReveal>

        <ScrollReveal direction="up" duration={1}>
          <Element name="main-product">
            <MainProduct />
          </Element>
        </ScrollReveal>
      </section>
    </>
  );
};
