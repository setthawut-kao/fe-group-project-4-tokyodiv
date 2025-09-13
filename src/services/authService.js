import api from "@/lib/axios";

export const userRegister = async (userData) => {
  const response = await api.post("/api/auth/signup", userData);
  return response.data;
};

export const userLogin = async (credentials) => {
  const response = await api.post("/api/auth/signin", credentials);
  return response.data;
};

export const userLogout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getProfile = async (userData) => {
  const response = await api.get("/api/auth/profile", userData);
  return response.data;
};
