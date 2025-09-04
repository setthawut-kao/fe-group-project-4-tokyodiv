import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export const ToggleShowPassword = ({ id, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        className="pr-10"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={togglePasswordVisibility}
        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
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
