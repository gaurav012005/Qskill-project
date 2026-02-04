import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '../../utils/animations';

const Home = () => {
    return (
        <>
            <Navbar />
            <motion.div {...pageTransition} className="min-h-screen pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="text-center max-w-4xl mx-auto"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            <motion.h1
                                variants={staggerItem}
                                className="text-6xl md:text-7xl font-heading font-bold mb-6"
                            >
                                <span className="text-gradient">Learn Without Limits</span>
                            </motion.h1>
                            <motion.p
                                variants={staggerItem}
                                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                            >
                                Discover thousands of courses, build new skills, and advance your career with EduRoute's routing-first learning platform.
                            </motion.p>
                            <motion.div
                                variants={staggerItem}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link to="/courses" className="btn-primary px-8 py-4 text-lg">
                                    Explore Courses
                                </Link>
                                <Link to="/register" className="btn-secondary px-8 py-4 text-lg">
                                    Get Started Free
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Animated Background */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-gradient">
                            Why Choose EduRoute?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: '🚀',
                                    title: 'Routing-First Architecture',
                                    description: 'Seamless navigation with URL-driven learning flow and progress tracking'
                                },
                                {
                                    icon: '🎯',
                                    title: 'Role-Based Access',
                                    description: 'Dedicated dashboards for students and instructors with protected routes'
                                },
                                {
                                    icon: '📊',
                                    title: 'Progress Tracking',
                                    description: 'Track your learning journey with route-synced progress indicators'
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="glass-card p-8 rounded-2xl text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-5xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </motion.div>
        </>
    );
};

export default Home;
