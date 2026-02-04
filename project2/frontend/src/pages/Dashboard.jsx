import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user } = useAuth()
    const [stats, setStats] = useState({
        tasksToday: 0,
        completedToday: 0,
        focusMinutes: 0,
        streak: 0
    })

    useEffect(() => {
        // Mock stats - in production, fetch from API
        setStats({
            tasksToday: 5,
            completedToday: 3,
            focusMinutes: 75,
            streak: 7
        })
    }, [])

    const features = [
        {
            title: 'Task Management',
            icon: '✅',
            description: 'Organize and track your tasks efficiently',
            path: '/tasks',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'String Generator',
            icon: '🎲',
            description: 'Generate secure random strings instantly',
            path: '/string-generator',
            color: 'from-purple-500 to-pink-600'
        },
        {
            title: 'Focus Timer',
            icon: '⏱️',
            description: 'Pomodoro timer for better productivity',
            path: '/timer',
            color: 'from-green-500 to-emerald-600'
        },
        {
            title: 'Analytics',
            icon: '📈',
            description: 'Track your productivity insights',
            path: '/analytics',
            color: 'from-orange-500 to-red-600'
        }
    ]

    return (
        <Layout>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name}!</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's your productivity overview for today
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tasks Today</p>
                                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.tasksToday}</p>
                            </div>
                            <div className="text-4xl">📝</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.completedToday}</p>
                            </div>
                            <div className="text-4xl">✅</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Focus Time</p>
                                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{stats.focusMinutes}m</p>
                            </div>
                            <div className="text-4xl">⏱️</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Streak</p>
                                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{stats.streak} 🔥</p>
                            </div>
                            <div className="text-4xl">📊</div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Access</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature) => (
                            <Link
                                key={feature.path}
                                to={feature.path}
                                className="group card hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`text-5xl bg-gradient-to-r ${feature.color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                        <div className="mt-3 text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-block">
                                            Get started →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="card bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center">
                    <p className="text-2xl font-bold mb-2">
                        "Productivity is never an accident. It's always the result of commitment."
                    </p>
                    <p className="text-purple-100">
                        Keep up the great work! 💪
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
