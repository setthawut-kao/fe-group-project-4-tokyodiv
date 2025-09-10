import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { Container } from "./Container";
import { Link } from "react-router-dom";

import UniqueStoriesImage from "@/assets/images/footer/UniqueStories.png";
import ANewChapterImage from "@/assets/images/footer/aNewChapter.png";
import SustainableChoiceImage from "@/assets/images/footer/TheSustainableChoice.png";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const FeatureCard = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center text-left">
      <div className="w-30 h-30">
        <AspectRatio ratio={1 / 1} className="rounded-x">
          <img
            src={imageSrc}
            alt={title}
            className="object-cover h-full w-full "
          />
        </AspectRatio>
      </div>
      <Typography as="h4" className="text-teal-700">
        {title}
      </Typography>
      <Typography as="p">{description}</Typography>
    </div>
  );
};

export const Footer = () => {
  const features = [
    {
      imageSrc: UniqueStoriesImage,
      title: "Unique Stories",
      description:
        "Every piece is one-of-a-kind. When you choose Re:Furnish, you're bringing home something truly unique.",
    },
    {
      imageSrc: ANewChapterImage,
      title: "A New Chapter",
      description:
        "We don't just sell furniture—we give them new beginnings. Every purchase with us marks the start of a new chapter.",
    },
    {
      imageSrc: SustainableChoiceImage,
      title: "The Sustainable Choice",
      description:
        "Choosing second-hand is a vote for the planet. Every piece you find here is one less item destined for a landfill.",
    },
  ];

  return (
    <Container>
      <footer className="w-full mb-20">
        <div className="flex flex-col gap-10 p-6">
          <section className="flex flex-col justify-center gap-10">
            <div className="flex justify-center">
              <Typography as="h2">Why choose us?</Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  imageSrc={feature.imageSrc}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-10">
            <div className="flex justify-center">
              <Typography as="h2">Trusted by</Typography>
            </div>
            <div className="flex w-60 h-60 mx-auto">
              <AspectRatio ratio={1 / 1}>
                <img
                  src="https://github.com/shadcn.png"
                  alt="Image hero section"
                  className="object-cover h-full w-full rounded-full"
                />
              </AspectRatio>
            </div>
          </section>
          <section className="flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-10">
              <div className="flex justify-center">
                <Typography as="h2">Get to know us</Typography>
              </div>
              <div className="mx-auto">
                <Button asChild>
                  <Link to="/about-us">
                    Learn More About Us <ArrowRight />
                  </Link>
                </Button>
              </div>
              <div className="mx-auto">
                <Typography as="small">
                  Re:Furnish was born from a simple idea: to make beautiful,
                  sustainable living accessible to everyone.
                </Typography>
              </div>
            </div>
          </section>
          <section className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-200">
            <Typography as="small">
              &copy; {new Date().getFullYear()} Re:Furnish. All Rights Reserved.
            </Typography>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter />
              </a>
            </div>
          </section>
        </div>
      </footer>
    </Container>
  );
};
