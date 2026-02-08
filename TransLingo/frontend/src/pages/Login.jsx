import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const onSubmit = async (data) => {
        setIsLoading(true);
        setServerError(''); // Clear previous errors
        const result = await login(data.email, data.password);
        setIsLoading(false);

        if (result.success) {
            navigate('/translate');
        } else if (result.error) {
            setServerError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {/* Visme-Style Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-10 text-center">
                        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <span className="text-4xl">🌍</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-purple-100">
                            Sign in to continue translating
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-6">
                        {/* Email Field - Visme Style */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                autoComplete="email"
                                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-200"
                                placeholder="you@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email'
                                    }
                                })}
                            />
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-sm text-red-600 flex items-center"
                                >
                                    <span className="mr-1">⚠️</span>
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                autoComplete="current-password"
                                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-200"
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-sm text-red-600 flex items-center"
                                >
                                    <span className="mr-1">⚠️</span>
                                    {errors.password.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Server Error Display */}
                        {serverError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg"
                            >
                                <p className="text-sm text-red-700 flex items-center font-medium">
                                    <span className="mr-2 text-xl">⚠️</span>
                                    {serverError}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button - Visme Style */}
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </motion.button>

                        {/* Register Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-bold text-purple-600 hover:text-purple-700 transition-colors"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl mb-1">🚀</div>
                                <p className="text-xs font-medium text-gray-600">Fast</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">🔒</div>
                                <p className="text-xs font-medium text-gray-600">Secure</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">⭐</div>
                                <p className="text-xs font-medium text-gray-600">Reliable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
