# EduRoute - Client-Side Routing Project Explanation

## 🎯 Project Overview

**EduRoute** is a full-stack e-learning platform built to demonstrate **advanced client-side routing** using **React Router v6**. The main focus of this project is implementing a sophisticated routing architecture that handles authentication, role-based access control, nested routes, and dynamic URL parameters.

---

## 🚀 Main Feature: Client-Side Routing with React Router DOM

### Why Client-Side Routing?

Traditional websites reload the entire page when navigating between pages. **Client-side routing** allows:
- ✅ **Instant navigation** - No page reloads, faster user experience
- ✅ **Dynamic URLs** - URLs change without server requests
- ✅ **State preservation** - App state persists during navigation
- ✅ **Better UX** - Smooth transitions and animations
- ✅ **SPA benefits** - Single Page Application architecture

---

## 📁 Project Structure

```
project 3/
├── backend/                    # Node.js + Express API
│   ├── routes/                # API endpoints
│   ├── middleware/            # JWT authentication
│   ├── config/                # Database connection
│   └── server.js              # Express server
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── router/
    │   │   └── index.jsx      # 🎯 MAIN ROUTING CONFIGURATION
    │   ├── components/
    │   │   └── auth/
    │   │       ├── ProtectedRoute.jsx   # Authentication guard
    │   │       └── RoleGuard.jsx        # Role-based access
    │   ├── pages/
    │   │   ├── public/        # Public pages (Home, Courses)
    │   │   ├── auth/          # Login, Register
    │   │   ├── student/       # Student dashboard, course player
    │   │   ├── instructor/    # Instructor dashboard
    │   │   └── error/         # 404, 403 pages
    │   └── context/
    │       └── AuthContext.jsx # Authentication state
    └── vite.config.js
```

---

## 🔑 Key Routing Features Implemented

### 1. **Public Routes** (No Authentication Required)
```javascript
// Anyone can access these
/ → Home page
/login → Login page
/register → Registration page
/courses → Course catalog
/courses/:id → Course preview (dynamic ID parameter)
```

### 2. **Protected Routes** (Authentication Required)
```javascript
// Must be logged in to access
/dashboard → Student dashboard
/my-courses → Enrolled courses
/instructor → Instructor dashboard
```

**Implementation:** Uses `<ProtectedRoute>` component that:
- Checks if user is authenticated
- Redirects to `/login` if not authenticated
- Saves intended route for post-login redirect

### 3. **Role-Based Routes** (Specific User Roles)
```javascript
// Student-only routes
/dashboard → Only students can access
/my-courses → Only students can access
/courses/:courseId/learn → Course player (students only)

// Instructor-only routes
/instructor → Only instructors can access
/instructor/courses/create → Only instructors can create courses
/instructor/courses/:id/edit → Only instructors can edit
```

**Implementation:** Uses `<RoleGuard>` component that:
- Checks user's role (student/instructor)
- Redirects to `/unauthorized` if wrong role
- Allows access only to authorized roles

### 4. **Nested Routes** (Parent-Child Routing)
```javascript
/courses/:courseId/learn → Course player layout
  ├── /courses/:courseId/learn/:lessonId → Individual lesson view
  └── /courses/:courseId/quiz → Quiz page
```

**Why Nested Routes?**
- Maintains course player sidebar while switching lessons
- Shares layout between child routes
- URL reflects the hierarchy (course → lesson)

### 5. **Dynamic Route Parameters**
```javascript
/courses/:id → :id is dynamic (e.g., /courses/1, /courses/2)
/courses/:courseId/learn/:lessonId → Multiple parameters
/instructor/courses/:id/edit → Dynamic course editing
```

**Usage in Components:**
```javascript
import { useParams } from 'react-router-dom';

const CoursePlayer = () => {
    const { courseId, lessonId } = useParams();
    // courseId and lessonId extracted from URL
};
```

### 6. **Programmatic Navigation**
```javascript
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        // After successful login
        if (user.role === 'student') {
            navigate('/dashboard');  // Redirect to dashboard
        } else {
            navigate('/instructor');  // Redirect to instructor page
        }
    };
};
```

### 7. **Error Routes**
```javascript
/unauthorized → 403 Access Denied page
/404 → Page not found
/* → Catch-all route redirects to /404
```

---

## 🛠️ Technical Implementation

### Main Router Configuration (`src/router/index.jsx`)

```javascript
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    // Public routes
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    
    // Protected + Role-based routes
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>           {/* Check authentication */}
                <RoleGuard allowedRoles={['student']}>  {/* Check role */}
                    <StudentDashboard />
                </RoleGuard>
            </ProtectedRoute>
        )
    },
    
    // Nested routes
    {
        path: '/courses/:courseId/learn',
        element: <ProtectedRoute><CoursePlayer /></ProtectedRoute>,
        children: [
            { path: ':lessonId', element: <LessonView /> }
        ]
    },
    
    // Error handling
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" /> }
]);
```

### Protected Route Component

```javascript
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    
    if (loading) return <LoadingSpinner />;
    
    if (!isAuthenticated()) {
        // Save current location to redirect after login
        setIntendedRoute(location.pathname);
        return <Navigate to="/login" replace />;
    }
    
    return children;
};
```

### Role Guard Component

```javascript
const RoleGuard = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    
    if (!user) return <Navigate to="/login" />;
    
    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }
    
    return children;
};
```

---

## 🎨 Routing Features Demonstrated

### 1. **URL-Driven Course Player**
- URL: `/courses/1/learn/3`
- Means: Course ID 1, Lesson ID 3
- Sidebar shows all lessons
- Clicking lesson updates URL
- Direct URL access works
- Browser back/forward buttons work

### 2. **Smart Redirects**
- Login redirects based on role (student → dashboard, instructor → instructor page)
- Saves intended route if user tries to access protected page
- After login, redirects to originally intended page

### 3. **Lazy Loading**
```javascript
const Home = lazy(() => import('../pages/public/Home'));
const Dashboard = lazy(() => import('../pages/student/Dashboard'));
```
- Pages load only when needed
- Reduces initial bundle size
- Faster first page load

### 4. **Route Guards**
- Authentication guard (ProtectedRoute)
- Authorization guard (RoleGuard)
- Prevents unauthorized access
- Automatic redirects

---

## 🔄 Navigation Flow Examples

### Example 1: Student Login Flow
```
1. User visits /dashboard (not logged in)
2. ProtectedRoute detects no authentication
3. Saves "/dashboard" as intended route
4. Redirects to /login
5. User logs in successfully
6. Redirects to saved route: /dashboard
7. RoleGuard checks role = "student" ✅
8. Dashboard loads
```

### Example 2: Instructor Trying Student Route
```
1. Instructor logged in, visits /dashboard
2. ProtectedRoute: Authenticated ✅
3. RoleGuard: Role = "instructor", Allowed = ["student"] ❌
4. Redirects to /unauthorized (403 page)
```

### Example 3: Course Player Navigation
```
1. Student clicks "Learn" on course
2. Navigate to /courses/1/learn
3. CoursePlayer component loads
4. Fetches lessons for course ID 1
5. Auto-redirects to first lesson: /courses/1/learn/1
6. LessonView renders inside CoursePlayer (nested route)
7. Clicking next lesson updates URL to /courses/1/learn/2
8. Only LessonView re-renders, CoursePlayer stays mounted
```

---

## 📊 Routing Architecture Benefits

### 1. **Separation of Concerns**
- Public routes separate from protected routes
- Student routes separate from instructor routes
- Clear route hierarchy

### 2. **Reusability**
- ProtectedRoute used for all authenticated pages
- RoleGuard reused with different role configurations
- Layout components shared via nested routes

### 3. **Maintainability**
- All routes in one configuration file
- Easy to add new routes
- Clear route structure

### 4. **User Experience**
- Fast navigation (no page reloads)
- Smooth transitions
- Browser history works correctly
- Bookmarkable URLs

### 5. **Security**
- Route-level authentication
- Role-based access control
- Automatic redirects for unauthorized access

---

## 🎯 Key Technologies Used

| Technology | Purpose |
|------------|---------|
| **React Router v6** | Client-side routing |
| **React Context API** | Authentication state management |
| **React Hooks** | useNavigate, useParams, useLocation |
| **Lazy Loading** | Code splitting for routes |
| **Protected Routes** | Authentication guards |
| **Role Guards** | Authorization guards |

---

## 📝 Summary

This project demonstrates **professional-grade client-side routing** with:

✅ **Public, Protected, and Role-Based Routes**  
✅ **Nested Routes** for complex layouts  
✅ **Dynamic URL Parameters** for data-driven pages  
✅ **Programmatic Navigation** based on user actions  
✅ **Route Guards** for security  
✅ **Error Handling** with 404 and 403 pages  
✅ **Lazy Loading** for performance  
✅ **Smart Redirects** for better UX  

The routing architecture makes this a **Single Page Application (SPA)** with the feel of a multi-page website, providing instant navigation while maintaining clean, bookmarkable URLs.

---

## 🚀 Running the Project

**Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

**Demo Accounts:**
- Student: `student@eduroute.com` / `password123`
- Instructor: `instructor@eduroute.com` / `password123`

---

**This project showcases how React Router DOM enables building complex, multi-page-like experiences within a Single Page Application!** 🎉
