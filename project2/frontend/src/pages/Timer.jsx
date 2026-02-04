import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false)
    const [mode, setMode] = useState('FOCUS') // FOCUS, SHORT_BREAK, LONG_BREAK
    const [sessions, setSessions] = useState(0)

    const modes = {
        FOCUS: { duration: 25 * 60, label: 'Focus Time', icon: '🎯', color: 'from-green-500 to-emerald-600' },
        SHORT_BREAK: { duration: 5 * 60, label: 'Short Break', icon: '☕', color: 'from-blue-500 to-blue-600' },
        LONG_BREAK: { duration: 15 * 60, label: 'Long Break', icon: '🌴', color: 'from-purple-500 to-purple-600' }
    }

    // Timer countdown logic with useEffect
    useEffect(() => {
        let interval = null

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            // Timer completed
            toast.success(`${modes[mode].label} completed! 🎉`)
            if (mode === 'FOCUS') {
                setSessions(prev => prev + 1)
            }
            setIsRunning(false)
            playSound()
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, timeLeft, mode])

    const playSound = useCallback(() => {
        // Simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 440
        oscillator.type = 'sine'
        gainNode.gain.value = 0.3

        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.5)
    }, [])

    const handleStart = useCallback(() => {
        setIsRunning(true)
        toast.success('Timer started!')
    }, [])

    const handlePause = useCallback(() => {
        setIsRunning(false)
        toast('Timer paused')
    }, [])

    const handleReset = useCallback(() => {
        setIsRunning(false)
        setTimeLeft(modes[mode].duration)
        toast('Timer reset')
    }, [mode])

    const handleModeChange = useCallback((newMode) => {
        setMode(newMode)
        setTimeLeft(modes[newMode].duration)
        setIsRunning(false)
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100

    return (
        <Layout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Pomodoro Timer
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Stay focused with the Pomodoro technique
                    </p>
                </div>

                {/* Mode Selector */}
                <div className="flex gap-3 justify-center">
                    {Object.keys(modes).map(m => (
                        <button
                            key={m}
                            onClick={() => handleModeChange(m)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${mode === m
                                    ? `bg-gradient-to-r ${modes[m].color} text-white shadow-lg`
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {modes[m].icon} {modes[m].label}
                        </button>
                    ))}
                </div>

                {/* Timer Display */}
                <div className={`card text-center bg-gradient-to-br ${modes[mode].color} text-white p-12`}>
                    <div className="mb-6">
                        <div className="text-8xl font-mono font-bold mb-4">
                            {formatTime(timeLeft)}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-white h-full transition-all duration-1000 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 justify-center">
                        {!isRunning ? (
                            <button onClick={handleStart} className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
                                ▶️ Start
                            </button>
                        ) : (
                            <button onClick={handlePause} className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
                                ⏸️ Pause
                            </button>
                        )}
                        <button onClick={handleReset} className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-white/30 transition-all">
                            🔄 Reset
                        </button>
                    </div>
                </div>

                {/* Session Counter */}
                <div className="card text-center">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Sessions Completed Today
                    </h3>
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {sessions}
                    </div>
                </div>

                {/* Info Card */}
                <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                        🍅 Pomodoro Technique
                    </h3>
                    <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                        <li>• Work for 25 minutes (Focus Time)</li>
                        <li>• Take a 5-minute break (Short Break)</li>
                        <li>• After 4 sessions, take a 15-minute break (Long Break)</li>
                        <li>• Repeat and stay productive!</li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Timer
