import bcrypt from 'bcrypt';
import pool from './config/db.js';

async function setupDemoAccounts() {
    try {
        console.log('🔧 Setting up demo accounts...');

        // Hash the password 'password123'
        const hashedPassword = await bcrypt.hash('password123', 10);
        console.log('✅ Password hashed successfully');

        // Check if users already exist
        const [existingUsers] = await pool.query('SELECT email FROM users');

        if (existingUsers.length > 0) {
            console.log('📝 Updating existing demo accounts...');

            // Update student account
            await pool.query(
                'UPDATE users SET password = ? WHERE email = ?',
                [hashedPassword, 'student@eduroute.com']
            );

            // Update instructor account
            await pool.query(
                'UPDATE users SET password = ? WHERE email = ?',
                [hashedPassword, 'instructor@eduroute.com']
            );

            console.log('✅ Demo accounts updated successfully');
        } else {
            console.log('📝 Creating new demo accounts...');

            // Insert student account
            await pool.query(
                'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
                ['student@eduroute.com', hashedPassword, 'John Student', 'student']
            );

            // Insert instructor account
            await pool.query(
                'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
                ['instructor@eduroute.com', hashedPassword, 'Jane Instructor', 'instructor']
            );

            console.log('✅ Demo accounts created successfully');
        }

        // Verify accounts
        const [users] = await pool.query('SELECT id, email, name, role FROM users');
        console.log('\n📋 Current users in database:');
        users.forEach(user => {
            console.log(`   - ${user.email} (${user.role})`);
        });

        console.log('\n✅ Setup complete!');
        console.log('\n🔑 Demo Accounts:');
        console.log('   Student:    student@eduroute.com / password123');
        console.log('   Instructor: instructor@eduroute.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up demo accounts:', error);
        process.exit(1);
    }
}

setupDemoAccounts();
