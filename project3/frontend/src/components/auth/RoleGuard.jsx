import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleGuard = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        console.log('RoleGuard: No user found, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    console.log('RoleGuard: User role:', user.role, 'Allowed roles:', allowedRoles);

    if (!allowedRoles.includes(user.role)) {
        console.log('RoleGuard: Access denied - user role not in allowed roles');
        return <Navigate to="/unauthorized" replace />;
    }

    console.log('RoleGuard: Access granted');
    return children;
};

export default RoleGuard;
