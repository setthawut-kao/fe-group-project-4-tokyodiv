import { create } from "zustand";

export const useCartStore = create((set) => ({
  isCartOpen: false,
  cartItems: [],

  openCart: () => set({ isCartOpen: true }),

  closeCart: () => set({ isCartOpen: false }),

  addToCart: (productToAdd) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === productToAdd.id
      );
      if (existingItem) {
        console.log("Product already in cart!");
        return state;
      }
      return { cartItems: [...state.cartItems, productToAdd] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
}));
