import apiClient from "../services/axiosClient";
import { chatEndpoints } from "../constants/api-endpoints";

export const chatApi = {
  getAllMessages: async (username, contact) => {
    const response = await apiClient.get(`${chatEndpoints.chat}?username=${username}&contact=${contact}`);
    return response;
  },
};
