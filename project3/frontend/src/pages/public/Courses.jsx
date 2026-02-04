import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '../../utils/animations';
import api from '../../utils/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses');
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
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
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-heading font-bold text-gradient mb-4">
                            Explore Courses
                        </h1>
                        <p className="text-xl text-gray-400">
                            Discover your next learning adventure
                        </p>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                variants={staggerItem}
                                custom={index}
                            >
                                <Link to={`/courses/${course.id}`}>
                                    <div className="glass-card rounded-2xl overflow-hidden h-full hover:scale-105 transition-transform">
                                        <div className="h-48 bg-gradient-primary flex items-center justify-center">
                                            <span className="text-6xl">📚</span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-heading font-semibold mb-2">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>👨‍🏫 {course.instructor_name}</span>
                                                <span>📖 {course.lesson_count} lessons</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {courses.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No courses available yet.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default Courses;
