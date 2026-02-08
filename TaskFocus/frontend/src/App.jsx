import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import StringGenerator from './pages/StringGenerator'
import Timer from './pages/Timer'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <div className="min-h-screen">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/tasks" element={
                                <ProtectedRoute>
                                    <Tasks />
                                </ProtectedRoute>
                            } />
                            <Route path="/string-generator" element={
                                <ProtectedRoute>
                                    <StringGenerator />
                                </ProtectedRoute>
                            } />
                            <Route path="/timer" element={
                                <ProtectedRoute>
                                    <Timer />
                                </ProtectedRoute>
                            } />
                            <Route path="/analytics" element={
                                <ProtectedRoute>
                                    <Analytics />
                                </ProtectedRoute>
                            } />
                            <Route path="/settings" element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            } />
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#333',
                                    color: '#fff',
                                },
                            }}
                        />
                    </div>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App
