import { Outlet } from "react-router-dom";

import { Container } from "./container";
import { Navbar } from "./Navbar";
import { ShoppingCartSheet } from "../features/cart/ShoppingCartSheet";
import { Footer } from "./Footer";
import { CartFAB } from "../features/cart/CartFAB";
import { AuthDialog } from "../features/auth/AuthDialog";

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

      {/* --- Global Components --- */}
      {/* Component เหล่านี้จะลอยอยู่เหนือทุกหน้า และพร้อมถูกเรียกใช้งาน */}
      <ShoppingCartSheet />
      <CartFAB />
      <AuthDialog />
    </div>
  );
};
