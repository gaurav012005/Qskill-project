import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CourseProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Stats from './components/Stats'
import WorkingProfessionals from './components/WorkingProfessionals'
import CollegeStudentCourses from './components/CollegeStudentCourses'
import ImpactStats from './components/ImpactStats'
import CollegeStudents from './components/CollegeStudents'
import CallbackSection from './components/CallbackSection'
import Testimonials from './components/Testimonials'
import EventsSection from './components/EventsSection'
import PaymentSection from './components/PaymentSection'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white font-outfit selection:bg-ninja-orange selection:text-white pb-20 md:pb-0">
      <Navbar
        isLoggedIn={!!user}
        userName={user?.name}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
      />
      <main>
        <Hero />
        <WorkingProfessionals />
        <CollegeStudentCourses />
        <ImpactStats />
        <CollegeStudents />
        <CallbackSection />
        <Testimonials />
        <EventsSection />
        <PaymentSection />
      </main>
      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <AppContent />
      </CourseProvider>
    </AuthProvider>
  )
}

export default App

