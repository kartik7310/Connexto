import { apiEndpoints,baseUrl } from "../utils/constants";
import axios from "axios";
class SubscriptionService {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
   async createOrder(planId){
        try {
            const res = await axios.post(this.baseUrl + apiEndpoints.createOrder, { planId }, {
                    withCredentials: true,
                })
            return res.data
        } catch (err) {
             const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
    throw new Error(serverMsg || "Unable to start payment"); 
        }
    }

  
} 
export default new SubscriptionService(baseUrl);