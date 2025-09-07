import { Link } from "react-router-dom";

import { Typography } from "../ui/typography";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { AuthDialog } from "@/components/features/auth/AuthDialog";
import { Container } from "./container";
import Logo from "@/assets/logo.svg?react";
import { UserDropdownMenu } from "../features/auth/UserDropdownMenu";
import { useAuthStore } from "@/stores/useAuthStore";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const { isLoggedIn, user } = useAuthStore();

  return (
    <>
      <header
        className={`
        sticky top-0 z-50
        transition-transform duration-300 ease-in-out
        bg-white border-b-4 border-black
        ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}
      `}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Link className="flex items-center px-1 py-1 gap-1 border-4 border-black rounded-lg bg-white hover:bg-teal-100 hover:scale-105 hover:rotate-z-3 transition">
                <Logo className="w-10 h-10 rounded-lg hover:text-teal-900 hover:scale-105 hover:rotate-z-12 transition" />
                <Typography as="h2">Re:Furnish</Typography>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? <UserDropdownMenu user={user} /> : <AuthDialog />}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
