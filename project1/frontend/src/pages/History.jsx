import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Layout from '../components/Layout';
import { translationAPI } from '../services/api';

export default function History() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const result = await translationAPI.getHistory();
            setHistory(result.history || []);
        } catch (error) {
            toast.error('Failed to load history');
            console.error('History error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    const handleSpeak = (text, lang) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
            toast.success('Speaking...');
        } else {
            toast.error('Text-to-speech not supported');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                        Translation History
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        View all your past translations
                    </p>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="spinner w-12 h-12 border-4 border-primary-500 mx-auto mb-4"></div>
                            <p className="text-slate-600 dark:text-slate-400">Loading history...</p>
                        </div>
                    </div>
                ) : history.length === 0 ? (
                    /* Empty State */
                    <div className="glass-card p-12 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            No translations yet
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Start translating to see your history here
                        </p>
                        <a
                            href="/translate"
                            className="btn-primary inline-block"
                        >
                            Start Translating
                        </a>
                    </div>
                ) : (
                    /* History List */
                    <div className="space-y-4">
                        {history.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="glass-card p-6 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Source Text */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase">
                                                English
                                            </span>
                                            <span className="text-xl">🇬🇧</span>
                                        </div>
                                        <p className="text-slate-900 dark:text-slate-100 mb-3">
                                            {item.source_text}
                                        </p>
                                    </div>

                                    {/* Translated Text */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase">
                                                {item.target_language.toUpperCase()}
                                            </span>
                                            <span className="text-xl">🌐</span>
                                        </div>
                                        <p className="text-slate-900 dark:text-slate-100 mb-3">
                                            {item.translated_text}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions and Date */}
                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleCopy(item.translated_text)}
                                            className="btn-secondary text-sm"
                                        >
                                            📋 Copy
                                        </button>
                                        <button
                                            onClick={() => handleSpeak(item.translated_text, item.target_language)}
                                            className="btn-secondary text-sm"
                                        >
                                            🔊 Speak
                                        </button>
                                    </div>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {formatDate(item.created_at)}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {!isLoading && history.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 glass-card p-6 text-center"
                    >
                        <p className="text-slate-600 dark:text-slate-400">
                            Total Translations: <span className="font-bold text-primary-600 dark:text-primary-400">{history.length}</span>
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </Layout>
    );
}
