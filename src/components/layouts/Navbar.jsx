import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "../ui/typography";

import { AuthDialog } from "@/components/features/auth/AuthDialog";
import { Container } from "./container";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const isLoggedIn = false;

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
            <div className="flex items-center space-x-4">
              <Link className="px-1 py-1 border-4 border-black rounded-lg bg-white hover:bg-teal-100 transition">
                <Typography as="h2">Re:Furnish</Typography>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="avatar image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button>Logout</Button>
                </>
              ) : (
                <AuthDialog />
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
