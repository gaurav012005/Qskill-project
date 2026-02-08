-- EduRoute Database Schema

CREATE DATABASE IF NOT EXISTS eduroute;
USE eduroute;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('student', 'instructor') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id INT NOT NULL,
  thumbnail VARCHAR(255),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_instructor (instructor_id),
  INDEX idx_published (is_published)
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url VARCHAR(255),
  order_index INT NOT NULL,
  duration INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course (course_id),
  INDEX idx_order (course_id, order_index)
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_lesson_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (last_lesson_id) REFERENCES lessons(id) ON DELETE SET NULL,
  UNIQUE KEY unique_enrollment (user_id, course_id),
  INDEX idx_user (user_id),
  INDEX idx_course (course_id)
);

-- Progress Table
CREATE TABLE IF NOT EXISTS progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
  UNIQUE KEY unique_progress (user_id, lesson_id),
  INDEX idx_user_lesson (user_id, lesson_id)
);

-- Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  passing_score INT DEFAULT 70,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course (course_id)
);

-- Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer INT NOT NULL,
  points INT DEFAULT 1,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_quiz (quiz_id)
);

-- Quiz Results Table
CREATE TABLE IF NOT EXISTS quiz_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT NOT NULL,
  total_points INT NOT NULL,
  passed BOOLEAN NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_quiz (quiz_id)
);

-- Insert sample data

-- Sample Users (password: 'password123' hashed with bcrypt)
INSERT INTO users (email, password, name, role) VALUES
('student@eduroute.com', '$2b$10$YourHashHereButThisIsJustForDemo1234567890123456', 'John Student', 'student'),
('instructor@eduroute.com', '$2b$10$YourHashHereButThisIsJustForDemo1234567890123456', 'Jane Instructor', 'instructor');

-- Sample Course
INSERT INTO courses (title, description, instructor_id, is_published) VALUES
('Introduction to Web Development', 'Learn the basics of HTML, CSS, and JavaScript', 2, TRUE),
('Advanced React Patterns', 'Master advanced React concepts and patterns', 2, TRUE);

-- Sample Lessons for Course 1
INSERT INTO lessons (course_id, title, content, order_index, duration) VALUES
(1, 'Welcome to Web Development', 'Introduction to the course and what you will learn', 1, 300),
(1, 'HTML Basics', 'Learn the fundamentals of HTML', 2, 600),
(1, 'CSS Fundamentals', 'Understanding CSS and styling', 3, 900),
(1, 'JavaScript Introduction', 'Getting started with JavaScript', 4, 1200);

-- Sample Lessons for Course 2
INSERT INTO lessons (course_id, title, content, order_index, duration) VALUES
(2, 'React Hooks Deep Dive', 'Understanding useState, useEffect, and custom hooks', 1, 1800),
(2, 'Context API and State Management', 'Managing global state in React', 2, 1500),
(2, 'Performance Optimization', 'React.memo, useMemo, and useCallback', 3, 1200);

-- Sample Quiz for Course 1
INSERT INTO quizzes (course_id, title, passing_score) VALUES
(1, 'Web Development Fundamentals Quiz', 70);

-- Sample Quiz Questions
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, points) VALUES
(1, 'What does HTML stand for?', '["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"]', 0, 10),
(1, 'Which CSS property is used to change text color?', '["text-color", "font-color", "color", "text-style"]', 2, 10),
(1, 'What is the correct syntax for a JavaScript function?', '["function myFunc()", "def myFunc()", "func myFunc()", "function:myFunc()"]', 0, 10);
