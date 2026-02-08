# EduRoute Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Database Setup

1. **Start MySQL Server**
   - Open MySQL Workbench or command line
   - Ensure MySQL is running

2. **Create Database**
   ```bash
   mysql -u root -p
   ```
   
   Then run:
   ```sql
   CREATE DATABASE eduroute;
   USE eduroute;
   ```

3. **Import Schema**
   - Copy the contents of `backend/schema.sql`
   - Paste and execute in MySQL

   **OR** use command line:
   ```bash
   mysql -u root -p eduroute < backend/schema.sql
   ```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies (if not already done)
npm install

# Configure environment
# Open .env file and set your MySQL password:
# DB_PASSWORD=your_mysql_password

# Start backend server
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open new terminal
# Navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

✅ Frontend should be running on `http://localhost:5173`

### Step 4: Test the Application

1. **Open Browser**: Navigate to `http://localhost:5173`

2. **Login with Demo Account**:
   - Email: `student@eduroute.com`
   - Password: `password123`

3. **Explore Features**:
   - View courses catalog
   - Enroll in a course
   - Navigate through lessons
   - Mark lessons complete
   - Take quiz

---

## 🎯 Quick Feature Tour

### As a Student:

1. **Dashboard** (`/dashboard`)
   - View quick actions
   - Access enrolled courses

2. **Course Catalog** (`/courses`)
   - Browse available courses
   - View course details

3. **Course Player** (`/courses/:id/learn`)
   - Navigate lessons via sidebar
   - Track progress
   - Complete lessons
   - Take quiz

### As an Instructor:

1. Login with: `instructor@eduroute.com` / `password123`

2. **Instructor Dashboard** (`/instructor`)
   - View your courses
   - Create new courses
   - Manage students

---

## 🔧 Troubleshooting

### Database Connection Error

**Error**: `ER_ACCESS_DENIED_ERROR` or `ECONNREFUSED`

**Solution**:
1. Check MySQL is running
2. Verify credentials in `backend/.env`
3. Test connection:
   ```bash
   mysql -u root -p
   ```

### Port Already in Use

**Backend (Port 5000)**:
- Change `PORT` in `backend/.env`

**Frontend (Port 5173)**:
- Vite will automatically suggest alternative port
- Or press `y` when prompted

### CORS Errors

**Solution**: Backend already configured for CORS. Ensure:
- Backend is running on port 5000
- Frontend is making requests to `http://localhost:5000/api`

### Module Not Found

**Solution**:
```bash
# In backend
cd backend
rm -rf node_modules
npm install

# In frontend
cd frontend
rm -rf node_modules
npm install
```

---

## 📱 Testing Checklist

### Authentication
- [ ] Register new account
- [ ] Login with demo account
- [ ] Logout
- [ ] Token persistence (refresh page)
- [ ] Auto-redirect after login

### Routing
- [ ] Navigate to all public routes
- [ ] Try accessing protected routes without login
- [ ] Test role-based access (student vs instructor)
- [ ] Test 404 page
- [ ] Test unauthorized page

### Course Player
- [ ] Enroll in course
- [ ] Navigate through lessons
- [ ] Mark lessons complete
- [ ] Progress bar updates
- [ ] Resume from last lesson
- [ ] Take quiz
- [ ] View results

### Edge Cases
- [ ] Invalid course ID
- [ ] Direct URL to lesson
- [ ] Refresh during course
- [ ] Back button navigation
- [ ] Token expiry

---

## 🎨 Key Features to Notice

### 1. Glassmorphism Design
- Transparent cards with backdrop blur
- Subtle borders and shadows
- Premium, modern aesthetic

### 2. Smooth Animations
- Page transitions
- Button hover effects
- Progress bar animations
- Loading states

### 3. Routing Architecture
- URL-driven course player
- Nested routes for lessons
- Protected routes with guards
- Role-based access control

### 4. Progress Tracking
- Real-time progress updates
- Visual progress indicators
- Resume learning functionality

---

## 📚 Sample Data

The database includes:

**Users**:
- Student: `student@eduroute.com`
- Instructor: `instructor@eduroute.com`
- Password for both: `password123`

**Courses**:
1. Introduction to Web Development (4 lessons)
2. Advanced React Patterns (3 lessons)

**Quiz**:
- Web Development Fundamentals Quiz (3 questions)

---

## 🚀 Next Steps

After testing the basic functionality:

1. **Create Your Own Course** (as instructor)
2. **Enroll in Multiple Courses** (as student)
3. **Complete All Lessons** in a course
4. **Take the Quiz** and view results
5. **Test Edge Cases** (invalid URLs, etc.)

---

## 📞 Need Help?

If you encounter issues:

1. Check the console for errors (F12)
2. Verify backend is running (check terminal)
3. Verify database connection
4. Check `README.md` for detailed docs
5. Review `walkthrough.md` for feature guide

---

**Happy Learning! 🎓**
