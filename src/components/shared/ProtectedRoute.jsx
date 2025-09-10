// import { useAuthStore } from "@/stores/useAuthStore";
// import { Navigate, Outlet } from "react-router-dom";

// export const ProtectedRoute = () => {
//   // 1. ถาม store ว่าตอนนี้มีคน login อยู่หรือไม่
//   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

//   // 2. ตรวจสอบเงื่อนไข
//   if (!isLoggedIn) {
//     // 3. ถ้ายังไม่ Login, ให้ "วาร์ป" (Navigate) กลับไปหน้าแรก
//     // `replace` คือการบอกว่าไม่ต้องบันทึกหน้านี้ใน history ของเบราว์เซอร์
//     return <Navigate to="/" replace />;
//   }

//   // 4. ถ้า Login แล้ว, ให้แสดง Component ลูกที่อยู่ข้างใน Route นี้
//   // <Outlet /> คือ "ประตู" ที่จะไปแสดง Component ปลายทาง (เช่น CheckoutPage)
//   return <Outlet />;
// };
