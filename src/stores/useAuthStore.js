import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8080"; //URL ของ Backend

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  token: null,
  isAuthDialogOpen: false,

  openAuthDialog: () => set({ isAuthDialogOpen: true }),
  closeAuthDialog: () => set({ isAuthDialogOpen: false }),

  register: async (userData) => {
    try {
      // ยิง request ไปที่ Backend
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        set({
          user: response.data.data.user,
          token: response.data.data.token,
          isLoggedIn: true,
        });
      }
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      return error.response.data;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        set({
          user: response.data.data.user,
          token: response.data.data.token,
          isLoggedIn: true,
        });
      }
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response.data);
      return error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isLoggedIn: false });
  },
}));
