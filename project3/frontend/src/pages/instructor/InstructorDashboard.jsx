import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
    return (
        <>
            <Navbar />
            <motion.div {...pageTransition} className="min-h-screen pt-24 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-gradient mb-8">
                        Instructor Dashboard
                    </h1>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 rounded-xl">
                            <div className="text-4xl mb-2">📚</div>
                            <h3 className="text-2xl font-bold mb-1">My Courses</h3>
                            <p className="text-gray-400 mb-4">Manage your courses</p>
                            <Link to="/instructor" className="btn-primary inline-block text-sm px-4 py-2">
                                View Courses
                            </Link>
                        </div>

                        <div className="glass-card p-6 rounded-xl">
                            <div className="text-4xl mb-2">➕</div>
                            <h3 className="text-2xl font-bold mb-1">Create Course</h3>
                            <p className="text-gray-400 mb-4">Start a new course</p>
                            <Link to="/instructor/courses/create" className="btn-primary inline-block text-sm px-4 py-2">
                                Create Course
                            </Link>
                        </div>

                        <div className="glass-card p-6 rounded-xl">
                            <div className="text-4xl mb-2">👥</div>
                            <h3 className="text-2xl font-bold mb-1">Students</h3>
                            <p className="text-gray-400 mb-4">View your students</p>
                            <Link to="/instructor" className="btn-primary inline-block text-sm px-4 py-2">
                                View Students
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default InstructorDashboard;
