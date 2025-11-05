import { apiEndpoints,baseUrl } from "../utils/constants";
import axios from "axios";
class FeedService {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }

   async getFeed() {
        try {
            const res = await axios.get(
                this.baseUrl + apiEndpoints.getFeed,
                {
                    withCredentials: true,
                }
            );

            return res.data;
        } catch (err) {
           const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
    throw new Error(serverMsg || "something went wrong"); 
        }
    }
   
}
export default new FeedService(baseUrl);