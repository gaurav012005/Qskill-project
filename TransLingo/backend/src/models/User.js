import { query, queryOne } from './db.js';

export const User = {
    // Create new user
    async create(username, email, hashedPassword) {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const result = await query(sql, [username, email, hashedPassword]);
        return result.insertId;
    },

    // Find user by email
    async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return await queryOne(sql, [email]);
    },

    // Find user by username
    async findByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        return await queryOne(sql, [username]);
    },

    // Find user by ID
    async findById(id) {
        const sql = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        return await queryOne(sql, [id]);
    },

    // Check if email exists
    async emailExists(email) {
        const user = await this.findByEmail(email);
        return !!user;
    },

    // Check if username exists
    async usernameExists(username) {
        const user = await this.findByUsername(username);
        return !!user;
    }
};
