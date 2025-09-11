import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
