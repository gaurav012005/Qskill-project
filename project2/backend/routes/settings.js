import db from '../config/database.js'

export default async function settingsRoutes(fastify, options) {

    // Get user settings
    fastify.get('/', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const [settings] = await db.query(
                'SELECT * FROM settings WHERE user_id = ?',
                [request.user.id]
            )

            if (settings.length === 0) {
                // Create default settings if not exist
                await db.query('INSERT INTO settings (user_id) VALUES (?)', [request.user.id])
                const [newSettings] = await db.query('SELECT * FROM settings WHERE user_id = ?', [request.user.id])
                return reply.send({ settings: newSettings[0] })
            }

            return reply.send({ settings: settings[0] })
        } catch (error) {
            console.error('Get settings error:', error)
            return reply.code(500).send({ error: 'Failed to fetch settings' })
        }
    })

    // Update user settings
    fastify.put('/', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const {
            dark_mode,
            focus_duration,
            break_duration,
            long_break_duration,
            sound_enabled,
            notifications
        } = request.body

        try {
            await db.query(
                `UPDATE settings SET 
         dark_mode = ?, 
         focus_duration = ?, 
         break_duration = ?,
         long_break_duration = ?,
         sound_enabled = ?,
         notifications = ?
         WHERE user_id = ?`,
                [
                    dark_mode ?? false,
                    focus_duration ?? 25,
                    break_duration ?? 5,
                    long_break_duration ?? 15,
                    sound_enabled ?? true,
                    notifications ?? true,
                    request.user.id
                ]
            )

            const [settings] = await db.query('SELECT * FROM settings WHERE user_id = ?', [request.user.id])
            return reply.send({ settings: settings[0] })
        } catch (error) {
            console.error('Update settings error:', error)
            return reply.code(500).send({ error: 'Failed to update settings' })
        }
    })
}
