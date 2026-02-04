import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '../../utils/animations';
import api from '../../utils/api';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            const response = await api.get('/enrollments/my-courses');
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
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
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-gradient mb-8">
                        My Courses
                    </h1>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {courses.map((course, index) => {
                            const progressPercent = course.total_lessons > 0
                                ? Math.round((course.completed_lessons / course.total_lessons) * 100)
                                : 0;

                            return (
                                <motion.div key={course.id} variants={staggerItem} custom={index}>
                                    <Link to={`/courses/${course.id}/learn`}>
                                        <div className="glass-card p-6 rounded-xl hover:scale-105 transition h-full">
                                            <h3 className="font-heading font-semibold text-xl mb-2">{course.title}</h3>
                                            <p className="text-sm text-gray-400 mb-4">by {course.instructor_name}</p>

                                            <div className="progress-bar mb-2">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${progressPercent}%` }}
                                                />
                                            </div>

                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>{course.completed_lessons}/{course.total_lessons} lessons</span>
                                                <span>{progressPercent}%</span>
                                            </div>

                                            <button className="btn-primary w-full mt-4 text-sm py-2">
                                                {progressPercent === 100 ? 'Review Course' : 'Continue Learning'}
                                            </button>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {courses.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg mb-4">You haven't enrolled in any courses yet.</p>
                            <Link to="/courses" className="btn-primary">
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default MyCourses;
