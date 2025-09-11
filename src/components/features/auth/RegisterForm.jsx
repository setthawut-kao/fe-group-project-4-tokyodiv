import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";

import { ToggleShowPassword } from "@/components/features/auth/ToggleShowPassword";

import avatar1 from "@/assets/images/avatar/avatar-1.svg";
import avatar2 from "@/assets/images/avatar/avatar-2.svg";
import avatar3 from "@/assets/images/avatar/avatar-3.svg";
import avatar4 from "@/assets/images/avatar/avatar-4.svg";

const avatarPool = [avatar1, avatar2, avatar3, avatar4];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarPool.length);
  return avatarPool[randomIndex];
};

export const RegisterForm = ({ onSwitch, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const register = useAuthStore((state) => state.register);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!"); // TODO: เปลี่ยนเป็น Alert Dialog ในอนาค
      return; // 👈 หยุดการทำงานทันที ถ้ารหัสผ่านไม่ตรงกัน
    }

    const randomAvatarUrl = getRandomAvatar();

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      avatarUrl: randomAvatarUrl,
    };

    const result = await register(userData);

    console.log("API Response from Backend:", result);

    if (result && result.success) {
      if (onSuccess) onSuccess();
    } else {
      const errorMessage =
        result?.message ||
        result?.error ||
        "An unknown error occurred. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-register">Email</Label>
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
            <Label htmlFor="password-register">Password</Label>
            <ToggleShowPassword
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <ToggleShowPassword
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" className="w-full cursor-pointer">
            Create Account <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
      <div className="flex justify-center">
        <Typography as="small" className="font-semibold">
          Already have an account ?{" "}
          <Button
            type="button"
            variant="reverse"
            onClick={onSwitch}
            className="bg-white hover:underline focus:outline-none cursor-pointer"
          >
            Login
          </Button>
        </Typography>
      </div>
    </div>
  );
};
