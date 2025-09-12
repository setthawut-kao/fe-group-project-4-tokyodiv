import api from "@/lib/axios";

export const fetchProducts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/api/products?${queryParams}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};
