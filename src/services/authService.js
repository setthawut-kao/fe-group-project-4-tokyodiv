import api from "@/lib/axios";

export const Register = async (userData) => {
  const response = await api.post("/api/auth/signup", userData);
  return response.data;
};

export const Login = async (credentials) => {
  const response = await api.post("/api/auth/signin", credentials);
  return response.data;
};

export const Logout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await await api.get("/api/auth/profile");
  return response.data;
};
