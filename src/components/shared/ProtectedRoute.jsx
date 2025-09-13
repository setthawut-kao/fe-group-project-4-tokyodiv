import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

import Lottie from "lottie-react";
import loadingAnimationData from "@/assets/animations/loading_animation.json";

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading, openAuthDialog } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    openAuthDialog: state.openAuthDialog,
  }));

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      openAuthDialog();
    }
  }, [isLoading, isLoggedIn, openAuthDialog]);

  //  สถานะที่ 1: กำลังตรวจสอบสถานะ... ให้แสดงหน้า Loading
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

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
};
