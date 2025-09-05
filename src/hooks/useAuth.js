import { AuthContext } from "@/app/context/auth/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
