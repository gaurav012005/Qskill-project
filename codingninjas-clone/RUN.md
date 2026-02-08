# 🚀 Quick Start Guide - Run This Project

## ⚡ Quick Install & Run (Copy-Paste Commands)

### Step 1: Install Backend Dependencies
```bash
cd codingninjas-clone
cd backend
npm install
```

### Step 2: Initialize Database
```bash
npm run init-db
```

### Step 3: Start Backend Server
```bash
npm run dev
```
**Backend will run on:** http://localhost:5000

---

### Step 4: Install Frontend Dependencies (Open New Terminal)
```bash
cd ..
cd codingninjas-clone
npm install
```

### Step 5: Start Frontend Server
```bash
npm run dev
```
**Frontend will run on:** http://localhost:5173

---

## 🎯 One-Command Setup (All Steps)

### For Windows (PowerShell):
```powershell
# Backend setup
cd backend; npm install; npm run init-db; Start-Process npm -ArgumentList "run dev"; cd ..

# Frontend setup (in new terminal)
npm install; npm run dev
```

### For Mac/Linux (Bash):
```bash
# Backend setup
cd backend && npm install && npm run init-db && npm run dev &

# Frontend setup (in new terminal)
npm install && npm run dev
```

---

## 📋 Detailed Step-by-Step Instructions

### Prerequisites
- ✅ **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Terminal/Command Prompt**

### Installation Process

#### 1️⃣ Navigate to Project Directory
```bash
cd coding-ninjas-clone
```

#### 2️⃣ Setup Backend
```bash
# Go to backend folder
cd backend

# Install all backend dependencies
npm install

# Initialize SQLite database with seed data
npm run init-db

# Start backend development server
npm run dev
```

**✅ Backend Success:** You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

**Keep this terminal running!**

---

#### 3️⃣ Setup Frontend (Open New Terminal)
```bash
# Go back to project root
cd coding-ninjas-clone

# Install all frontend dependencies
npm install

# Start frontend development server
npm run dev
```

**✅ Frontend Success:** You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

**Keep this terminal running too!**

---

#### 4️⃣ Open in Browser
```bash
# Windows
start http://localhost:5173

# Mac
open http://localhost:5173

# Linux
xdg-open http://localhost:5173
```

Or manually open your browser and go to: **http://localhost:5173**

---

## 🔐 Test Login Credentials

### Admin Account
- **Email:** admin@codingninjas.com
- **Password:** admin123

### Instructor Account
- **Email:** instructor@codingninjas.com
- **Password:** instructor123

### Or Create Your Own
- Click **"Login"** → Switch to **"Register"** tab
- Fill in your details and create a new account!

---

## 🧪 Verify Everything is Working

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Get all courses
curl http://localhost:5000/api/courses

# Get categories
curl http://localhost:5000/api/categories
```

### Test Frontend
1. ✅ Open http://localhost:5173
2. ✅ See Coding Ninjas homepage
3. ✅ Click "Login" button
4. ✅ Try registering or logging in
5. ✅ Fill out hero form and submit

---

## 📦 What Gets Installed

### Backend Dependencies (12 packages)
- `express` - Web server framework
- `better-sqlite3` - SQLite database
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `helmet` - Security headers
- `morgan` - Request logging
- `dotenv` - Environment variables
- `express-validator` - Input validation
- `multer` - File uploads
- `nodemon` - Auto-restart server

### Frontend Dependencies (4 packages)
- `react` - UI library
- `react-dom` - React DOM rendering
- `axios` - HTTP client
- `react-router-dom` - Routing

---

## 🛑 Troubleshooting

### Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Database Not Found
**Error:** `Database file not found`

**Solution:**
```bash
cd backend
npm run init-db
```

### Dependencies Not Installing
**Error:** `npm install fails`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Backend Won't Connect
**Error:** `Cannot connect to backend`

**Solution:**
1. Check backend is running on port 5000
2. Check CORS settings in `backend/server.js`
3. Verify API base URL in `src/services/api.js`

---

## 🎯 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run init-db` | Initialize database |
| `npm start` | Start production server |

---

## 📁 Project Structure After Installation

```
coding-ninjas-clone/
├── backend/
│   ├── node_modules/        ← Backend dependencies
│   ├── database/
│   │   └── codingninjas.db  ← SQLite database (created)
│   └── ...
├── node_modules/            ← Frontend dependencies
├── src/
└── ...
```

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] Backend dependencies installed
- [ ] Database initialized
- [ ] Backend server running (port 5000)
- [ ] Frontend dependencies installed
- [ ] Frontend server running (port 5173)
- [ ] Browser opens http://localhost:5173
- [ ] Can see Coding Ninjas homepage
- [ ] Can login/register
- [ ] Can submit hero form

---

## 🎉 You're All Set!

Your full-stack Coding Ninjas clone is now running!

**Next Steps:**
1. Explore the features (see FEATURES.md)
2. Try logging in with admin credentials
3. Browse the 6 sample courses
4. Submit the lead form
5. Check the code in `src/` and `backend/`

**Happy Coding! 🚀**
