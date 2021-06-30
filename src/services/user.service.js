import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'https://finanzas-api.herokuapp.com/api/user';

class UserService {
    getAll() {
        console.log(authHeader());
        return axios.get(API_URL, {headers: authHeader() });
    }
}

export default new UserService();