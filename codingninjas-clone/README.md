# 🚀 Coding Ninjas Clone - Full Stack Application

A complete full-stack clone of the Coding Ninjas platform built with **React** (frontend) and **Express.js + SQLite** (backend). This project features user authentication, course management, enrollment system, and payment integration.

## ✨ Features

### Frontend
- 🎨 **Pixel-perfect UI** - Exact replica of Coding Ninjas design
- 🔐 **Authentication** - Login/Register with JWT tokens
- 📚 **Course Catalog** - Browse courses with filtering and search
- 💳 **Mock Payment** - Simulated payment gateway
- 👤 **User Dashboard** - Track enrolled courses and progress
- 📱 **Responsive Design** - Works on all devices

### Backend
- ⚡ **Express.js API** - RESTful API with proper error handling
- 🗄️ **SQLite Database** - Lightweight, file-based database
- 🔒 **JWT Authentication** - Secure token-based auth
- 👥 **User Management** - Register, login, profile management
- 📖 **Course Management** - CRUD operations for courses
- 📊 **Enrollment System** - Course enrollment with progress tracking
- 💰 **Payment System** - Mock payment gateway
- 👨‍💼 **Admin Panel** - User management and analytics
- 🎯 **Lead Management** - Capture leads from hero form

## 🛠️ Tech Stack

### Frontend
- React 19
- Axios (API calls)
- React Router DOM (routing)
- Tailwind CSS (styling)
- Vite (build tool)

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- Bcrypt (password hashing)
- Helmet (security)
- Morgan (logging)
- CORS

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
cd coding-ninjas-clone
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Initialize database with seed data
npm run init-db

# Start backend server
npm run dev
```

The backend server will start on **http://localhost:5000**

**Default Admin Credentials:**
- Email: `admin@codingninjas.com`
- Password: `admin123`

**Default Instructor Credentials:**
- Email: `instructor@codingninjas.com`
- Password: `instructor123`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to project root (if in backend directory)
cd ..

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will start on **http://localhost:5173**

## 🎯 Usage

### For Students

1. **Register/Login**
   - Click "Login" button in navbar
   - Toggle to "Register" tab
   - Fill in your details (name, email, phone, password)
   - Click "Create Account"

2. **Browse Courses**
   - Scroll through the homepage to see course offerings
   - View course details, pricing, and instructors

3. **Enroll in Courses**
   - Click on a course
   - Complete mock payment
   - Access course from your dashboard

4. **Submit Lead Form**
   - Fill out the hero form on homepage
   - Select your experience level and interests
   - Submit to receive course recommendations

### For Admins

1. **Login with Admin Credentials**
   - Use admin@codingninjas.com / admin123

2. **Access Admin Panel**
   - View platform statistics
   - Manage users
   - View all enrollments
   - Access lead submissions

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (admin/instructor)
- `PUT /api/courses/:id` - Update course (admin/instructor)
- `DELETE /api/courses/:id` - Delete course (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course (protected)
- `GET /api/enrollments/my-courses` - Get user's courses (protected)
- `PUT /api/enrollments/:id/progress` - Update progress (protected)
- `GET /api/enrollments/check/:courseId` - Check enrollment status (protected)

### Payments
- `POST /api/payments/create-order` - Create payment order (protected)
- `POST /api/payments/verify` - Verify payment (protected)
- `GET /api/payments/history` - Get payment history (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/stats` - Get platform statistics (admin)
- `PUT /api/admin/users/:id/role` - Update user role (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)

### Leads
- `POST /api/leads` - Submit lead form (public)
- `GET /api/leads` - Get all leads (admin)

## 🗂️ Project Structure

```
coding-ninjas-clone/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── courseController.js  # Course management
│   │   ├── enrollmentController.js
│   │   ├── paymentController.js
│   │   ├── adminController.js
│   │   ├── categoryController.js
│   │   └── leadController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Request validation
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   ├── payments.js
│   │   ├── admin.js
│   │   ├── categories.js
│   │   └── leads.js
│   ├── scripts/
│   │   └── initDatabase.js      # DB initialization
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   ├── database/
│   │   └── codingninjas.db      # SQLite database
│   ├── .env                     # Environment variables
│   ├── server.js                # Express app entry
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── LoginModal.jsx
│   │   ├── WorkingProfessionals.jsx
│   │   ├── CollegeStudentCourses.jsx
│   │   └── ... (other components)
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── CourseContext.jsx    # Course data state
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention

## 🎨 UI/UX Features

- ✅ Responsive design
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ User feedback
- ✅ Dropdown menus
- ✅ Modal dialogs

## 📊 Database Schema

### Users
- id, email, password_hash, name, phone, role, created_at, updated_at

### Courses
- id, title, description, category_id, instructor_id, price, duration, level, image_url, status, enrollment_count, rating, created_at, updated_at

### Categories
- id, name, description, icon, created_at

### Instructors
- id, user_id, bio, expertise, rating, students_taught, created_at

### Enrollments
- id, user_id, course_id, enrolled_at, status, progress_percentage, completed_at

### Payments
- id, user_id, course_id, amount, status, payment_method, transaction_id, created_at

### Leads
- id, name, email, phone, experience, interest, created_at

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] JWT token persists across page refreshes
- [ ] Courses load from database
- [ ] Course filtering works
- [ ] Enrollment process completes
- [ ] Payment flow works
- [ ] User dashboard shows enrolled courses
- [ ] Admin can access admin panel
- [ ] Lead form submits successfully

### API Testing with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User","phone":"1234567890"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get courses
curl http://localhost:5000/api/courses
```

## 🚧 Future Enhancements

- [ ] Real OAuth integration (Google, LinkedIn)
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] Video streaming for courses
- [ ] Course reviews and ratings
- [ ] Discussion forums
- [ ] Certificates on completion
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Redis caching
- [ ] PostgreSQL migration for production

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 5000 is not in use
- Check if database was initialized: `npm run init-db`
- Verify .env file exists in backend directory

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration in backend/server.js
- Verify API base URL in src/services/api.js

### Database errors
- Delete database/codingninjas.db and run `npm run init-db` again
- Check file permissions on database directory

## 📝 License

This project is for educational purposes only.

## 👨‍💻 Author

Built as a full-stack demonstration project.

## 🙏 Acknowledgments

- Design inspired by Coding Ninjas
- Icons from Heroicons
- Images from Unsplash

---

**Happy Coding! 🚀**
