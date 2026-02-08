# 🎯 Project Features - Coding Ninjas Clone

## Overview
This is a **full-stack web application** that clones the Coding Ninjas platform. It combines a **React frontend** with an **Express.js backend** and **SQLite database** to create a complete learning management system.

---

## 🔐 1. User Authentication

### How It Works:
- Users can **register** with email, password, name, and phone
- Users can **login** with email and password
- System uses **JWT (JSON Web Tokens)** for secure authentication
- Passwords are **hashed** using bcrypt before storing in database
- Token is stored in browser's localStorage and sent with every API request

### User Roles:
- **Student** - Can browse and enroll in courses
- **Instructor** - Can create and manage courses
- **Admin** - Full access to manage users, courses, and view analytics

### Features:
✅ Register new account  
✅ Login with credentials  
✅ Logout functionality  
✅ View and update profile  
✅ Automatic login persistence (stays logged in after page refresh)

---

## 📚 2. Course Management

### How It Works:
- Courses are stored in SQLite database with details like title, price, duration, level
- Backend API provides endpoints to create, read, update, and delete courses
- Frontend fetches courses and displays them in a catalog
- Courses are organized by categories (Web Dev, Data Analytics, AI, etc.)

### Features:
✅ Browse all available courses  
✅ Filter courses by category  
✅ Search courses by title/description  
✅ View course details (price, duration, instructor, rating)  
✅ Pagination for large course lists  
✅ Admin/Instructor can add/edit/delete courses

### Sample Courses Included:
- Full Stack Web Development Bootcamp (₹15,999)
- Data Structures & Algorithms (₹12,999)
- Python for Data Analytics (₹10,999)
- Generative AI with ChatGPT (₹18,999)
- React & Next.js Guide (₹13,999)
- System Design for Interviews (₹16,999)

---

## 🎓 3. Course Enrollment System

### How It Works:
- Students can enroll in courses after payment
- Enrollment records are created in database linking user to course
- System tracks enrollment date and progress percentage
- Users can view all their enrolled courses in dashboard

### Features:
✅ Enroll in courses  
✅ View "My Courses" dashboard  
✅ Track course progress (0-100%)  
✅ Update progress as you complete lessons  
✅ Check enrollment status before enrolling  
✅ View enrollment history

---

## 💳 4. Payment System (Mock)

### How It Works:
- **Mock payment gateway** simulates real payment flow
- When user clicks "Enroll", system creates a payment order
- User completes mock payment (always succeeds in demo)
- Payment is verified and enrollment is created
- Transaction history is saved in database

### Features:
✅ Create payment orders  
✅ Mock payment verification  
✅ View payment history  
✅ Transaction tracking with unique IDs  
✅ Payment status (pending/completed/failed)

**Note:** This is a demonstration. In production, you'd integrate real payment gateways like Razorpay or Stripe.

---

## 📝 5. Lead Capture Form

### How It Works:
- Hero section has a form for potential students
- Users fill in name, email, phone, experience level, and interests
- Form submits data to backend API
- Leads are stored in database for admin to review
- Admin can view all leads and contact interested users

### Features:
✅ Capture user information  
✅ Select experience level (Beginner/Intermediate/Advanced)  
✅ Choose topic of interest  
✅ Form validation  
✅ Success feedback after submission  
✅ Admin can view all leads

---

## 👨‍💼 6. Admin Panel

### How It Works:
- Admin users have special permissions
- Can access admin-only API endpoints
- View platform statistics and analytics
- Manage all users and courses
- Access lead submissions

### Features:
✅ View platform statistics (total users, courses, enrollments, revenue)  
✅ Manage users (view, update roles, delete)  
✅ View all enrollments  
✅ Access lead submissions  
✅ User pagination and filtering  
✅ Role management (promote users to instructor/admin)

### Admin Credentials:
- Email: `admin@codingninjas.com`
- Password: `admin123`

---

## 🔒 7. Security Features

### How It Works:
- **Password Hashing**: Passwords are hashed with bcrypt (never stored as plain text)
- **JWT Tokens**: Secure tokens expire after 7 days
- **Protected Routes**: Middleware checks authentication before allowing access
- **Role-Based Access**: Different permissions for students, instructors, and admins
- **Input Validation**: All user inputs are validated before processing
- **Security Headers**: Helmet.js adds security headers to all responses
- **CORS**: Configured to allow frontend-backend communication

### Security Measures:
✅ Bcrypt password hashing (10 salt rounds)  
✅ JWT token authentication  
✅ Protected API endpoints  
✅ Role-based authorization  
✅ Input validation with express-validator  
✅ SQL injection prevention  
✅ XSS protection with Helmet.js  
✅ CORS configuration

---

## 📊 8. Database System

### How It Works:
- Uses **SQLite** - a lightweight, file-based database
- Database file: `backend/database/codingninjas.db`
- Automatically initialized with seed data
- 7 tables store all application data

### Database Tables:
1. **users** - User accounts and profiles
2. **courses** - Course catalog
3. **categories** - Course categories
4. **instructors** - Instructor profiles
5. **enrollments** - User course enrollments
6. **payments** - Payment transactions
7. **leads** - Lead form submissions

### Features:
✅ Automatic database initialization  
✅ Seed data for testing  
✅ Efficient queries with indexes  
✅ Transaction support  
✅ Data persistence

---

## 🎨 9. User Interface

### How It Works:
- Built with **React** and **Tailwind CSS**
- Responsive design works on mobile, tablet, and desktop
- Smooth animations and transitions
- Modal dialogs for login/register
- Loading states and error messages
- User-friendly navigation

### UI Features:
✅ Responsive navbar with user menu  
✅ Hero section with lead form  
✅ Course cards with hover effects  
✅ Login/Register modal  
✅ User dropdown menu  
✅ Loading indicators  
✅ Error messages  
✅ Success notifications  
✅ Smooth animations

---

## 🔄 10. State Management

### How It Works:
- Uses **React Context API** for global state
- **AuthContext** manages user authentication state
- **CourseContext** manages course data
- State persists in localStorage
- Automatic re-renders when state changes

### Contexts:
- **AuthContext**: User login status, profile, login/logout functions
- **CourseContext**: Course list, categories, fetch functions

---

## 🌐 11. API Architecture

### How It Works:
- **RESTful API** with 24 endpoints
- Organized by feature (auth, courses, enrollments, etc.)
- JSON request/response format
- Proper HTTP status codes
- Error handling with meaningful messages

### API Structure:
```
/api/auth/*        - Authentication endpoints
/api/courses/*     - Course management
/api/categories/*  - Category management
/api/enrollments/* - Enrollment system
/api/payments/*    - Payment processing
/api/admin/*       - Admin operations
/api/leads/*       - Lead management
```

---

## 🚀 How Everything Works Together

1. **User visits website** → Frontend loads from React dev server
2. **User clicks Login** → Modal opens with login/register form
3. **User registers** → Frontend sends data to backend API
4. **Backend validates** → Hashes password, creates user in database
5. **Backend responds** → Sends JWT token back to frontend
6. **Frontend stores token** → Saves in localStorage
7. **User browses courses** → Frontend fetches from backend API
8. **User enrolls** → Creates payment → Verifies → Creates enrollment
9. **User views dashboard** → Fetches enrolled courses from API
10. **Admin logs in** → Gets admin role → Can access admin endpoints

---

## 📦 Technology Stack Summary

**Frontend:**
- React 19
- Tailwind CSS
- Axios (API calls)
- React Context API (state)
- Vite (build tool)

**Backend:**
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT (authentication)
- Bcrypt (password hashing)

**Security:**
- Helmet.js
- CORS
- Express-validator
- JWT tokens

---

## 🎯 Key Takeaways

This project demonstrates:
✅ Full-stack development (frontend + backend + database)  
✅ RESTful API design  
✅ Authentication & authorization  
✅ Database design and management  
✅ State management in React  
✅ Security best practices  
✅ Clean code architecture  
✅ User experience design

**Perfect for:** Learning full-stack development, portfolio projects, or as a base for building your own learning platform!
