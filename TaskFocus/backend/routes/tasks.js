import db from '../config/database.js'

export default async function taskRoutes(fastify, options) {

    // Get all tasks for user
    fastify.get('/', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const { status, priority, search } = request.query

        try {
            let query = 'SELECT * FROM tasks WHERE user_id = ?'
            const params = [request.user.id]

            if (status) {
                query += ' AND status = ?'
                params.push(status)
            }

            if (priority) {
                query += ' AND priority = ?'
                params.push(priority)
            }

            if (search) {
                query += ' AND title LIKE ?'
                params.push(`%${search}%`)
            }

            query += ' ORDER BY created_at DESC'

            const [tasks] = await db.query(query, params)
            return reply.send({ tasks })
        } catch (error) {
            console.error('Get tasks error:', error)
            return reply.code(500).send({ error: 'Failed to fetch tasks' })
        }
    })

    // Create task
    fastify.post('/', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const { title, priority, due_date } = request.body

        if (!title) {
            return reply.code(400).send({ error: 'Title is required' })
        }

        try {
            const [result] = await db.query(
                'INSERT INTO tasks (user_id, title, priority, due_date) VALUES (?, ?, ?, ?)',
                [request.user.id, title, priority || 'MEDIUM', due_date || null]
            )

            const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId])
            return reply.code(201).send({ task: tasks[0] })
        } catch (error) {
            console.error('Create task error:', error)
            return reply.code(500).send({ error: 'Failed to create task' })
        }
    })

    // Update task
    fastify.put('/:id', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const { id } = request.params
        const { title, priority, due_date, status } = request.body

        try {
            const [result] = await db.query(
                'UPDATE tasks SET title = ?, priority = ?, due_date = ?, status = ? WHERE id = ? AND user_id = ?',
                [title, priority, due_date, status, id, request.user.id]
            )

            if (result.affectedRows === 0) {
                return reply.code(404).send({ error: 'Task not found' })
            }

            const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [id])
            return reply.send({ task: tasks[0] })
        } catch (error) {
            console.error('Update task error:', error)
            return reply.code(500).send({ error: 'Failed to update task' })
        }
    })

    // Toggle task status
    fastify.patch('/:id/toggle', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const { id } = request.params

        try {
            await db.query(
                'UPDATE tasks SET status = IF(status = "PENDING", "COMPLETED", "PENDING") WHERE id = ? AND user_id = ?',
                [id, request.user.id]
            )

            const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [id])
            return reply.send({ task: tasks[0] })
        } catch (error) {
            console.error('Toggle task error:', error)
            return reply.code(500).send({ error: 'Failed to toggle task' })
        }
    })

    // Delete task
    fastify.delete('/:id', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        const { id } = request.params

        try {
            const [result] = await db.query(
                'DELETE FROM tasks WHERE id = ? AND user_id = ?',
                [id, request.user.id]
            )

            if (result.affectedRows === 0) {
                return reply.code(404).send({ error: 'Task not found' })
            }

            return reply.send({ message: 'Task deleted successfully' })
        } catch (error) {
            console.error('Delete task error:', error)
            return reply.code(500).send({ error: 'Failed to delete task' })
        }
    })

    // Bulk complete tasks
    fastify.post('/bulk-complete', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            await db.query(
                'UPDATE tasks SET status = "COMPLETED" WHERE user_id = ? AND status = "PENDING"',
                [request.user.id]
            )

            return reply.send({ message: 'All tasks marked as completed' })
        } catch (error) {
            console.error('Bulk complete error:', error)
            return reply.code(500).send({ error: 'Failed to complete tasks' })
        }
    })
}
