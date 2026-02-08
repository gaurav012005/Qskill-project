import { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import api from '../../utils/api';

const LessonView = () => {
    const { lessonId, courseId } = useParams();
    const { lessons, refetch } = useOutletContext();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        fetchLesson();
        // Update last visited lesson
        updateLastLesson();
    }, [lessonId]);

    const fetchLesson = async () => {
        try {
            const response = await api.get(`/lessons/${lessonId}`);
            setLesson(response.data.lesson);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateLastLesson = async () => {
        try {
            await api.put(`/enrollments/course/${courseId}/last-lesson`, { lesson_id: lessonId });
        } catch (error) {
            console.error('Error updating last lesson:', error);
        }
    };

    const markComplete = async () => {
        setCompleting(true);
        try {
            await api.post(`/progress/lesson/${lessonId}/complete`);
            await refetch();

            // Navigate to next lesson
            const currentIndex = lessons.findIndex(l => l.id === parseInt(lessonId));
            if (currentIndex < lessons.length - 1) {
                navigate(`/courses/${courseId}/learn/${lessons[currentIndex + 1].id}`);
            } else {
                // All lessons complete, suggest quiz
                navigate(`/courses/${courseId}/quiz`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to mark lesson as complete');
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const currentIndex = lessons.findIndex(l => l.id === parseInt(lessonId));
    const isLastLesson = currentIndex === lessons.length - 1;

    return (
        <motion.div
            {...pageTransition}
            className="p-8 max-w-4xl mx-auto min-h-screen"
        >
            {/* Lesson Header */}
            <div className="mb-8">
                <div className="text-sm text-gray-400 mb-2">
                    Lesson {currentIndex + 1} of {lessons.length}
                </div>
                <h1 className="text-4xl font-heading font-bold mb-4">{lesson.title}</h1>
            </div>

            {/* Video Player */}
            {lesson.video_url && (
                <div className="aspect-video bg-bg-tertiary rounded-xl mb-8 flex items-center justify-center glass-card">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎥</div>
                        <p className="text-gray-400">Video Player</p>
                        <p className="text-sm text-gray-500 mt-2">{lesson.video_url}</p>
                    </div>
                </div>
            )}

            {/* Lesson Content */}
            <div className="glass-card p-8 rounded-xl mb-8">
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {lesson.content}
                    </p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => {
                        if (currentIndex > 0) {
                            navigate(`/courses/${courseId}/learn/${lessons[currentIndex - 1].id}`);
                        }
                    }}
                    disabled={currentIndex === 0}
                    className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ← Previous Lesson
                </button>

                <motion.button
                    onClick={markComplete}
                    disabled={completing}
                    className="btn-primary disabled:opacity-50"
                    whileHover={{ scale: completing ? 1 : 1.05 }}
                    whileTap={{ scale: completing ? 1 : 0.95 }}
                >
                    {completing ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Completing...
                        </span>
                    ) : isLastLesson ? (
                        'Complete & Take Quiz →'
                    ) : (
                        'Complete & Continue →'
                    )}
                </motion.button>
            </div>

            {/* Lesson Info */}
            {lesson.duration && (
                <div className="mt-8 text-center text-sm text-gray-500">
                    Estimated time: {Math.floor(lesson.duration / 60)} minutes
                </div>
            )}
        </motion.div>
    );
};

export default LessonView;
