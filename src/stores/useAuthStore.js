import { create } from "zustand";
import { useCartStore } from "./useCartStore";
import * as authService from "@/services/authService";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  isAuthDialogOpen: false,

  openAuthDialog: () => set({ isAuthDialogOpen: true }),

  closeAuthDialog: () => set({ isAuthDialogOpen: false }),

  checkAuthStatus: async () => {
    try {
      const user = await authService.getProfile();
      set({ user, isLoggedIn: true });
      useCartStore.getState().fetchCart(); // เมื่อ Login อยู่ ให้ดึงข้อมูลตะกร้าทันที
    } catch (error) {
      console.error("Failed to check user status:", error);
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (userData) => {
    try {
      const user = await authService.userRegister(userData);
      set({ user, isLoggedIn: true });

      // หลังจาก Register/Login สำเร็จ ให้ดึงข้อมูลตะกร้าจาก Server
      useCartStore.getState().fetchCart();

      const postAction = get().postLoginAction;
      if (postAction) {
        postAction(); //ทำสิ่งที่ค้างไว้
        get().closeAuthDialog();
      }
      return { success: true, data: user };
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      return { success: false, message: error.message };
    }
  },

  login: async (userData) => {
    try {
      const user = await authService.userLogin(userData);
      set({ user, isLoggedIn: true });

      // หลังจาก Register/Login สำเร็จ ให้ดึงข้อมูลตะกร้าจาก Server
      useCartStore.getState().fetchCart();

      get().closeAuthDialog();

      return { success: true, data: user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  logout: async () => {
    try {
      await authService.userLogout();
    } catch (error) {
      console.error("Logout failed on server, but logging out client.", error);
    } finally {
      set({ user: null, isLoggedIn: false, postLoginAction: null });
      useCartStore.getState().clearCartLocal();
    }
  },
}));
