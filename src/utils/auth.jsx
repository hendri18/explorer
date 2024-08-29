import axios from "axios"
import { store } from "./useLocalStorage"
export const login = async (email, password) => {
    const payload = {
        email: email,
        password: password,
    }
    try {
        const result = await axios.post(import.meta.env.VITE_BASE_API_URL+'/login', payload);

        if (result.data.status === 'success') {
            const user = store("user", result.data.data);
            return user;
        }
        return result;
    } catch (error) {
        alert(error)
    }
} 
