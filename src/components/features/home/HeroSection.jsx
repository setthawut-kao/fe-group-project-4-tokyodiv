import { Link } from "react-scroll";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { ArrowRight, ShoppingBag } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="flex flex-col gap-3 lg:gap-6">
      <div>
        <Typography as="h1">Give Furniture a Second Chapter</Typography>
        <Typography as="p" className="text-teal-900">
          Discover our curated collection of one-of-a-kind, refurbished
          furniture. Style your home, sustainably
        </Typography>
      </div>

      <div className=" relative border-4 border-black rounded-xl hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition ease-out duration-300">
        <AspectRatio ratio={21 / 9} className="w-full rounded-lg">
          <img
            src="https://github.com/shadcn.png"
            alt="Image hero section"
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </AspectRatio>
        <Link to="main-product" smooth={true} duration={1200}>
          <Button className="absolute right-2 bottom-2 lg:right-10 lg:bottom-10 cursor-pointer">
            <ShoppingBag className="w-4 h-4" />
            Explore Collection
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
