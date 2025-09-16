import { create } from "zustand";
import api from "@/lib/axios";

export const useCartStore = create((set, get) => ({
  // --- State ---
  cartItems: [],
  isCartOpen: false,
  selectedItemIds: [], //State ใหม่สำหรับเก็บ ID ของสินค้าที่ถูกเลือก

  // --- Actions ---
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  fetchCart: async () => {
    try {
      const response = await api.get("/api/cart/me");
      set({ cartItems: response.data?.items || [] });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      // set cartItems เป็น [] ถ้า user ยังไม่ login
      set({ cartItems: [] });
    }
  },

  // Action สำหรับเพิ่มของลงตะกร้า
  addToCart: async (productId) => {
    try {
      const response = await api.post("/api/cart/me", { productId });
      set((state) => ({
        cartItems: response.data.items,
        selectedItemIds: Array.from(
          new Set([...state.selectedItemIds, productId])
        ),
      }));
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/api/cart/me/${productId}`);
      set({ cartItems: response.data.items }); // อัปเดต state ด้วยข้อมูลล่าสุดจาก server
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  },

  // Action สำหรับเคลียร์ตะกร้า (ฝั่ง Client เท่านั้น) ตอน Logout
  clearCartLocal: () => set({ cartItems: [], selectedItemIds: [] }),

  // Action สำหรับติ๊กเลือก/ไม่เลือกสินค้าทีละชิ้น
  toggleItemSelection: (productId) =>
    set((state) => {
      const isSelected = state.selectedItemIds.includes(productId);
      if (isSelected) {
        // ถ้าเลือกอยู่แล้ว -> เอาออก
        return {
          selectedItemIds: state.selectedItemIds.filter(
            (id) => id !== productId
          ),
        };
      } else {
        // ถ้ายังไม่เลือก -> เพิ่มเข้าไป
        return { selectedItemIds: [...state.selectedItemIds, productId] };
      }
    }),

  clearCheckedOutItems: async () => {
    try {
      const { selectedItemIds } = get();
      if (selectedItemIds.length === 0) return;

      // 1. ยิง API ไปที่ Backend เพื่อสั่งลบ (บรรทัดนี้จบที่วงเล็บ)
      const response = await api.delete("/api/cart/me/clear-items", {
        data: { productIds: selectedItemIds },
      });

      // 2. เมื่อ API ทำงานสำเร็จ ค่อยมา set state (ย้ายออกมาอยู่ตรงนี้)
      set({
        cartItems: response.data.items,
        selectedItemIds: [],
      });
    } catch (error) {
      console.error("Failed to clear checked out items:", error);
      set({ selectedItemIds: [] });
    }
  },
}));
