import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import RoleGuard from '../components/auth/RoleGuard';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('../pages/public/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Courses = lazy(() => import('../pages/public/Courses'));
const CoursePreview = lazy(() => import('../pages/public/CoursePreview'));

const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const MyCourses = lazy(() => import('../pages/student/MyCourses'));
const CoursePlayer = lazy(() => import('../pages/student/CoursePlayer'));
const LessonView = lazy(() => import('../pages/student/LessonView'));
const Quiz = lazy(() => import('../pages/student/Quiz'));

const InstructorDashboard = lazy(() => import('../pages/instructor/InstructorDashboard'));
const CreateCourse = lazy(() => import('../pages/instructor/CreateCourse'));
const EditCourse = lazy(() => import('../pages/instructor/EditCourse'));
const Students = lazy(() => import('../pages/instructor/Students'));

const NotFound = lazy(() => import('../pages/error/NotFound'));
const Unauthorized = lazy(() => import('../pages/error/Unauthorized'));

// Wrapper for lazy loaded components
const LazyLoad = ({ children }) => (
    <Suspense fallback={<LoadingSpinner />}>
        {children}
    </Suspense>
);

const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <LazyLoad><Home /></LazyLoad>,
    },
    {
        path: '/login',
        element: <LazyLoad><Login /></LazyLoad>,
    },
    {
        path: '/register',
        element: <LazyLoad><Register /></LazyLoad>,
    },
    {
        path: '/courses',
        element: <LazyLoad><Courses /></LazyLoad>,
    },
    {
        path: '/courses/:id',
        element: <LazyLoad><CoursePreview /></LazyLoad>,
    },

    // Student routes
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['student']}>
                    <LazyLoad><StudentDashboard /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/my-courses',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['student']}>
                    <LazyLoad><MyCourses /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/courses/:courseId/learn',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['student']}>
                    <LazyLoad><CoursePlayer /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
        children: [
            {
                path: ':lessonId',
                element: <LazyLoad><LessonView /></LazyLoad>,
            },
        ],
    },
    {
        path: '/courses/:courseId/quiz',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['student']}>
                    <LazyLoad><Quiz /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },

    // Instructor routes
    {
        path: '/instructor',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['instructor']}>
                    <LazyLoad><InstructorDashboard /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/instructor/courses/create',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['instructor']}>
                    <LazyLoad><CreateCourse /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/instructor/courses/:id/edit',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['instructor']}>
                    <LazyLoad><EditCourse /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/instructor/courses/:id/students',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['instructor']}>
                    <LazyLoad><Students /></LazyLoad>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },

    // Error routes
    {
        path: '/unauthorized',
        element: <LazyLoad><Unauthorized /></LazyLoad>,
    },
    {
        path: '/404',
        element: <LazyLoad><NotFound /></LazyLoad>,
    },
    {
        path: '*',
        element: <Navigate to="/404" replace />,
    },
]);

export default router;
