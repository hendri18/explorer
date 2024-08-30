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
    createFolder: async (name, parent_id = null) => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const payload = {
            name: name,
            parent_id: parent_id,
        }
        try {
            const result = await axios.post(import.meta.env.VITE_BASE_API_URL+'/folders', payload, config);
            if (result.data.status === 'success') {
                return true;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    renameFolder: async (id, name) => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const payload = {
            name: name,
        }
        try {
            const result = await axios.put(import.meta.env.VITE_BASE_API_URL+'/folders/'+id, payload, config);
            if (result.data.status === 'success') {
                return true;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    deleteFolder: async (id) => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const result = await axios.delete(import.meta.env.VITE_BASE_API_URL+'/folders/'+id, config);
            if (result.data.status === 'success') {
                return true;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    uploadFile: async (payload) => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const result = await axios.post(import.meta.env.VITE_BASE_API_URL+'/files', payload, config);
            if (result.data.status === 'success') {
                return true;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    renameFile: async (id, name) => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const payload = {
            file_name: name,
        }
        try {
            const result = await axios.put(import.meta.env.VITE_BASE_API_URL+'/files/'+id, payload, config);
            if (result.data.status === 'success') {
                return true;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
    deleteFile: async (id) => {
        const token = auth.getToken();
        if (!token) return true;
        const config = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data'
            }
        };
        try {
            const result = await axios.delete(import.meta.env.VITE_BASE_API_URL+'/files/'+id, config);
            if (result.data.status === 'success') {
                return true;
            }
            return null;
        } catch (error) {
            alert(error.response.data ? error.response.data.message : error)
            console.error(error)
            return null;
        }
    },
}

export default api;