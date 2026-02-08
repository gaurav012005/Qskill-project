import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-xl font-heading font-bold text-gradient">
                            EduRoute
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                            Courses
                        </Link>

                        {isAuthenticated() ? (
                            <>
                                {user?.role === 'student' && (
                                    <>
                                        <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/my-courses" className="text-gray-300 hover:text-white transition-colors">
                                            My Courses
                                        </Link>
                                    </>
                                )}

                                {user?.role === 'instructor' && (
                                    <>
                                        <Link to="/instructor" className="text-gray-300 hover:text-white transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/instructor/courses/create" className="text-gray-300 hover:text-white transition-colors">
                                            Create Course
                                        </Link>
                                    </>
                                )}

                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-400">{user?.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-secondary text-sm px-4 py-2"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
