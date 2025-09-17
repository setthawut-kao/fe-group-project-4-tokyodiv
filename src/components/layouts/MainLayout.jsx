import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { AnimatePresence, motion } from "framer-motion";
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
  const isLoading = useAuthStore((state) => state.isLoading);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  useEffect(() => {
    useAuthStore.getState().checkAuthStatus();
  }, []);

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
      <AnimatePresence mode="sync">
        {isLoggingIn && <SplashScreen />}
      </AnimatePresence>

      <Navbar />

      <main className="w-full flex-grow">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
      <ScrollRestoration />

      {/* --- Global Components --- */}
      <ShoppingCartSheet />
      <CartFAB />
      <AuthDialog />
      <Toaster richColors />
    </div>
  );
};
