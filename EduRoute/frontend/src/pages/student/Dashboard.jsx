import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <motion.div {...pageTransition} className="min-h-screen pt-24 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-gradient mb-8">
                        Student Dashboard
                    </h1>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="glass-card p-6 rounded-xl">
                            <div className="text-4xl mb-2">📚</div>
                            <h3 className="text-2xl font-bold mb-1">My Courses</h3>
                            <p className="text-gray-400">View your enrolled courses</p>
                            <Link to="/my-courses" className="btn-primary mt-4 inline-block text-sm px-4 py-2">
                                View Courses
                            </Link>
                        </div>

                        <div className="glass-card p-6 rounded-xl">
                            <div className="text-4xl mb-2">🔍</div>
                            <h3 className="text-2xl font-bold mb-1">Explore</h3>
                            <p className="text-gray-400">Discover new courses</p>
                            <Link to="/courses" className="btn-primary mt-4 inline-block text-sm px-4 py-2">
                                Browse Catalog
                            </Link>
                        </div>

                        <div className="glass-card p-6 rounded-xl">
                            <div className="text-4xl mb-2">📊</div>
                            <h3 className="text-2xl font-bold mb-1">Progress</h3>
                            <p className="text-gray-400">Track your learning</p>
                            <Link to="/my-courses" className="btn-primary mt-4 inline-block text-sm px-4 py-2">
                                View Progress
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Dashboard;
