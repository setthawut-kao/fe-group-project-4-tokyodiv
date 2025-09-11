import { Link } from "react-router-dom";

import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { Container } from "./Container";

import fileImgLogo from "@/assets/images/footer/gen-th.webp";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full mt-20 lg:mt-40 pb-10 lg:pb-20 text-center bg-white rounded-base border-t-4 border-border shadow-shadow">
      <Container>
        <div className="flex flex-col gap-10 p-6">
          <section className="flex flex-col gap-10">
            <div className="flex justify-center">
              <Typography as="h2">Trusted by</Typography>
            </div>
            <div className="flex w-60 h-60 mx-auto">
              <AspectRatio ratio={1 / 1}>
                <img
                  src={fileImgLogo}
                  alt="Logo generation"
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
              
                {/* <Button asChild>
                  <Link to="/about-us">
                    Learn More About Us <ArrowRight />
                  </Link>
                </Button> */}
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
      </Container>
    </footer>
  );
};
