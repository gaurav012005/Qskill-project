import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Layout from '../components/Layout';
import { translationAPI, favoritesAPI } from '../services/api';

// Indian languages supported
const LANGUAGES = [
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
];

export default function Translate() {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('hi');
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationId, setTranslationId] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleTranslate = async () => {
        if (!sourceText.trim()) {
            toast.error('Please enter text to translate');
            return;
        }

        setIsTranslating(true);
        try {
            const result = await translationAPI.translate(sourceText, selectedLanguage);
            setTranslatedText(result.translatedText);
            setTranslationId(result.translationId);
            setIsFavorited(false);
            toast.success('Translation successful!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Translation failed');
            console.error('Translation error:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    const handleCopy = async () => {
        if (!translatedText) return;

        try {
            await navigator.clipboard.writeText(translatedText);
            toast.success('Copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    const handleSpeak = () => {
        if (!translatedText) return;

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(translatedText);
            utterance.lang = selectedLanguage;
            window.speechSynthesis.speak(utterance);
            toast.success('Speaking...');
        } else {
            toast.error('Text-to-speech not supported in your browser');
        }
    };

    const handleAddToFavorites = async () => {
        if (!translationId) {
            toast.error('No translation to favorite');
            return;
        }

        try {
            await favoritesAPI.addFavorite(translationId);
            setIsFavorited(true);
            toast.success('Added to favorites!');
        } catch (error) {
            if (error.response?.status === 409) {
                toast.info('Already in favorites');
            } else {
                toast.error('Failed to add to favorites');
            }
        }
    };

    const handleClear = () => {
        setSourceText('');
        setTranslatedText('');
        setTranslationId(null);
        setIsFavorited(false);
    };

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                        Translate to Indian Languages
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Instant translation from English to your preferred Indian language
                    </p>
                </div>

                {/* Main translation card */}
                <div className="glass-card p-6 md:p-8 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Source text */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="label text-lg">English</label>
                                <span className="text-2xl">🇬🇧</span>
                            </div>
                            <textarea
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                placeholder="Enter text to translate..."
                                className="textarea h-48"
                                maxLength={5000}
                            />
                            <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-right">
                                {sourceText.length} / 5000
                            </div>
                        </div>

                        {/* Translated text */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="label text-lg">
                                    {LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'Translation'}
                                </label>
                                <span className="text-2xl">
                                    {LANGUAGES.find(l => l.code === selectedLanguage)?.flag}
                                </span>
                            </div>
                            <div className="textarea h-48 bg-slate-50 dark:bg-slate-800/50 overflow-y-auto">
                                {isTranslating ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <div className="spinner w-8 h-8 border-3 border-primary-500 mx-auto mb-2"></div>
                                            <p className="text-slate-600 dark:text-slate-400">Translating...</p>
                                        </div>
                                    </div>
                                ) : translatedText ? (
                                    <p className="text-slate-900 dark:text-slate-100">{translatedText}</p>
                                ) : (
                                    <p className="text-slate-400 dark:text-slate-500">
                                        Translation will appear here...
                                    </p>
                                )}
                            </div>

                            {/* Action buttons for translated text */}
                            {translatedText && !isTranslating && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="btn-secondary text-sm"
                                        title="Copy to clipboard"
                                    >
                                        📋 Copy
                                    </button>
                                    <button
                                        onClick={handleSpeak}
                                        className="btn-secondary text-sm"
                                        title="Text to speech"
                                    >
                                        🔊 Speak
                                    </button>
                                    <button
                                        onClick={handleAddToFavorites}
                                        className={`btn-secondary text-sm ${isFavorited ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}
                                        title="Add to favorites"
                                        disabled={isFavorited}
                                    >
                                        {isFavorited ? '⭐ Favorited' : '☆ Favorite'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Language selector */}
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <label className="label mb-3">Select Target Language</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setSelectedLanguage(lang.code)}
                                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${selectedLanguage === lang.code
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{lang.flag}</div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                        {lang.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={handleTranslate}
                            disabled={isTranslating || !sourceText.trim()}
                            className="btn-primary flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isTranslating ? (
                                <span className="flex items-center justify-center">
                                    <span className="spinner mr-2"></span>
                                    Translating...
                                </span>
                            ) : (
                                '🌐 Translate'
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            className="btn-secondary"
                        >
                            🗑️ Clear
                        </button>
                    </div>
                </div>

                {/* Info cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="card text-center">
                        <div className="text-3xl mb-2">⚡</div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            Instant Translation
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Get translations in seconds
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">🎯</div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            10 Indian Languages
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Wide language support
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">💾</div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            Auto-Save History
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            All translations saved
                        </p>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
}
