import { create } from "zustand";
import { useCartStore } from "./useCartStore";
import * as authService from "@/services/authService";

import { toast } from "sonner";

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
      const user = await authService.Register(userData);
      set({ user, isLoggedIn: true });
      useCartStore.getState().fetchCart();

      toast.success("Registration successful!", {
        description: `Welcome to Re:furnish, ${user.firstName}!`,
      });

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
      const user = await authService.Login(userData);
      set({ user, isLoggedIn: true });
      useCartStore.getState().fetchCart();

      toast.success("Login successful!", {
        description: `Welcome back, ${user.firstName}!`,
      });

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
      await authService.Logout();
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

  updateUser: (updatedUserData) => {
    set({ user: updatedUserData });
  },
}));
