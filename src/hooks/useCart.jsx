import { CartContext } from "@/app/context/cart/CartContext";
import { useContext } from "react";

export const useCart = () => {
  return useContext(CartContext);
};
