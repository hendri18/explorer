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
            return result;
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
    },
    logout: () => {
        storage.remove("user")
    },
    userData: () => {
        const user = storage.get("user");
        return user;
    }
}

export default auth;