import api from "@/lib/axios";

export const fetchProducts = async (params = {}) => {
  try {
    let response;
    const queryParams = new URLSearchParams(params);

    if (queryParams.has("category")) {
      const category = queryParams.get("category");
      queryParams.delete("category");
      const remainingParams = queryParams.toString();
      response = await api.get(
        `/api/products/category/${category}?${remainingParams}`
      );
    } else {
      const allParams = queryParams.toString();
      response = await api.get(`/api/products?${allParams}`);
    }
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
