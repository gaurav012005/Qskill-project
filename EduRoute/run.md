# EduRoute Quick Start Guide

## 🚀 Get Started in 5 Minutes



### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies (if not already done)
npm install


# Start backend server
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

### Step 2: Frontend Setup

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

login deatils
student
email:student@eduroute.com/ password123

instructor
eamil:instructor@eduroute.com/  password123

### Step 3: Test the Application

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
