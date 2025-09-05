import { Outlet } from "react-router-dom";

import { AuthProvider } from "@/app/context/auth/AuthProvider";
import { Container } from "./container";
import { CartProvider } from "@/app/context/cart/CartProvider";
import { Navbar } from "./Navbar";
import { ShoppingCartSheet } from "../features/cart/ShoppingCartSheet";

export const MainLayout = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main>
            <Container>
              <Outlet />
            </Container>
          </main>

          <ShoppingCartSheet />
        </CartProvider>
      </AuthProvider>
    </>
  );
};
