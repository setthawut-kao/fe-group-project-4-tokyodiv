import api from "@/lib/axios";

/**
 *
 * @param {object} orderData
 * @returns {Promise<object>}
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/api/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response.data || new Error("Failed to create order");
  }
};

/**
 *
 * @returns {Promise<Array>}
 */
export const fetchMyOrders = async () => {
  try {
    const response = await api.get("/api/orders/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

/**
 *
 * @param {string} orderId
 * @returns {Promise<object>}
 */
export const fetchOrderById = async (orderId) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};
