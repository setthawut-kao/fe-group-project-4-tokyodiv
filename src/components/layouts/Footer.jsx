import { Link } from "react-router-dom";

import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { Container } from "./Container";

import fileImgLogo from "@/assets/images/footer/gen-th.webp";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const socialLinks = [
  { name: "Facebook", to: "/", icon: Facebook },
  { name: "Instagram", to: "/", icon: Instagram },
  { name: "Twitter", to: "/", icon: Twitter },
];

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
<<<<<<< HEAD
              
                <Button asChild>
                  <Link to="/about-us">
                    Learn More About Us <ArrowRight />
=======
                <Button asChild>
                  <Link to="/about-us" className="flex items-center gap-2">
                    Learn More About Us <ArrowRight className="w-4 h-4" />
>>>>>>> 49680e055f23d9889d292d795f3bfd7b10ed5d07
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
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  to={social.to}
                  aria-label={social.name}
                  className="text-neutral-600 hover:text-emerald-700 transition-colors"
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </footer>
  );
};
