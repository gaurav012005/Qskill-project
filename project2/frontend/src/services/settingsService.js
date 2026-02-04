import api from '../utils/api'

export const settingsService = {
    async getSettings() {
        const response = await api.get('/settings')
        return response.data
    },

    async updateSettings(settingsData) {
        const response = await api.put('/settings', settingsData)
        return response.data
    }
}
