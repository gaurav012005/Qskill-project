import api from '../utils/api'

export const taskService = {
    async getAllTasks(filters = {}) {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.priority) params.append('priority', filters.priority)
        if (filters.search) params.append('search', filters.search)

        const response = await api.get(`/tasks?${params}`)
        return response.data
    },

    async createTask(taskData) {
        const response = await api.post('/tasks', taskData)
        return response.data
    },

    async updateTask(id, taskData) {
        const response = await api.put(`/tasks/${id}`, taskData)
        return response.data
    },

    async deleteTask(id) {
        const response = await api.delete(`/tasks/${id}`)
        return response.data
    },

    async toggleTaskStatus(id) {
        const response = await api.patch(`/tasks/${id}/toggle`)
        return response.data
    },

    async bulkComplete() {
        const response = await api.post('/tasks/bulk-complete')
        return response.data
    }
}
