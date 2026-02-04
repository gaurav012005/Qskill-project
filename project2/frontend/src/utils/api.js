import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor - Add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response

            if (status === 401) {
                // Unauthorized - token expired or invalid
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.href = '/login'
                toast.error('Session expired. Please login again.')
            } else if (data.error) {
                toast.error(data.error)
            }
        } else if (error.request) {
            // Request made but no response
            toast.error('Server is not responding. Please check if backend is running.')
        } else {
            toast.error('An error occurred')
        }

        return Promise.reject(error)
    }
)

export default api
