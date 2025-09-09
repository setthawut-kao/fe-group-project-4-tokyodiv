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

export function AuthDialog() {
  // ดึง state และ action สำหรับควบคุมตัวเองมาจาก store
  const { isAuthDialogOpen, closeAuthDialog, postLoginAction } = useAuthStore();
  const [view, setView] = useState("login");

  // ฟังก์ชันนี้จะถูกเรียกจากข้างใน Form เมื่อ login/register สำเร็จ
  const handleSuccess = () => {
    // เช็คว่ามี "งานที่ต้องทำต่อ" ค้างอยู่หรือไม่
    if (postLoginAction) {
      postLoginAction(); // 👈 ทำงานที่ค้างไว้ (เช่น navigate ไป checkout)
    }
    closeAuthDialog(); // 👈 ปิด Dialog
  };

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog}>
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
          <LoginForm
            onSwitch={() => setView("register")}
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm
            onSwitch={() => setView("login")}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
