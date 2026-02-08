import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'
import sessionRoutes from './routes/sessions.js'
import settingsRoutes from './routes/settings.js'

dotenv.config()

const fastify = Fastify({
    logger: true
})

// Register CORS
await fastify.register(cors, {
    origin: ['http://localhost:4000', 'http://localhost:4001'],
    credentials: true
})

// Register JWT
await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-this'
})

// JWT verification decorator
fastify.decorate('authenticate', async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' })
    }
})

// Register routes
await fastify.register(authRoutes, { prefix: '/api/auth' })
await fastify.register(taskRoutes, { prefix: '/api/tasks' })
await fastify.register(sessionRoutes, { prefix: '/api/sessions' })
await fastify.register(settingsRoutes, { prefix: '/api/settings' })

// Root route - API info page (matching uploaded design screenshot)
fastify.get('/', async (request, reply) => {
    reply.type('text/html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task & Focus Manager API</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-4 font-sans">
            <div class="max-w-3xl w-full">
                <!-- Header -->
                <div class="text-center mb-6">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <span class="text-5xl">🚀</span>
                        Task & Focus Manager API
                    </h1>
                    <p class="text-purple-100 text-base">
                        Fastify + MySQL + JWT Authentication
                    </p>
                    <div class="mt-4 inline-block px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium">
                        ✅ API Running Successfully
                    </div>
                </div>

                <!-- Dark Card -->
                <div class="bg-gray-900 rounded-2xl shadow-2xl p-8">
                    <div class="flex items-center gap-2 mb-6">
                        <span class="text-2xl">⚡</span>
                        <h2 class="text-xl font-bold text-white">
                            Available Endpoints
                        </h2>
                    </div>

                    <!-- Endpoints List -->
                    <div class="space-y-2.5">
                        <!-- Health Check -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
                                <a href="/api/health" class="text-blue-400 hover:text-blue-300 font-mono text-sm">/api/health</a>
                            </div>
                            <span class="text-gray-400 text-sm">Health check</span>
                        </div>

                        <!-- Auth Register -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
                                <span class="text-green-400 font-mono text-sm">/api/auth/register</span>
                            </div>
                            <span class="text-gray-400 text-sm">Register user</span>
                        </div>

                        <!-- Auth Login -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
                                <span class="text-green-400 font-mono text-sm">/api/auth/login</span>
                            </div>
                            <span class="text-gray-400 text-sm">Login user</span>
                        </div>

                        <!-- Auth Me -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
                                <span class="text-blue-400 font-mono text-sm">/api/auth/me</span>
                            </div>
                            <span class="text-gray-400 text-sm">Current user</span>
                        </div>

                        <!-- Get Tasks -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
                                <span class="text-blue-400 font-mono text-sm">/api/tasks</span>
                            </div>
                            <span class="text-gray-400 text-sm">Get all tasks</span>
                        </div>

                        <!-- Create Task -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
                                <span class="text-green-400 font-mono text-sm">/api/tasks</span>
                            </div>
                            <span class="text-gray-400 text-sm">Create task</span>
                        </div>

                        <!-- Update Task -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded">PUT</span>
                                <span class="text-yellow-400 font-mono text-sm">/api/tasks/:id</span>
                            </div>
                            <span class="text-gray-400 text-sm">Update task</span>
                        </div>

                        <!-- Delete Task -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">DELETE</span>
                                <span class="text-red-400 font-mono text-sm">/api/tasks/:id</span>
                            </div>
                            <span class="text-gray-400 text-sm">Delete task</span>
                        </div>

                        <!-- Session Stats -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
                                <span class="text-blue-400 font-mono text-sm">/api/sessions/stats</span>
                            </div>
                            <span class="text-gray-400 text-sm">Session stats</span>
                        </div>

                        <!-- Settings -->
                        <div class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded">GET</span>
                                <span class="text-blue-400 font-mono text-sm">/api/settings</span>
                            </div>
                            <span class="text-gray-400 text-sm">User settings</span>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="mt-8 pt-6 border-t border-gray-700">
                        <p class="text-gray-300 text-center font-medium mb-4">Access Frontend Application</p>
                        <div class="flex gap-3 justify-center flex-wrap">
                            <a href="http://localhost:4000" target="_blank" class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                Port 4000
                            </a>
                            <a href="http://localhost:4001" target="_blank" class="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                Port 4001
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="text-center mt-6 text-white text-sm">
                    <p class="font-medium">Built with Fastify & MySQL 💜</p>
                    <p class="mt-1 text-purple-200">Backend Server • Port 5000</p>
                </div>
            </div>
        </body>
        </html>
    `)
})

// Health check
fastify.get('/api/health', async (request, reply) => {
    return { status: 'OK', message: 'Server is running' }
})

// Start server
const start = async () => {
    try {
        const port = process.env.PORT || 5000
        await fastify.listen({ port, host: '0.0.0.0' })
        console.log(`🚀 Server running on http://localhost:${port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
