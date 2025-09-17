import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { toast } from "sonner";

export const LoginForm = ({ onSwitch }) => {
  // 1. สร้าง State สำหรับฟอร์ม
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. ดึง Action `login` มาจาก Store
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login(formData);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(
        result.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-login">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
      <div className="flex justify-center items-center gap-3">
        <Typography as="small" className="font-semibold">
          Don't have an account ?
        </Typography>
        <Button
          type="button"
          variant="reverse"
          onClick={onSwitch}
          className="bg-white hover:underline focus:outline-none cursor-pointer"
        >
          Register
        </Button>
      </div>
    </div>
  );
};
