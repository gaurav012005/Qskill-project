import React, { useState } from 'react';
import loginLogo from '../assets/login-logo.png';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let result;
            if (isRegisterMode) {
                result = await register({ email, password, name, phone });
            } else {
                result = await login(email, password);
            }

            if (result.success) {
                onClose();
                setEmail('');
                setPassword('');
                setName('');
                setPhone('');
            } else {
                setError(result.error || 'Authentication failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthLogin = (provider) => {
        // Mock OAuth - in production, implement real OAuth flow
        setError(`${provider} login will be available soon!`);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center md:items-start md:justify-end md:p-0"
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full max-w-[400px] h-full md:h-auto md:max-h-screen md:min-h-screen md:w-[450px] p-8 shadow-2xl relative animate-slide-in-right flex flex-col overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <img src={loginLogo} alt="Coding Ninjas" className="h-12 md:h-14 object-contain" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 font-bold text-sm flex items-center transition"
                    >
                        Close <span className="text-xl ml-2 font-light text-gray-400">&times;</span>
                    </button>
                </div>

                {/* Toggle between Login/Register */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => { setIsRegisterMode(false); setError(''); }}
                        className={`flex-1 py-2 font-bold transition ${!isRegisterMode ? 'text-ninja-orange border-b-2 border-ninja-orange' : 'text-gray-400'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => { setIsRegisterMode(true); setError(''); }}
                        className={`flex-1 py-2 font-bold transition ${isRegisterMode ? 'text-ninja-orange border-b-2 border-ninja-orange' : 'text-gray-400'}`}
                    >
                        Register
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Body */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {isRegisterMode ? 'Create Account' : 'Login with'}
                </h2>

                <div className="space-y-4 mb-6">
                    <button
                        onClick={() => handleOAuthLogin('Google')}
                        className="w-full flex items-center justify-center space-x-3 border-2 border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-6 h-6" />
                        <span>Google</span>
                    </button>

                    <button
                        onClick={() => handleOAuthLogin('Naukri')}
                        className="w-full flex items-center justify-center space-x-3 border-2 border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                        <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs font-serif italic">N</div>
                        <span>Naukri</span>
                    </button>
                </div>

                <div className="relative flex py-5 items-center mb-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegisterMode && (
                        <>
                            <div>
                                <label className="block text-xs font-bold text-ninja-orange mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-ninja-orange mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-ninja-orange mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-ninja-orange mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email || !password || (isRegisterMode && !name)}
                        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition bg-ninja-orange text-white hover:bg-orange-600 ${(loading || !email || !password || (isRegisterMode && !name)) ? 'opacity-50 cursor-not-allowed' : 'shadow-lg shadow-ninja-orange/30'}`}
                    >
                        <span>{loading ? 'Please wait...' : (isRegisterMode ? 'Create Account' : 'Continue')}</span>
                        {!loading && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default LoginModal;

