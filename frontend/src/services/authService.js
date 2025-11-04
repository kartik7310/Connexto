import { apiEndpoints,baseUrl } from "../utils/constants";
import axios from "axios";
class AuthService {
  baseUrl
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }

   async createAccount({ firstName, lastName, email, password }) {
        try {
            const res = await axios.post(
                this.baseUrl + apiEndpoints.signUp,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }
     async loginAccount({ emailId, password }) {
        try {
            const res = await axios.post(
                this.baseUrl + apiEndpoints.login,
                {
                    emailId,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }
}