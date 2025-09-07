import { create } from "zustand";

export const useCartStore = create((set) => ({
  // --- State ---
  cartItems: [],
  isCartOpen: false,
  selectedItemIds: [], // 👈 State ใหม่สำหรับเก็บ ID ของสินค้าที่ถูกเลือก

  // --- Actions ---
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (productToAdd) =>
    set((state) => {
      const isExisting = state.cartItems.find(
        (item) => item.id === productToAdd.id
      );
      if (isExisting) {
        return state;
      }
      // เมื่อเพิ่มของใหม่ ให้เพิ่ม ID ลงใน "รายการที่ถูกเลือก" ด้วย (Default selected)
      return {
        cartItems: [...state.cartItems, productToAdd],
        selectedItemIds: [...state.selectedItemIds, productToAdd.id],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      // เมื่อลบของออกจากตะกร้า ก็ต้องลบออกจาก "รายการที่ถูกเลือก" ด้วย
      cartItems: state.cartItems.filter((item) => item.id !== productId),
      selectedItemIds: state.selectedItemIds.filter((id) => id !== productId),
    })),

  // Action ใหม่สำหรับติ๊กเลือก/ไม่เลือกสินค้าทีละชิ้น
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
}));
