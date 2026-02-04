import db from '../config/database.js'

export default async function sessionRoutes(fastify, options) {

    // Save focus session
    fastify.post('/', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const { focus_minutes, break_minutes } = request.body

        if (!focus_minutes || !break_minutes) {
            return reply.code(400).send({ error: 'Focus and break minutes are required' })
        }

        try {
            const today = new Date().toISOString().split('T')[0]

            await db.query(
                'INSERT INTO focus_sessions (user_id, focus_minutes, break_minutes, session_date) VALUES (?, ?, ?, ?)',
                [request.user.id, focus_minutes, break_minutes, today]
            )

            return reply.code(201).send({ message: 'Session saved successfully' })
        } catch (error) {
            console.error('Save session error:', error)
            return reply.code(500).send({ error: 'Failed to save session' })
        }
    })

    // Get session statistics
    fastify.get('/stats', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            // Today's stats
            const today = new Date().toISOString().split('T')[0]
            const [todayStats] = await db.query(
                'SELECT COUNT(*) as sessions, SUM(focus_minutes) as total_focus FROM focus_sessions WHERE user_id = ? AND session_date = ?',
                [request.user.id, today]
            )

            // Weekly stats (last 7 days)
            const [weeklyStats] = await db.query(
                `SELECT session_date, COUNT(*) as sessions, SUM(focus_minutes) as total_focus 
         FROM focus_sessions 
         WHERE user_id = ? AND session_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
         GROUP BY session_date
         ORDER BY session_date DESC`,
                [request.user.id]
            )

            // Streak calculation
            const [allSessions] = await db.query(
                `SELECT DISTINCT session_date FROM focus_sessions 
         WHERE user_id = ? 
         ORDER BY session_date DESC`,
                [request.user.id]
            )

            let streak = 0
            const now = new Date()
            for (let session of allSessions) {
                const sessionDate = new Date(session.session_date)
                const diffDays = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24))

                if (diffDays === streak) {
                    streak++
                } else {
                    break
                }
            }

            return reply.send({
                today: todayStats[0],
                weekly: weeklyStats,
                streak
            })
        } catch (error) {
            console.error('Get stats error:', error)
            return reply.code(500).send({ error: 'Failed to fetch statistics' })
        }
    })
}
