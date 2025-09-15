import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type={showPassword ? "text" : "password"}
        {...props} // ส่ง props ทั้งหมดที่รับมา (เช่น id, value, onChange) ไปให้ Input ตัวจริง
      />
      <Button
        type="button" // ระบุ type="button" เพื่อไม่ให้มัน submit form
        className="bg-white"
        variant="reverse"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};
