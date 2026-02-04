import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'

const StringGenerator = () => {
    // useState for all component state
    const [generatedString, setGeneratedString] = useState('')
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(false)
    const [history, setHistory] = useState([])
    const [copied, setCopied] = useState(false)

    // useCallback for optimized string generation function
    const generateRandomString = useCallback(() => {
        let charset = ''

        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
        if (includeNumbers) charset += '0123456789'
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

        if (!charset) {
            toast.error('Please select at least one character type!')
            return
        }

        let result = ''
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            result += charset[randomIndex]
        }

        setGeneratedString(result)
        setHistory(prev => [result, ...prev].slice(0, 10)) // Keep last 10
        toast.success('String generated!')
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

    // useCallback for copy to clipboard handler
    const handleCopyToClipboard = useCallback((text) => {
        navigator.clipboard.writeText(text || generatedString)
        setCopied(true)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopied(false), 2000)
    }, [generatedString])

    // useCallback for clearing history
    const handleClearHistory = useCallback(() => {
        setHistory([])
        toast.success('History cleared!')
    }, [])

    // useEffect to auto-generate on mount
    useEffect(() => {
        generateRandomString()
    }, []) // Only run on mount

    // useEffect to regenerate when settings change (with debounce)
    useEffect(() => {
        if (generatedString) { // Don't run on initial mount
            const timer = setTimeout(() => {
                generateRandomString()
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Random String Generator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Generate secure random strings with custom settings
                    </p>
                </div>

                {/* Main Generation Card */}
                <div className="card mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
                    {/* String Display */}
                    <div className="mb-6">
                        <div className="relative">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-purple-300 dark:border-purple-600 min-h-[100px] flex items-center justify-center">
                                <p className="text-2xl font-mono font-bold text-center break-all text-purple-600 dark:text-purple-400">
                                    {generatedString || 'Click Generate!'}
                                </p>
                            </div>
                            {copied && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                                    ✓ Copied!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => generateRandomString()}
                            className="flex-1 btn-primary"
                        >
                            🎲 Generate New
                        </button>
                        <button
                            onClick={() => handleCopyToClipboard()}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            📋 Copy to Clipboard
                        </button>
                    </div>

                    {/* Configuration Panel */}
                    <div className="space-y-4">
                        {/* Length Slider */}
                        <div>
                            <label className="label flex justify-between">
                                <span>String Length</span>
                                <span className="text-purple-600 dark:text-purple-400 font-bold">{length}</span>
                            </label>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>4</span>
                                <span>64</span>
                            </div>
                        </div>

                        {/* Character Type Checkboxes */}
                        <div>
                            <label className="label">Character Types</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeUppercase}
                                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <span>Uppercase (A-Z)</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeLowercase}
                                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <span>Lowercase (a-z)</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeNumbers}
                                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <span>Numbers (0-9)</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeSymbols}
                                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <span>Symbols (!@#$%)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                {history.length > 0 && (
                    <div className="card">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Recent History
                            </h2>
                            <button
                                onClick={handleClearHistory}
                                className="text-red-500 hover:text-red-700 font-semibold text-sm"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="space-y-2">
                            {history.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCopyToClipboard(item)}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-all duration-200 group"
                                >
                                    <span className="font-mono text-sm flex-1 truncate">
                                        {item}
                                    </span>
                                    <span className="text-gray-400 group-hover:text-purple-600 text-sm ml-2">
                                        📋 Copy
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* React Hooks Info (Educational) */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                        🎓 React Hooks Used in This Component:
                    </h3>
                    <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                        <li>• <strong>useState</strong>: Managing string, length, checkboxes, history, and copied state</li>
                        <li>• <strong>useCallback</strong>: Optimizing generateRandomString, handleCopyToClipboard, and handleClearHistory functions</li>
                        <li>• <strong>useEffect</strong>: Auto-generating on mount and regenerating when settings change</li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default StringGenerator
