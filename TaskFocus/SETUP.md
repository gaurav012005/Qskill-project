# Task & Focus Manager - Setup Guide

## Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** (comes with Node.js)

---

## 📦 Installation Steps

### 1. Clone or Download the Project

```bash
cd "c:\6 sem\intership\Qskill\project 2"
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

## 🗄️ Database Setup

### 1. Start MySQL Server

Make sure your MySQL server is running on your machine.

### 2. Create Database and Tables

**Option A: Using MySQL Workbench or Command Line**

```bash
mysql -u root -p < server/database/schema.sql
```

**Option B: Manual Steps**

1. Open MySQL Workbench or MySQL CLI
2. Run the following commands:

```sql
CREATE DATABASE task_focus_manager;
USE task_focus_manager;
```

3. Copy and execute the entire contents of `server/database/schema.sql`

### 3. Configure Database Credentials

1. Navigate to the `server` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd server
   copy .env.example .env
   ```

3. Edit `server/.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   DB_NAME=task_focus_manager
   JWT_SECRET=task_focus_manager_secret_key_2026
   PORT=5000
   ```

---

## 🚀 Running the Application

### Start Backend Server (Terminal 1)

```bash
cd backend
npm run dev
```

Expected output:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

### Start Frontend (Terminal 2)

```bash
# From project root
npm run dev
```

Expected output:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

---

## 🎯 Access the Application

1. Open your browser
2. Navigate to **http://localhost:3000**
3. Click "Register here" to create a new account
4. Login with your credentials
5. Start using the Task & Focus Manager!

---

## ✅ Verify Installation

### Test Backend API

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"OK","message":"Server is running"}`

### Test Frontend

1. Open http://localhost:3000
2. Should see the login page
3. Try registering a new user
4. Login and access all features

---

## 🔧 Troubleshooting

### Error: "Database connection failed"

- **Check MySQL is running**: Start MySQL service
- **Verify credentials**: Check `server/.env` file
- **Database exists**: Run `schema.sql` to create database

### Error: "Server is not responding"

- **Backend not running**: Start backend server with `cd server && npm run dev`
- **Port conflict**: Change PORT in `server/.env`

### Error: "CORS issues"

- **Backend CORS**: Already configured for http://localhost:3000
- If using different port, update CORS in `server/index.js`

### Error: "npm install fails"

- Clear cache: `npm cache clean --force`
- Delete node_modules: `rmdir /s node_modules` (Windows)
- Reinstall: `npm install`

---

## 📁 Project Structure

```
project 2/
├── server/                  # Backend (Fastify + MySQL)
│   ├── config/
│   │   └── database.js      # MySQL connection
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── tasks.js         # Task CRUD routes
│   │   ├── sessions.js      # Timer session routes
│   │   └── settings.js      # User settings routes
│   ├── database/
│   │   └── schema.sql       # Database schema
│   ├── index.js             # Server entry point
│   ├── package.json
│   └── .env                 # Environment variables
│
├── src/                     # Frontend (React + Vite)
│   ├── components/          # Reusable components
│   ├── context/             # React Context
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── utils/               # Utilities
│   └── App.jsx              # Root component
│
├── package.json
└── README.md
```

---

## 🎓 Features Overview

- **Random String Generator** - Demonstrates useState, useCallback, useEffect
- **Task Management** - Full CRUD with filters and search
- **Pomodoro Timer** - Focus sessions with break intervals
- **Analytics** - Track productivity with charts
- **Settings** - Dark mode, timer customization
- **Authentication** - JWT-based auth with bcrypt

---

## 📝 Default Ports

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MySQL**: localhost:3306

---

## 🔐 First User

After running the application:

1. Click "Register here" on login page
2. Enter your details:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123 (or any password ≥ 6 chars)
3. Click "Create Account"
4. Login with the same credentials

---

## 💡 Tips

- **Keep both servers running** - Frontend needs backend API
- **Check browser console** - For frontend errors
- **Check terminal logs** - For backend errors
- **Use MySQL Workbench** - To view database tables directly

---

**Need Help?** Check the troubleshooting section or review the error messages in terminal/console.
