# 🚀 EduRoute - Advanced E-Learning Platform

A routing-first e-learning platform built with React, Node.js, Express, and MySQL. Features advanced UI/UX with glassmorphism, animations, and comprehensive routing architecture.

## ✨ Features

### 🔑 Authentication & Access
- JWT-based authentication
- Role-based access control (Student/Instructor)
- Protected routes with auto-redirect
- Token expiry handling

### 📚 Course Management
- Public course catalog
- Course enrollment system
- Dynamic course player with nested routes
- Lesson navigation with URL sync
- Progress tracking

### 🎯 Student Features
- Personal dashboard
- Enrolled courses view
- Course player with lesson navigation
- Progress tracking
- Quiz system

### 👨‍🏫 Instructor Features
- Instructor dashboard
- Create and manage courses
- Add/edit lessons
- View enrolled students
- Quiz creation

### 🎨 Advanced UI/UX
- Glassmorphism effects
- Framer Motion animations
- Gradient backgrounds
- Responsive design
- Dark mode
- Loading states
- Error boundaries

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository

```bash
cd "c:/6 sem/intership/Qskill/project 3"
```

### 2. Database Setup

1. Start MySQL server
2. Create database and import schema:

```bash
mysql -u root -p < backend/schema.sql
```

Or manually:
```sql
CREATE DATABASE eduroute;
USE eduroute;
-- Then copy and paste the contents of backend/schema.sql
```

### 3. Backend Setup

```bash
cd backend
npm install

# Configure environment variables
# Edit .env file with your MySQL credentials:
# DB_PASSWORD=your_mysql_password

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd ../frontend
npm install

# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 Demo Accounts

### Student Account
- **Email:** student@eduroute.com
- **Password:** password123

### Instructor Account
- **Email:** instructor@eduroute.com
- **Password:** password123

## 📁 Project Structure

```
project 3/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── courses.js            # Course CRUD
│   │   ├── lessons.js            # Lesson management
│   │   ├── enrollments.js        # Enrollment handling
│   │   ├── progress.js           # Progress tracking
│   │   └── quizzes.js            # Quiz system
│   ├── .env                      # Environment variables
│   ├── schema.sql                # Database schema
│   ├── server.js                 # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   └── RoleGuard.jsx
    │   │   ├── common/
    │   │   │   └── LoadingSpinner.jsx
    │   │   └── layout/
    │   │       └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Auth state management
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── public/
    │   │   │   ├── Home.jsx
    │   │   │   ├── Courses.jsx
    │   │   │   └── CoursePreview.jsx
    │   │   ├── student/
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── MyCourses.jsx
    │   │   │   ├── CoursePlayer.jsx
    │   │   │   ├── LessonView.jsx
    │   │   │   └── Quiz.jsx
    │   │   ├── instructor/
    │   │   │   ├── InstructorDashboard.jsx
    │   │   │   ├── CreateCourse.jsx
    │   │   │   ├── EditCourse.jsx
    │   │   │   └── Students.jsx
    │   │   └── error/
    │   │       ├── NotFound.jsx
    │   │       └── Unauthorized.jsx
    │   ├── router/
    │   │   └── index.jsx          # Route configuration
    │   ├── utils/
    │   │   ├── api.js             # Axios instance
    │   │   └── animations.js      # Framer Motion variants
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css              # Tailwind + custom styles
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## 🎯 Routing Architecture

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/courses` - Course catalog
- `/courses/:id` - Course preview

### Student Routes (Protected)
- `/dashboard` - Student dashboard
- `/my-courses` - Enrolled courses
- `/courses/:courseId/learn` - Course player layout
- `/courses/:courseId/learn/:lessonId` - Individual lesson
- `/courses/:courseId/quiz` - Course quiz

### Instructor Routes (Protected)
- `/instructor` - Instructor dashboard
- `/instructor/courses/create` - Create new course
- `/instructor/courses/:id/edit` - Edit course
- `/instructor/courses/:id/students` - View students

### Error Routes
- `/unauthorized` - Access denied page
- `/404` - Not found page

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (instructor)
- `PUT /api/courses/:id` - Update course (instructor)
- `DELETE /api/courses/:id` - Delete course (instructor)

### Lessons
- `GET /api/lessons/course/:courseId` - Get course lessons
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons` - Create lesson (instructor)
- `PUT /api/lessons/:id` - Update lesson (instructor)
- `DELETE /api/lessons/:id` - Delete lesson (instructor)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/my-courses` - Get enrolled courses
- `GET /api/enrollments/course/:courseId/students` - Get students (instructor)
- `PUT /api/enrollments/course/:courseId/last-lesson` - Update last lesson

### Progress
- `GET /api/progress/course/:courseId` - Get course progress
- `POST /api/progress/lesson/:lessonId/complete` - Mark lesson complete
- `GET /api/progress/course/:courseId/next-lesson` - Get next lesson

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get course quiz
- `POST /api/quizzes/:quizId/submit` - Submit quiz
- `POST /api/quizzes` - Create quiz (instructor)

## 🎨 Design System

### Colors
- Primary: `hsl(250, 84%, 54%)` - Purple
- Secondary: `hsl(340, 82%, 52%)` - Pink
- Accent: `hsl(180, 77%, 47%)` - Cyan
- Success: `hsl(142, 76%, 36%)` - Green
- Warning: `hsl(38, 92%, 50%)` - Orange
- Error: `hsl(0, 84%, 60%)` - Red

### Typography
- Headings: Poppins
- Body: Inter
- Mono: Space Mono

### Components
- Glass cards with backdrop blur
- Gradient buttons
- Animated transitions
- Loading states
- Progress bars

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=eduroute
DB_PORT=3306
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check credentials in `backend/.env`
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Vite will prompt for alternative port

### CORS Issues
- Backend already configured for CORS
- Check API_URL in frontend

## 📚 Next Steps

To complete the implementation:

1. **Create remaining page components** (templates provided in router)
2. **Add course player functionality** with nested routing
3. **Implement quiz system** with question rendering
4. **Add instructor course management** UI
5. **Enhance error handling** and loading states
6. **Add form validation** for all inputs
7. **Implement breadcrumb navigation**
8. **Add scroll restoration** for lessons
9. **Create walkthrough documentation**

## 🤝 Contributing

This is an internship project. For questions or issues, contact the development team.

## 📄 License

This project is part of an internship program.

---

**Built with ❤️ using React, Node.js, and MySQL**
