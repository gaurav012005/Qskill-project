import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const CoursePreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const response = await api.get(`/courses/${id}`);
            setCourse(response.data.course);
        } catch (error) {
            console.error('Error fetching course:', error);
            navigate('/404');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        setEnrolling(true);
        try {
            await api.post('/enrollments', { course_id: id });
            navigate(`/courses/${id}/learn`);
        } catch (error) {
            console.error('Enrollment error:', error);
            alert(error.response?.data?.error || 'Enrollment failed');
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center pt-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <motion.div {...pageTransition} className="min-h-screen pt-24 px-4 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="h-64 bg-gradient-primary flex items-center justify-center">
                            <span className="text-9xl">📚</span>
                        </div>
                        <div className="p-8">
                            <h1 className="text-4xl font-heading font-bold mb-4">{course.title}</h1>
                            <p className="text-gray-400 mb-6">{course.description}</p>

                            <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
                                <span>👨‍🏫 {course.instructor_name}</span>
                                <span>📖 {course.lesson_count} lessons</span>
                            </div>

                            {course.is_enrolled ? (
                                <Link to={`/courses/${id}/learn`} className="btn-primary inline-block">
                                    Continue Learning
                                </Link>
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="btn-primary disabled:opacity-50"
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default CoursePreview;
