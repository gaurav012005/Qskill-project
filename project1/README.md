# TransLingo - Translation Application

A professional full-stack translation application for translating English to Indian languages with user authentication, translation history, and favorites.

## 🚀 Features

### Core Features
- ✅ **User Authentication** - Secure JWT-based login and registration
- ✅ **Translation** - English to 10 Indian languages (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu)
- ✅ **Translation History** - Automatic saving of all translations
- ✅ **Favorites** - Star and save your favorite translations
- ✅ **Copy to Clipboard** - One-click copy functionality
- ✅ **Text-to-Speech** - Listen to translations
- ✅ **Dark/Light Mode** - Toggle between themes
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop

### Technical Features
- ✅ **Backend API Security** - RapidAPI key hidden from frontend
- ✅ **Rate Limiting** - 100 requests per 15 minutes per IP
- ✅ **Form Validation** - Comprehensive client and server-side validation
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Modern UI** - Glassmorphism, gradients, and smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form validation
- **Framer Motion** - Animations
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime (native http module, no Express)
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **RapidAPI** - Translation service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MySQL** (v8 or higher)
- **npm** or **yarn**

You'll also need:
- **RapidAPI Account** - Sign up at [rapidapi.com](https://rapidapi.com)
- **Google Translate API Key** - Subscribe to Google Translate API on RapidAPI

## 🔧 Installation

### 1. Clone or Navigate to Project
```bash
cd "c:/6 sem/intership/Qskill/project 1"
```

### 2. Set Up Database

Create a MySQL database:
```sql
CREATE DATABASE translation_app;
```

Run the database schema:
```bash
mysql -u root -p translation_app < backend/src/config/database.sql
```

### 3. Configure Backend Environment

Edit `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=translation_app
JWT_SECRET=your_super_secret_jwt_key_change_this
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=google-translate1.p.rapidapi.com
```

### 4. Configure Frontend Environment

The `frontend/.env` is already set up:
```env
VITE_API_URL=http://localhost:5000
```

### 5. Install Dependencies

Both frontend and backend dependencies are already installed. If needed:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Register** - Create a new account at `/register`
2. **Login** - Sign in at `/login`
3. **Translate** - Enter English text and select target language
4. **View History** - See all your translations at `/history`
5. **Manage Favorites** - Star translations and view them at `/favorites`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Translation (Protected)
- `POST /api/translate` - Translate text
- `GET /api/history` - Get translation history
- `GET /api/favorites` - Get favorite translations
- `POST /api/favorites/:id` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Health Check
- `GET /api/health` - Server status

## 🎨 Design Features

- **Visme-Inspired UI** - Clean, professional form design
- **Glassmorphism** - Modern glass-effect cards
- **Gradient Buttons** - Eye-catching CTAs
- **Smooth Animations** - Framer Motion transitions
- **Dark Mode** - Full dark theme support
- **Responsive** - Mobile-first design

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Client and server-side
- **CORS** - Configured for security
- **API Key Protection** - RapidAPI key hidden in backend

## 📦 Project Structure

```
project-1/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main app
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, rate limiting
│   │   ├── models/         # Database models
│   │   ├── utils/          # Helpers
│   │   ├── config/         # Database schema
│   │   ├── router.js       # Custom router
│   │   └── server.js       # HTTP server
│   └── package.json
│
└── README.md
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `backend/.env`
- Ensure database exists

### Translation API Error
- Verify RapidAPI key is valid
- Check API subscription status
- Ensure API host is correct

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Verify CORS settings

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

Built with ❤️ for Qskill Internship Project

## 🙏 Acknowledgments

- RapidAPI for translation services
- Visme for design inspiration
- React and Node.js communities
