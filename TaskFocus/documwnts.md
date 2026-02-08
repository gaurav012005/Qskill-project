# Task & Focus Manager - Project Documentation

## 📋 Project Overview

**Task & Focus Manager** is a full-stack productivity platform that helps users manage tasks, track focus sessions with a Pomodoro timer, and analyze their productivity. The project demonstrates modern web development practices with React hooks, RESTful API design, and MySQL database integration.

## 🎯 Core Features

### 1. **Authentication System**
- User registration and login with JWT tokens
- Secure password hashing using bcrypt
- Protected routes for authenticated users
- Persistent authentication with localStorage

### 2. **Task Management**
- Create, read, update, and delete tasks
- Priority levels: HIGH, MEDIUM, LOW
- Due date tracking
- Status management: PENDING, COMPLETED
- Search and filter functionality
- Bulk operations (mark all as complete)

### 3. **Random String Generator** ⭐ (Key Feature)
- **Purpose**: Demonstrates React hooks (useState, useCallback, useEffect)
- Customizable string length (4-64 characters)
- Character type selection (lowercase, uppercase, numbers, symbols)
- Copy to clipboard functionality
- Generation history tracking
- Auto-generation on setting changes

### 4. **Pomodoro Timer**
- Customizable focus and break durations
- Visual countdown display
- Sound alerts when timer completes
- Session tracking saved to database
- Start, pause, and reset controls

### 5. **Analytics Dashboard**
- Daily task completion charts
- Weekly focus time visualization
- Productivity streak counter
- Overall productivity score
- Session statistics

### 6. **Settings & Customization**
- Dark/light mode toggle
- Customizable timer durations
- Notification preferences
- Persistent settings storage

## 🏗️ Architecture

### Frontend Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **State Management**: React Hooks + Context API
- **HTTP Client**: Axios with interceptors
- **Notifications**: React Hot Toast
- **Charts**: Chart.js / Recharts

### Backend Stack
- **Server**: Fastify (high-performance Node.js framework)
- **Database**: MySQL with mysql2 driver
- **Authentication**: JWT (@fastify/jwt)
- **Security**: bcrypt for password hashing
- **CORS**: @fastify/cors
- **Environment**: dotenv

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tasks Table
```sql
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    due_date DATE,
    status ENUM('PENDING', 'COMPLETED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Focus Sessions Table
```sql
CREATE TABLE focus_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    focus_minutes INT NOT NULL,
    break_minutes INT NOT NULL,
    session_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Settings Table
```sql
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    dark_mode BOOLEAN DEFAULT FALSE,
    focus_duration INT DEFAULT 25,
    break_duration INT DEFAULT 5,
    long_break_duration INT DEFAULT 15,
    sound_enabled BOOLEAN DEFAULT TRUE,
    notifications BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user info (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create a new task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)
- `POST /api/tasks/bulk-complete` - Mark all tasks as complete (protected)

### Focus Sessions
- `POST /api/sessions` - Save a focus session (protected)
- `GET /api/sessions/stats` - Get session statistics (protected)

### Settings
- `GET /api/settings` - Get user settings (protected)
- `PUT /api/settings` - Update user settings (protected)

## 🔐 Authentication Flow

1. **Registration**: User submits name, email, password → Server hashes password with bcrypt → Saves to database
2. **Login**: User submits email, password → Server verifies with bcrypt → Generates JWT token → Returns token + user data
3. **Protected Routes**: Frontend sends JWT in Authorization header → Backend verifies token → Allows/denies access
4. **Auto-logout**: If token is invalid or expired (401), user is automatically logged out

## 🎨 UI/UX Design Principles

### Design System
- **Colors**: Purple and blue gradient primary theme
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent padding and margins using Tailwind
- **Animations**: Smooth transitions on hover and state changes
- **Responsiveness**: Mobile-first design with responsive breakpoints

### Component Classes
```css
.btn-primary - Gradient button with hover effects
.card - White/dark card with shadow
.input-field - Styled form input with focus ring
.glass - Glassmorphism effect
```

## 📁 Project Structure

```
project-2/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Navigation and layout
│   │   ├── ProtectedRoute.jsx  # Route protection
│   │   └── ui/                 # UI components
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication state
│   │   └── ThemeContext.jsx    # Dark mode state
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Tasks.jsx           # Task management
│   │   ├── StringGenerator.jsx # Random string generator ⭐
│   │   ├── Timer.jsx           # Pomodoro timer
│   │   ├── Analytics.jsx       # Analytics dashboard
│   │   └── Settings.jsx        # User settings
│   ├── services/
│   │   ├── authService.js      # Auth API calls
│   │   ├── taskService.js      # Task API calls
│   │   ├── sessionService.js   # Session API calls
│   │   └── settingsService.js  # Settings API calls
│   ├── utils/
│   │   └── api.js              # Axios instance with interceptors
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── server/
│   ├── config/
│   │   └── database.js         # MySQL connection
│   ├── database/
│   │   └── schema.sql          # Database schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── tasks.js            # Task routes
│   │   ├── sessions.js         # Session routes
│   │   └── settings.js         # Settings routes
│   ├── index.js                # Fastify server
│   ├── .env                    # Environment variables
│   └── package.json            # Backend dependencies
├── package.json                # Frontend dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # Setup instructions

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   cd server && npm install
   ```

2. **Setup MySQL database**:
   ```bash
   mysql -u root -p < server/database/schema.sql
   ```

3. **Configure environment**:
   - Edit `server/.env` with your MySQL credentials

4. **Start servers**:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Access the app**:
   - Frontend: http://localhost:4000 or http://localhost:4001
   - Backend API: http://localhost:5000

## 🎓 Learning Objectives

This project demonstrates:

1. **React Hooks Mastery**
   - `useState` for state management
   - `useEffect` for side effects and lifecycle
   - `useCallback` for performance optimization
   - `useContext` for global state

2. **RESTful API Design**
   - CRUD operations
   - JWT authentication
   - Error handling
   - Request validation

3. **Full-Stack Integration**
   - Frontend-backend communication
   - Database design and relationships
   - Authentication flow
   - State synchronization

4. **Modern Development Practices**
   - Component-based architecture
   - Separation of concerns
   - Environment configuration
   - Code organization

## 📊 Performance Considerations

- **Lazy loading**: Routes are code-split
- **Memo hooks**: `useCallback` prevents unnecessary re-renders
- **Optimized queries**: Database indexes on foreign keys
- **Connection pooling**: MySQL connection pool for efficiency
- **JWT**: Stateless authentication reduces server load

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- Protected API routes with middleware
- CORS configuration for allowed origins
- SQL injection prevention through parameterized queries
- XSS protection through React's built-in escaping

## 🌟 Key Highlights

- ✅ Full-stack application with MySQL persistence
- ✅ Production-ready authentication system
- ✅ Comprehensive React hooks demonstration
- ✅ RESTful API with Fastify
- ✅ Responsive, accessible UI with Tailwind CSS
- ✅ Dark mode support
- ✅ Real-time data synchronization

## 📝 Future Enhancements

- Add email verification
- Implement password reset flow
- Add real-time notifications with WebSockets
- Export analytics data
- Team collaboration features
- Mobile app with React Native

---

**Built with ❤️ using React, Fastify, and MySQL**
