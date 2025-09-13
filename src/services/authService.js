import api from "@/lib/axios";

export const userRegister = async (userData) => {
  const response = await api.post("/api/auth/signup", userData);
  return response.data;
};

export const userLogin = async (userData) => {
  const response = await api.post("/api/auth/signin", userData);
  return response.data;
};

export const userLogout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};
