import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import * as authService from "@/services/authService";

import { TitleBar } from "@/components/shared/TitleBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PasswordInput } from "@/components/shared/PasswordInput";

import { Animation } from "@/components/shared/Animation";
import loadingAnimationData from "@/assets/animations/loading_animation.json";
import { Edit3Icon, SaveIcon } from "lucide-react";

export const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
    }
  }, [user]);

  if (!user) {
    return (
      <Animation
        type="fullPage"
        loop={true}
        animationData={loadingAnimationData}
      />
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const userInitials = getInitials(fullName);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      let profileUpdated = false;
      let passwordUpdated = false;

      if (
        formData.firstName !== user.firstName ||
        formData.lastName !== user.lastName
      ) {
        const updatedUser = await authService.updateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        updateUser(updatedUser);
        profileUpdated = true;
      }

      // 2. ตรวจสอบและอัปเดตรหัสผ่าน (ถ้ามีการกรอก)
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords do not match!");
        }
        await authService.changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
        passwordUpdated = true;
      }

      setIsEditing(false);
      if (profileUpdated || passwordUpdated) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "An error occurred on the server."
        );
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-10 my-10 lg:my-20 items-center">
      <TitleBar title="Your Profile" onBack={() => navigate(-1)} />
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-base border-2 border-border shadow-shadow">
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatarUrl} alt={fullName} />
            <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
          </Avatar>
          <Typography as="h3" className="flex w-full truncate justify-center">
            {fullName}
          </Typography>
        </div>

        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing || isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing || isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              readOnly
              disabled
            />
          </div>

          {/* --- ส่วนเปลี่ยนรหัสผ่าน จะแสดงเฉพาะตอน Edit Mode --- */}
          {isEditing && (
            <>
              <Separator />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="change-password">
                  <AccordionTrigger>
                    <Typography as="p">Change Password</Typography>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <PasswordInput
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="Required to change"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <PasswordInput
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="New Password"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <PasswordInput
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          {isEditing ? (
            <>
              <Button
                variant="neutral"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"} <SaveIcon />
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3Icon />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
