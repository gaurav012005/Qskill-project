import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = ({ isLoggedIn, userName, onLoginClick, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

    return (
        <nav className="bg-white py-0 px-2 md:px-3 flex justify-center items-center sticky top-0 z-50 shadow-sm relative">
            <div className="flex items-center space-x-3">
                {/* Logo matching the screenshot mascot + name */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                        src={logo}
                        alt="Coding Ninjas Logo"
                        className="w-[140px] md:w-[160px] h-auto object-contain"
                    />
                </div>

                {/* Links with dropdown icons */}
                <div className="hidden md:flex items-center space-x-2 text-[15px] font-semibold text-gray-700">
                    <div className="flex items-center cursor-pointer hover:text-ninja-orange transition-colors">
                        For working professionals
                        <svg className="w-4 h-4 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div className="flex items-center cursor-pointer hover:text-ninja-orange transition-colors">
                        For College Students
                        <svg className="w-4 h-4 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            <div className="absolute right-2 md:right-3 top-0 h-full flex items-center space-x-2">
                {isLoggedIn ? (
                    <div className="relative">
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm cursor-pointer hover:ring-2 ring-ninja-orange/50 transition-all select-none"
                        >
                            {userInitial}
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 top-10 bg-white shadow-xl rounded-xl w-56 py-2 border border-gray-100 animate-fade-in-down transform origin-top-right">
                                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Signed in as</p>
                                    <p className="text-sm font-black text-gray-800 truncate">{userName || 'User'}</p>
                                </div>
                                <div className="py-1">
                                    <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-ninja-orange flex items-center transition">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        My Profile
                                    </button>
                                </div>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center transition"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="bg-ninja-orange text-white px-6 py-2.5 rounded-xl font-black hover:bg-orange-600 transition shadow-xl shadow-ninja-orange/30 text-lg active:scale-95 duration-200"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
