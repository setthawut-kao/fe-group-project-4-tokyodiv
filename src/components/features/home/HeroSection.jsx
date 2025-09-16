import { Link } from "react-scroll";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import elementBook from "@/assets/images/hero/book.svg";
import elementChair from "@/assets/images/hero/chair.svg";
import elementLamp from "@/assets/images/hero/lamp.svg";
import elementSmallLamp from "@/assets/images/hero/small-lamp.svg";
import elementStorageTable from "@/assets/images/hero/storage-table.svg";
import elementVase from "@/assets/images/hero/vase.svg";

import { motion } from "framer-motion";

import { ArrowRight, ShoppingBag } from "lucide-react";

const heroImages = [
  {
    src: elementBook,
    alt: "Stylish refurbished chair",
    className: "w-5 bottom-24.5 left-15.5 lg:w-18 lg:bottom-65 lg:left-46 z-1",
  },
  {
    src: elementChair,
    alt: "Mid-century modern table",
    className: "w-24 bottom-13 right-8 lg:w-120 lg:bottom-20 lg:right-40 z-0",
  },
  {
    src: elementLamp,
    alt: "Vintage desk lamp",
    className: "w-12 bottom-14 right-4 lg:w-60 lg:bottom-24 lg:right-24 z-1",
  },
  {
    src: elementSmallLamp,
    alt: "Cozy refurbished sofa",
    className: "w-7 bottom-24 left-27 lg:w-24 lg:bottom-63 lg:left-88 z-1",
  },
  {
    src: elementStorageTable,
    alt: "Unique home decor table",
    className: "w-28 bottom-13 left-8 lg:w-100 lg:bottom-24 lg:left-20 z-0",
  },
  {
    src: elementVase,
    alt: "Unique home decor vase",
    className: "w-6 bottom-24 left-11 lg:w-24 lg:bottom-62 lg:left-28 z-1",
  },
];

export const HeroSection = () => {
  return (
    <section className="flex flex-col gap-3 lg:gap-6">
      <div>
        <Typography as="h1">Give Furniture a Second Chapter</Typography>
        <Typography as="p" className="text-teal-800">
          Discover our curated collection of one-of-a-kind, refurbished
          furniture. Style your home, sustainably
        </Typography>
      </div>

      <div className=" relative border-border border-2 rounded-lg shadow-shadow hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition ease-out duration-300">
        <AspectRatio
          ratio={21 / 9}
          className="w-full rounded-lg bg-white overflow-hidden cursor-grab"
        >
          {heroImages.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`object-cover absolute ${image.className}`}
              drag
              dragElastic={0.5}
              dragMomentum={false}
              animate={{ x: 0, y: 0 }}
              whileTap={{ scale: 1.15, zIndex: 50, cursor: "grabbing" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
          ))}
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
