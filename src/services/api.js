import axios from "axios"
import storage from "./storage"
import auth from "./auth";


const api = {
    getFolders: async () => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const result = await axios.get(import.meta.env.VITE_BASE_API_URL+'/folders', config);
            if (result.data.status === 'success') {
                return result.data.data;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    register: async (name, email, password) => {
        const payload = {
            name: name,
            email: email,
            password: password,
        }
        try {
            const result = await axios.post(import.meta.env.VITE_BASE_API_URL+'/register', payload);
            if (result.data.status === 'success') {
                const user = storage.store("user", result.data.data);
                return user;
            }
            return result;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    }
}

export default api;