import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('✅ Token added to request:', config.url);
        } else {
            console.log('⚠️ No token found for request:', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: async (username, email, password) => {
        const response = await api.post('/api/auth/register', { username, email, password });
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/api/auth/login', { email, password });
        return response.data;
    },
};

// Translation API
export const translationAPI = {
    translate: async (text, targetLanguage, sourceLanguage = 'en') => {
        // Use public endpoint for translation without authentication
        const response = await api.post('/api/translate/public', { text, targetLanguage, sourceLanguage });
        return response.data;
    },

    getHistory: async (limit = 50, offset = 0) => {
        const response = await api.get(`/api/history?limit=${limit}&offset=${offset}`);
        return response.data;
    },
};

// Favorites API
export const favoritesAPI = {
    getFavorites: async () => {
        const response = await api.get('/api/favorites');
        return response.data;
    },

    addFavorite: async (translationId) => {
        const response = await api.post(`/api/favorites/${translationId}`);
        return response.data;
    },

    removeFavorite: async (translationId) => {
        const response = await api.delete(`/api/favorites/${translationId}`);
        return response.data;
    },
};

export default api;
