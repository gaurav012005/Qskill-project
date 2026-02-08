import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

// Authentication API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
};

// Courses API
export const coursesAPI = {
    getAll: (params) => api.get('/courses', { params }),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
};

// Categories API
export const categoriesAPI = {
    getAll: () => api.get('/categories'),
    create: (data) => api.post('/categories', data),
};

// Enrollments API
export const enrollmentsAPI = {
    enroll: (courseId) => api.post('/enrollments', { course_id: courseId }),
    getMyCourses: () => api.get('/enrollments/my-courses'),
    updateProgress: (id, progress) => api.put(`/enrollments/${id}/progress`, { progress_percentage: progress }),
    checkEnrollment: (courseId) => api.get(`/enrollments/check/${courseId}`),
};

// Payments API
export const paymentsAPI = {
    createOrder: (courseId) => api.post('/payments/create-order', { course_id: courseId }),
    verifyPayment: (transactionId, status) => api.post('/payments/verify', { transaction_id: transactionId, payment_status: status }),
    getHistory: () => api.get('/payments/history'),
};

// Admin API
export const adminAPI = {
    getUsers: (params) => api.get('/admin/users', { params }),
    getStats: () => api.get('/admin/stats'),
    updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

// Leads API
export const leadsAPI = {
    submit: (data) => api.post('/leads', data),
    getAll: () => api.get('/leads'),
};

export default api;
