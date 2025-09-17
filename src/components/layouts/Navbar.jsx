import { useNavigate } from "react-router-dom";

import { Typography } from "../ui/typography";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Container } from "./Container";
import Logo from "@/assets/logo.svg?react";
import { UserDropdownMenu } from "../features/auth/UserDropdownMenu";
import { useAuthStore } from "@/stores/useAuthStore";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

import { motion } from "framer-motion";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();

  const { isLoggedIn, user, openAuthDialog } = useAuthStore();

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <>
      <header
        className={`
        sticky top-0 z-50
        transition-transform duration-300 ease-in-out
        bg-white rounded-b-base border-2 border-border shadow-shadow
        ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}
      `}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div
                onClick={handleNavigateHome}
                className="flex items-center px-3 py-1 gap-2 bg-white rounded-base border-2 border-border shadow-shadow hover:bg-teal-100 hover:scale-105 hover:rotate-z-3 transition cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2 }}
                >
                  <Logo className="w-12 h-12 rounded-lg hover:scale-105 hover:rotate-z-12 transition" />
                </motion.div>
                <Typography as="h3">Re:Furnish</Typography>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <UserDropdownMenu user={user} />
              ) : (
                <Button onClick={openAuthDialog} className="cursor-pointer">
                  Login <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
