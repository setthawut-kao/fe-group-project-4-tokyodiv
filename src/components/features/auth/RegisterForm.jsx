import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { ArrowRight, Eye } from "lucide-react";

import { ToggleShowPassword } from "@/components/shared/ToggleShowPassword";

export const RegisterForm = ({ onSwitch }) => {
  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-register">Email</Label>
            <Input
              id="email-register"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-register">Password</Label>
            <ToggleShowPassword
              id="password-register"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <ToggleShowPassword
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" className="w-full">
            Create Account <ArrowRight />
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
            className="bg-white hover:underline focus:outline-none"
          >
            Login
          </Button>
        </Typography>
      </div>
    </div>
  );
};
