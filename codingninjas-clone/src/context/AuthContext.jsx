import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.login({ email, password });

            const { user: userData, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            return { success: true };
        } catch (err) {
            const errorMessage = err.error || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);

            const { user: newUser, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            return { success: true };
        } catch (err) {
            const errorMessage = err.error || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            const response = await authAPI.updateProfile(userData);
            const updatedUser = response.data;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            return { success: true };
        } catch (err) {
            return { success: false, error: err.error || 'Update failed' };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
