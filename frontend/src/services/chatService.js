import { apiEndpoints, baseUrl } from "../utils/constants";
import axios from "axios";
class ChatService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async chats(requesterId) {
    try {
      const url = `${this.baseUrl}/chat/fetch/${requesterId}`;

      const res = await axios.get(url, {
        withCredentials: true
      })
      return res.data?.data;
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(serverMsg || "something went wrong");
    }
  }

  async getUnreadNotifications() {
    try {
      const url = `${this.baseUrl}/chat/unread-notifications`;
      const res = await axios.get(url, {
        withCredentials: true
      });
      return res.data?.data;
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(serverMsg || "something went wrong");
    }
  }

}
export default new ChatService(baseUrl);
