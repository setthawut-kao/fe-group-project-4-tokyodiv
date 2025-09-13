import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, Package, UserIcon } from "lucide-react";

export const UserDropdownMenu = ({ user }) => {
  const logout = useAuthStore((state) => state.logout);

  // ถ้ายังไม่มีข้อมูล user (อาจจะกำลังโหลด) ก็ไม่ต้องแสดงผลอะไร
  if (!user) return null;

  // สร้างชื่อเต็มจาก firstName และ lastName
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const userInitials = getInitials(fullName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hi, {user.firstName || "User"}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem>
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/orders">
          <DropdownMenuItem>
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logout}>
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
