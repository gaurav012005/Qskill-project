-- Task & Focus Manager Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS task_focus_manager;
USE task_focus_manager;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  priority ENUM('HIGH', 'MEDIUM', 'LOW') DEFAULT 'MEDIUM',
  due_date DATE,
  status ENUM('PENDING', 'COMPLETED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Focus sessions table
CREATE TABLE IF NOT EXISTS focus_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  focus_minutes INT NOT NULL,
  break_minutes INT NOT NULL,
  session_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  dark_mode BOOLEAN DEFAULT FALSE,
  focus_duration INT DEFAULT 25,
  break_duration INT DEFAULT 5,
  long_break_duration INT DEFAULT 15,
  sound_enabled BOOLEAN DEFAULT TRUE,
  notifications BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_sessions_user_id ON focus_sessions(user_id);
CREATE INDEX idx_sessions_date ON focus_sessions(session_date);
