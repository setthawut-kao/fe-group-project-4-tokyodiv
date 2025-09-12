import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

import { Container } from "./container";
import { Navbar } from "./Navbar";
import { ShoppingCartSheet } from "../features/cart/ShoppingCartSheet";
import { Footer } from "./Footer";
import { CartFAB } from "../features/cart/CartFAB";
import { AuthDialog } from "../features/auth/AuthDialog";

import Lottie from "lottie-react";
import loadingAnimationData from "@/assets/animations/loading_animation.json";

export const MainLayout = () => {
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    // เรียกใช้ action `checkAuthStatus` แค่ 1 ครั้งตอนที่แอปเริ่มทำงาน
    useAuthStore.getState().checkAuthStatus();
  }, []); // `[]` หมายถึงให้ hook นี้ทำงานแค่ครั้งเดียว

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-background z-50">
        <Lottie
          animationData={loadingAnimationData}
          loop={true}
          className="w-60 h-60"
        />
      </div>
    );
  }

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
