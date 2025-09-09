<<<<<<< HEAD
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
=======
import { useAuthStore } from "@/stores/useAuthStore";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
>>>>>>> 1798bb6ac483571ea286220524f1d663364bc13b
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
<<<<<<< HEAD
} from "@/components/ui/dropdown-menu"
import { useCartStore } from "@/stores/useCartStore"
import { LogOut, Package, ShoppingCart } from "lucide-react"

export const UserDropdownMenu = () => {
  const { openCart } = useCartStore()
=======
} from "@/components/ui/dropdown-menu";

import { LogOut, Package } from "lucide-react";

export const UserDropdownMenu = ({ user }) => {
  const { logout } = useAuthStore();

  // ถ้ายังไม่มีข้อมูล user (อาจจะกำลังโหลด) ก็ไม่ต้องแสดงผลอะไร
  if (!user) return null;

  // ฟังก์ชันสำหรับสร้างตัวย่อจากชื่อ
  const getInitials = (name) => {
    if (!name) return ""; // ป้องกัน error ถ้าชื่อเป็นค่าว่าง
    return name
      .split(" ")
      .map((n) => n[0]) // ดึงตัวอักษรแรก
      .slice(0, 2) // เอาแค่ 2 ตัวแรก (เผื่อมีชื่อกลาง)
      .join("") // รวมกลับเป็น string
      .toUpperCase(); // ทำให้เป็นตัวพิมพ์ใหญ่
  };

  const userInitials = getInitials(user.name);
>>>>>>> 1798bb6ac483571ea286220524f1d663364bc13b

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hi, {user.name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Package className="mr-2 h-4 w-4" />
          <span>Order History</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
