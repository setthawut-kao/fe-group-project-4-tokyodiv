import { useAuthStore } from "@/stores/useAuthStore";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthDialog = () => {
  const { isAuthDialogOpen, closeAuthDialog } = useAuthStore();
  const [view, setView] = useState("login");

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      // ถ้า Dialog กำลังจะปิด, ให้ reset view กลับไปที่ 'login'
      setView("login");
    }
    closeAuthDialog(); // เรียก action เดิมเพื่อปิด
  };

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xs lg:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {view === "login" ? "Login" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-teal-700">
            Welcome to Re:Furnish
          </DialogDescription>
        </DialogHeader>
        {view === "login" ? (
          <LoginForm onSwitch={() => setView("register")} />
        ) : (
          <RegisterForm onSwitch={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
};
