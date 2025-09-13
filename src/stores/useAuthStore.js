import { create } from "zustand";
import { useCartStore } from "./useCartStore";
import * as authService from "@/services/authService";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  isAuthDialogOpen: false,
  postLoginAction: null,

  openAuthDialog: (action = null) =>
    set({ isAuthDialogOpen: true, postLoginAction: action }),

  closeAuthDialog: () =>
    set({ isAuthDialogOpen: false, postLoginAction: null }),

  checkAuthStatus: async () => {
    try {
      const user = await authService.getProfile();
      set({ user, isLoggedIn: true });
      useCartStore.getState().fetchCart();
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
      useCartStore.getState().fetchCart();

      const postAction = get().postLoginAction;
      if (typeof postAction === "function") {
        postAction();
      }
      get().closeAuthDialog();

      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  },

  login: async (userData) => {
    try {
      const user = await authService.userLogin(userData);
      set({ user, isLoggedIn: true });
      useCartStore.getState().fetchCart();

      const postAction = get().postLoginAction;
      if (typeof postAction === "function") {
        postAction();
      }

      get().closeAuthDialog();

      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  logout: async () => {
    try {
      await authService.userLogout();
    } catch (error) {
      console.error("Logout failed on server, but logging out client.", error);
    } finally {
      set({
        user: null,
        isLoggedIn: false,
        postLoginAction: null,
      });
      useCartStore.getState().clearCartLocal();
    }
  },
}));
