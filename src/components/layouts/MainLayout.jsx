import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "../shared/SplashScreen";

import { Container } from "./Container";
import { Navbar } from "./Navbar";
import { ShoppingCartSheet } from "../features/cart/ShoppingCartSheet";
import { Footer } from "./Footer";
import { CartFAB } from "../features/cart/CartFAB";
import { AuthDialog } from "../features/auth/AuthDialog";
import { Toaster } from "../ui/sonner";

import { Animation } from "@/components/shared/Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";

export const MainLayout = () => {
  const { isLoading, isLoggingIn } = useAuthStore((state) => ({
    isLoading: state.isLoading,
    isLoggingIn: state.isLoggingIn,
  }));
  const location = useLocation();

  useEffect(() => {
    // เรียกใช้ action `checkAuthStatus` แค่ 1 ครั้งตอนที่แอปเริ่มทำงาน
    useAuthStore.getState().checkAuthStatus();
  }, []); // `[]` หมายถึงให้ hook นี้ทำงานแค่ครั้งเดียว

  if (isLoading) {
    return (
      <Animation
        type="fullPage"
        loop={true}
        animationData={loadingAnimationData}
      />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AnimatePresence>{isLoggingIn && <SplashScreen />}</AnimatePresence>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3 }}
          className="w-full flex-grow"
        >
          <Container>
            <Outlet />
          </Container>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ScrollRestoration />

      {/* --- Global Components --- */}
      {/* Component เหล่านี้จะลอยอยู่เหนือทุกหน้า และพร้อมถูกเรียกใช้งาน */}
      <ShoppingCartSheet />
      <CartFAB />
      <AuthDialog />
      <Toaster richColors />
    </div>
  );
};
