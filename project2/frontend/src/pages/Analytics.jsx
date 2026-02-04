import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

const Analytics = () => {
    const [stats, setStats] = useState({
        dailyCompletion: [],
        weeklyFocus: [],
        streak: 0,
        productivityScore: 0
    })

    useEffect(() => {
        // Mock analytics data
        const mockData = {
            dailyCompletion: [
                { day: 'Mon', completed: 5, total: 8 },
                { day: 'Tue', completed: 7, total: 10 },
                { day: 'Wed', completed: 6, total: 7 },
                { day: 'Thu', completed: 8, total: 9 },
                { day: 'Fri', completed: 4, total: 6 },
                { day: 'Sat', completed: 3, total: 5 },
                { day: 'Sun', completed: 6, total: 8 }
            ],
            weeklyFocus: [
                { day: 'Mon', minutes: 120 },
                { day: 'Tue', minutes: 150 },
                { day: 'Wed', minutes: 90 },
                { day: 'Thu', minutes: 180 },
                { day: 'Fri', minutes: 100 },
                { day: 'Sat', minutes: 60 },
                { day: 'Sun', minutes: 110 }
            ],
            streak: 7,
            productivityScore: 85
        }
        setStats(mockData)
    }, [])

    const maxFocus = Math.max(...stats.weeklyFocus.map(d => d.minutes))

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your productivity insights
                    </p>
                </div>

                {/* Streak & Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Streak Counter */}
                    <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700 text-center p-8">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Current Streak
                        </h3>
                        <div className="text-8xl mb-4">🔥</div>
                        <div className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {stats.streak}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Days in a row!</p>
                    </div>

                    {/* Productivity Score */}
                    <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 text-center p-8">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Productivity Score
                        </h3>
                        <div className="relative w-32 h-32 mx-auto">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="text-gray-200 dark:text-gray-700"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 56}`}
                                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - stats.productivityScore / 100)}`}
                                    className="text-green-500 transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                                    {stats.productivityScore}%
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-4">Keep it up!</p>
                    </div>
                </div>

                {/* Daily Task Completion Chart */}
                <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Daily Task Completion (Last 7 Days)
                    </h3>
                    <div className="space-y-3">
                        {stats.dailyCompletion.map((day, index) => {
                            const percentage = (day.completed / day.total) * 100
                            return (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.day}</span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {day.completed}/{day.total} tasks
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-1000 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Weekly Focus Time Chart */}
                <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Weekly Focus Time (Minutes)
                    </h3>
                    <div className="flex items-end justify-between gap-2 h-64">
                        {stats.weeklyFocus.map((day, index) => {
                            const height = (day.minutes / maxFocus) * 100
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center justify-end">
                                    <div className="relative group w-full">
                                        <div
                                            className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg w-full transition-all duration-500 hover:opacity-80 cursor-pointer"
                                            style={{ height: `${height}%`, minHeight: '20px' }}
                                        />
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {day.minutes} min
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                                        {day.day}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card text-center bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Tasks</p>
                        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                            {stats.dailyCompletion.reduce((sum, d) => sum + d.total, 0)}
                        </p>
                    </div>
                    <div className="card text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                        <p className="text-sm text-green-600 dark:text-green-400 mb-1">Completed</p>
                        <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                            {stats.dailyCompletion.reduce((sum, d) => sum + d.completed, 0)}
                        </p>
                    </div>
                    <div className="card text-center bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
                        <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Focus Time</p>
                        <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                            {stats.weeklyFocus.reduce((sum, d) => sum + d.minutes, 0)} min
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Analytics
