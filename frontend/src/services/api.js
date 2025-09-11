import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor JWT
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.warn('Error accessing localStorage:', error);
    }
    return config;
});

// Servicio de auth
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    },
    register: async (email, password) => {
        return await api.post('/auth/register', { email, password });
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};

// Servicio para subreddits
export const subredditService = {
    // Obtener lista de subreddits con paginación
    getSubreddits: async (page = 1, pageSize = 20) => {
        const response = await api.get(`/subreddits?page=${page}&pageSize=${pageSize}`);
        return response.data;
    },

    // Obtener detalle de un subreddit específico
    getSubredditById: async (id) => {
        const response = await api.get(`/subreddits/${id}`);
        return response.data;
    },

    // Obtener datos de Reddit (fetch)
    fetchRedditData: async () => {
        const response = await api.post('/subreddits/fetch');
        return response.data;
    }
};

export default api;
