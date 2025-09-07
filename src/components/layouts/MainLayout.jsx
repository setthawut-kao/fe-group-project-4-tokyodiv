import { Outlet } from "react-router-dom";

import { Container } from "./container";
import { Navbar } from "./Navbar";
import { ShoppingCartSheet } from "../features/cart/ShoppingCartSheet";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="w-full flex-grow">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ShoppingCartSheet />
    </div>
  );
};
