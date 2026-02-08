import api from '../utils/api'

export const sessionService = {
    async saveSession(focusMinutes, breakMinutes) {
        const response = await api.post('/sessions', {
            focus_minutes: focusMinutes,
            break_minutes: breakMinutes
        })
        return response.data
    },

    async getStatistics() {
        const response = await api.get('/sessions/stats')
        return response.data
    }
}
