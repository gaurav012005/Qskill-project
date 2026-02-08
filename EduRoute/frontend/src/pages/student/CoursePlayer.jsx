import { useState, useEffect } from 'react';
import { useParams, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseData();
    }, [courseId]);

    const fetchCourseData = async () => {
        try {
            const [courseRes, lessonsRes, progressRes] = await Promise.all([
                api.get(`/courses/${courseId}`),
                api.get(`/lessons/course/${courseId}`),
                api.get(`/progress/course/${courseId}`)
            ]);

            setCourse(courseRes.data.course);
            setLessons(lessonsRes.data.lessons);
            setProgress(progressRes.data);

            // Navigate to first lesson if no lesson selected and not on quiz page
            if (lessonsRes.data.lessons.length > 0 && location.pathname === `/courses/${courseId}/learn`) {
                navigate(`/courses/${courseId}/learn/${lessonsRes.data.lessons[0].id}`, { replace: true });
            }
        } catch (error) {
            console.error('Error:', error);
            navigate('/my-courses');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className="w-80 glass-card border-r border-white/10 overflow-y-auto fixed h-screen"
            >
                <div className="p-6">
                    {/* Course Header */}
                    <div className="mb-6">
                        <Link to="/my-courses" className="text-sm text-gray-400 hover:text-white mb-2 inline-block">
                            ← Back to My Courses
                        </Link>
                        <h2 className="text-xl font-heading font-bold mb-2">{course?.title}</h2>

                        {/* Progress Bar */}
                        <div className="progress-bar mb-2">
                            <motion.div
                                className="progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress?.stats?.percentage || 0}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <p className="text-sm text-gray-400">
                            {progress?.stats?.completed}/{progress?.stats?.total} lessons completed
                        </p>
                    </div>

                    {/* Lessons List */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">LESSONS</h3>
                        {lessons.map((lesson, index) => {
                            const lessonProgress = progress?.progress?.find(p => p.lesson_id === lesson.id);
                            const isActive = location.pathname.includes(`/learn/${lesson.id}`);

                            return (
                                <Link
                                    key={lesson.id}
                                    to={`/courses/${courseId}/learn/${lesson.id}`}
                                    className={`block p-3 rounded-lg transition ${isActive
                                            ? 'bg-primary/20 border-l-4 border-primary'
                                            : 'glass-card hover:bg-white/10'
                                        } ${lessonProgress?.completed ? 'border-l-4 border-success' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">Lesson {index + 1}</span>
                                                {lessonProgress?.completed && <span className="text-xs">✅</span>}
                                            </div>
                                            <span className="text-sm font-medium">{lesson.title}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Quiz Link */}
                    {progress?.stats?.percentage === 100 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <Link
                                to={`/courses/${courseId}/quiz`}
                                className="block p-4 rounded-lg bg-gradient-primary text-center font-semibold hover:scale-105 transition"
                            >
                                🎯 Take Final Quiz
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Content Area */}
            <div className="flex-1 ml-80 overflow-y-auto">
                <Outlet context={{ course, lessons, progress, refetch: fetchCourseData }} />
            </div>
        </div>
    );
};

export default CoursePlayer;
