import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const Settings = () => {
    const { isDark, toggleTheme } = useTheme()
    const { user } = useAuth()
    const [settings, setSettings] = useState({
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        soundEnabled: true,
        notifications: true
    })

    const handleSettingChange = useCallback((key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }, [])

    const handleSaveSettings = useCallback(() => {
        // Save to backend in production
        toast.success('Settings saved successfully!')
    }, [])

    return (
        <Layout>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Settings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Customize your productivity experience
                    </p>
                </div>

                {/* Profile Section */}
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Profile Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                value={user?.name || ''}
                                className="input-field"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                className="input-field"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Appearance
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Toggle between light and dark theme
                            </p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${isDark ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <div
                                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-200 ${isDark ? 'transform translate-x-8' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Timer Settings */}
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Timer Settings
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="label">
                                Focus Duration: {settings.focusDuration} minutes
                            </label>
                            <input
                                type="range"
                                min="15"
                                max="60"
                                value={settings.focusDuration}
                                onChange={(e) => handleSettingChange('focusDuration', Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>15 min</span>
                                <span>60 min</span>
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                Short Break: {settings.shortBreakDuration} minutes
                            </label>
                            <input
                                type="range"
                                min="3"
                                max="15"
                                value={settings.shortBreakDuration}
                                onChange={(e) => handleSettingChange('shortBreakDuration', Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>3 min</span>
                                <span>15 min</span>
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                Long Break: {settings.longBreakDuration} minutes
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="30"
                                value={settings.longBreakDuration}
                                onChange={(e) => handleSettingChange('longBreakDuration', Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>10 min</span>
                                <span>30 min</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Sound Alerts</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Play sound when timer completes
                                </p>
                            </div>
                            <button
                                onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
                                className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-200 ${settings.soundEnabled ? 'transform translate-x-8' : ''
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Browser Notifications</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Show notifications for task reminders
                                </p>
                            </div>
                            <button
                                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                                className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${settings.notifications ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-200 ${settings.notifications ? 'transform translate-x-8' : ''
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSaveSettings}
                    className="w-full btn-primary"
                >
                    💾 Save Settings
                </button>
            </div>
        </Layout>
    )
}

export default Settings
