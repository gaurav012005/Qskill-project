import React, { createContext, useState, useContext, useEffect } from 'react';
import { coursesAPI, categoriesAPI } from '../services/api';

const CourseContext = createContext(null);

export const useCourses = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourses must be used within CourseProvider');
    }
    return context;
};

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all courses
    const fetchCourses = async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await coursesAPI.getAll(filters);
            setCourses(response.data.courses);
            return response.data;
        } catch (err) {
            setError(err.error || 'Failed to fetch courses');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fetch single course
    const fetchCourse = async (id) => {
        try {
            setLoading(true);
            const response = await coursesAPI.getById(id);
            return response.data;
        } catch (err) {
            setError(err.error || 'Failed to fetch course');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            setCategories(response.data);
            return response.data;
        } catch (err) {
            setError(err.error || 'Failed to fetch categories');
            return null;
        }
    };

    // Load courses and categories on mount
    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);

    const value = {
        courses,
        categories,
        loading,
        error,
        fetchCourses,
        fetchCourse,
        fetchCategories,
    };

    return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
