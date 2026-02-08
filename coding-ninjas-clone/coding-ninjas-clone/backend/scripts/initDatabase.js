import { getDatabase, initDatabase } from '../config/database.js';
import { hashPassword } from '../utils/helpers.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTables = (db) => {
    console.log('📋 Creating database tables...');

    // Users table
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'student' CHECK(role IN ('student', 'instructor', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Categories table
    db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Instructors table
    db.exec(`
    CREATE TABLE IF NOT EXISTS instructors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      bio TEXT,
      expertise TEXT,
      rating REAL DEFAULT 0.0,
      students_taught INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

    // Courses table
    db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      instructor_id INTEGER NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      duration TEXT,
      level TEXT CHECK(level IN ('beginner', 'intermediate', 'advanced')),
      image_url TEXT,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'draft')),
      enrollment_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0.0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (instructor_id) REFERENCES instructors(id)
    )
  `);

    // Enrollments table
    db.exec(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'cancelled')),
      progress_percentage REAL DEFAULT 0.0,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id)
    )
  `);

    // Payments table
    db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed', 'refunded')),
      payment_method TEXT,
      transaction_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

    // Leads table (for hero form submissions)
    db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      experience TEXT,
      interest TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    console.log('✅ Tables created successfully');
};

const seedData = async (db) => {
    console.log('🌱 Seeding database with initial data...');

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    db.prepare(`
    INSERT OR IGNORE INTO users (email, password_hash, name, role)
    VALUES (?, ?, ?, ?)
  `).run('admin@codingninjas.com', adminPassword, 'Admin User', 'admin');

    // Create sample instructor user
    const instructorPassword = await hashPassword('instructor123');
    const instructorResult = db.prepare(`
    INSERT OR IGNORE INTO users (email, password_hash, name, role)
    VALUES (?, ?, ?, ?)
  `).run('instructor@codingninjas.com', instructorPassword, 'John Doe', 'instructor');

    // Create instructor profile
    if (instructorResult.changes > 0) {
        const instructor = db.prepare('SELECT id FROM users WHERE email = ?').get('instructor@codingninjas.com');
        db.prepare(`
      INSERT OR IGNORE INTO instructors (user_id, bio, expertise, rating, students_taught)
      VALUES (?, ?, ?, ?, ?)
    `).run(
            instructor.id,
            'Senior Software Engineer with 10+ years of experience in full-stack development',
            'JavaScript, React, Node.js, Python, System Design',
            4.8,
            5000
        );
    }

    // Insert categories
    const categories = [
        { name: 'Software Development', description: 'Learn programming and software engineering', icon: '💻' },
        { name: 'Data Analytics', description: 'Master data analysis and visualization', icon: '📊' },
        { name: 'Gen AI', description: 'Explore Generative AI and Machine Learning', icon: '🤖' },
        { name: 'Web Development', description: 'Build modern web applications', icon: '🌐' },
        { name: 'Mobile Development', description: 'Create mobile apps for iOS and Android', icon: '📱' },
    ];

    categories.forEach(cat => {
        db.prepare(`
      INSERT OR IGNORE INTO categories (name, description, icon)
      VALUES (?, ?, ?)
    `).run(cat.name, cat.description, cat.icon);
    });

    // Get category and instructor IDs
    const softwareDevCat = db.prepare('SELECT id FROM categories WHERE name = ?').get('Software Development');
    const dataAnalyticsCat = db.prepare('SELECT id FROM categories WHERE name = ?').get('Data Analytics');
    const genAICat = db.prepare('SELECT id FROM categories WHERE name = ?').get('Gen AI');
    const webDevCat = db.prepare('SELECT id FROM categories WHERE name = ?').get('Web Development');
    const instructor = db.prepare('SELECT id FROM instructors LIMIT 1').get();

    // Insert sample courses
    const courses = [
        {
            title: 'Full Stack Web Development Bootcamp',
            description: 'Master MERN stack development from scratch. Build real-world projects and get job-ready.',
            category_id: softwareDevCat.id,
            instructor_id: instructor.id,
            price: 15999,
            duration: '6 months',
            level: 'intermediate',
            image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
            status: 'active',
            rating: 4.7
        },
        {
            title: 'Data Structures & Algorithms Masterclass',
            description: 'Crack coding interviews at top tech companies with comprehensive DSA training.',
            category_id: softwareDevCat.id,
            instructor_id: instructor.id,
            price: 12999,
            duration: '4 months',
            level: 'intermediate',
            image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
            status: 'active',
            rating: 4.9
        },
        {
            title: 'Python for Data Analytics',
            description: 'Learn Python, Pandas, NumPy, and data visualization to become a data analyst.',
            category_id: dataAnalyticsCat.id,
            instructor_id: instructor.id,
            price: 10999,
            duration: '3 months',
            level: 'beginner',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            status: 'active',
            rating: 4.6
        },
        {
            title: 'Generative AI with ChatGPT & LLMs',
            description: 'Build AI-powered applications using GPT models, LangChain, and vector databases.',
            category_id: genAICat.id,
            instructor_id: instructor.id,
            price: 18999,
            duration: '5 months',
            level: 'advanced',
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            status: 'active',
            rating: 4.8
        },
        {
            title: 'React & Next.js Complete Guide',
            description: 'Build modern, production-ready web applications with React and Next.js.',
            category_id: webDevCat.id,
            instructor_id: instructor.id,
            price: 13999,
            duration: '4 months',
            level: 'intermediate',
            image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
            status: 'active',
            rating: 4.7
        },
        {
            title: 'System Design for Interviews',
            description: 'Master system design concepts and ace technical interviews at FAANG companies.',
            category_id: softwareDevCat.id,
            instructor_id: instructor.id,
            price: 16999,
            duration: '3 months',
            level: 'advanced',
            image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
            status: 'active',
            rating: 4.9
        },
    ];

    const insertCourse = db.prepare(`
    INSERT OR IGNORE INTO courses (title, description, category_id, instructor_id, price, duration, level, image_url, status, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    courses.forEach(course => {
        insertCourse.run(
            course.title,
            course.description,
            course.category_id,
            course.instructor_id,
            course.price,
            course.duration,
            course.level,
            course.image_url,
            course.status,
            course.rating
        );
    });

    console.log('✅ Database seeded successfully');
};

const main = async () => {
    try {
        // Ensure database directory exists
        const dbDir = path.join(__dirname, '..', 'database');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        const db = initDatabase();
        createTables(db);
        await seedData(db);

        console.log('\n🎉 Database initialization complete!');
        console.log('\n📝 Default credentials:');
        console.log('   Admin: admin@codingninjas.com / admin123');
        console.log('   Instructor: instructor@codingninjas.com / instructor123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    }
};

main();
