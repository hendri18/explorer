import axios from "axios"
import storage from "../services/storage"

const auth = {
    login: async (email, password) => {
        const payload = {
            email: email,
            password: password,
        }
        try {
            const result = await axios.post(import.meta.env.VITE_BASE_API_URL+'/login', payload);
            if (result.data.status === 'success') {
                const user = storage.store("user", result.data.data);
                return user;
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
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    logout: async () => {
        try {
            const token = auth.getToken();
            if (!token) return false;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const result = await axios.post(import.meta.env.VITE_BASE_API_URL+'/logout', {}, config);
            storage.remove("user")
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
        
    },
    userData: () => {
        const user = storage.get("user");
        return user;
    },
    getToken: () => {
        const user = storage.get("user");
        if (!user) return null;
        return user.access_token;
    }
}

export default auth;