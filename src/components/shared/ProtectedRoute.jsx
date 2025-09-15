import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

import { Animation } from "./Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";

export const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <Animation type="fullPage" animationData={loadingAnimationData} />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
