import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { ArrowRight, Eye } from "lucide-react";

import { ToggleShowPassword } from "@/components/shared/ToggleShowPassword";

export const LoginForm = ({ onSwitch }) => {
  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-login">Password</Label>
            <ToggleShowPassword
              id="password-login"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" className="w-full">
            Login <ArrowRight />
          </Button>
        </div>
      </form>
      <div className="flex justify-center">
        <Typography as="small" className="font-semibold">
          Don't have an account ?{" "}
          <Button
            type="button"
            variant="reverse"
            onClick={onSwitch}
            className="bg-white hover:underline focus:outline-none"
          >
            Register
          </Button>
        </Typography>
      </div>
    </div>
  );
};
