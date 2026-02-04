import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const result = await register(formData.email, formData.password, formData.name, formData.role);

        if (result.success) {
            if (result.user.role === 'student') {
                navigate('/dashboard');
            } else {
                navigate('/instructor');
            }
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <motion.div
            {...pageTransition}
            className="min-h-screen flex items-center justify-center px-4 py-12"
        >
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-6">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto glow">
                            <span className="text-white font-bold text-2xl">E</span>
                        </div>
                    </Link>
                    <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
                        Join EduRoute
                    </h1>
                    <p className="text-gray-400">Start your learning journey today</p>
                </div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="glass-card rounded-2xl p-8 space-y-6"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-error/10 border border-error/50 rounded-lg p-4 text-error text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            I want to:
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.label
                                className={`glass-card p-4 rounded-lg cursor-pointer transition-all ${formData.role === 'student' ? 'ring-2 ring-primary' : ''
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={formData.role === 'student'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🎓</div>
                                    <div className="font-medium text-white">Learn</div>
                                    <div className="text-xs text-gray-400">As a Student</div>
                                </div>
                            </motion.label>

                            <motion.label
                                className={`glass-card p-4 rounded-lg cursor-pointer transition-all ${formData.role === 'instructor' ? 'ring-2 ring-primary' : ''
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="instructor"
                                    checked={formData.role === 'instructor'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className="text-center">
                                    <div className="text-2xl mb-2">👨‍🏫</div>
                                    <div className="font-medium text-white">Teach</div>
                                    <div className="text-xs text-gray-400">As an Instructor</div>
                                </div>
                            </motion.label>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </motion.button>

                    <div className="text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-light transition-colors">
                            Sign in
                        </Link>
                    </div>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default Register;
