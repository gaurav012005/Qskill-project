import bcrypt from 'bcrypt'
import db from '../config/database.js'

export default async function authRoutes(fastify, options) {

    // Register
    fastify.post('/register', async (request, reply) => {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return reply.code(400).send({ error: 'All fields are required' })
        }

        try {
            // Check if user exists
            const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])
            if (existing.length > 0) {
                return reply.code(400).send({ error: 'Email already registered' })
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            // Insert user
            const [result] = await db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            )

            // Create default settings
            await db.query(
                'INSERT INTO settings (user_id) VALUES (?)',
                [result.insertId]
            )

            return reply.code(201).send({
                message: 'User registered successfully',
                userId: result.insertId
            })
        } catch (error) {
            console.error('Registration error:', error)
            return reply.code(500).send({ error: 'Registration failed' })
        }
    })

    // Login
    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body

        if (!email || !password) {
            return reply.code(400).send({ error: 'Email and password are required' })
        }

        try {
            // Get user
            const [users] = await db.query(
                'SELECT id, name, email, password FROM users WHERE email = ?',
                [email]
            )

            if (users.length === 0) {
                return reply.code(401).send({ error: 'Invalid credentials' })
            }

            const user = users[0]

            // Verify password
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return reply.code(401).send({ error: 'Invalid credentials' })
            }

            // Generate JWT
            const token = fastify.jwt.sign(
                { id: user.id, email: user.email },
                { expiresIn: '24h' }
            )

            return reply.send({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })
        } catch (error) {
            console.error('Login error:', error)
            return reply.code(500).send({ error: 'Login failed' })
        }
    })

    // Get current user
    fastify.get('/me', {
        onRequest: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const [users] = await db.query(
                'SELECT id, name, email, created_at FROM users WHERE id = ?',
                [request.user.id]
            )

            if (users.length === 0) {
                return reply.code(404).send({ error: 'User not found' })
            }

            return reply.send({ user: users[0] })
        } catch (error) {
            console.error('Get user error:', error)
            return reply.code(500).send({ error: 'Failed to get user' })
        }
    })
}
