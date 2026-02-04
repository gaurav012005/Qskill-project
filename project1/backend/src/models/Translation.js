import { query, queryOne } from './db.js';

export const Translation = {
    // Create new translation
    async create(userId, sourceText, translatedText, sourceLang, targetLang) {
        const sql = `
      INSERT INTO translations 
      (user_id, source_text, translated_text, source_language, target_language) 
      VALUES (?, ?, ?, ?, ?)
    `;
        const result = await query(sql, [userId, sourceText, translatedText, sourceLang, targetLang]);
        return result.insertId;
    },

    // Get user's translation history
    async getHistory(userId, limit = 50, offset = 0) {
        // Ensure limit and offset are integers (safe for SQL injection since we're parsing)
        const limitInt = parseInt(limit) || 50;
        const offsetInt = parseInt(offset) || 0;

        // Use template literal with validated integers to avoid mysql2 prepared statement issue
        const sql = `
      SELECT id, source_text, translated_text, source_language, target_language, created_at
      FROM translations
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ${limitInt} OFFSET ${offsetInt}
    `;
        return await query(sql, [userId]);
    },

    // Get translation by ID
    async findById(id) {
        const sql = 'SELECT * FROM translations WHERE id = ?';
        return await queryOne(sql, [id]);
    },

    // Delete translation
    async delete(id, userId) {
        const sql = 'DELETE FROM translations WHERE id = ? AND user_id = ?';
        const result = await query(sql, [id, userId]);
        return result.affectedRows > 0;
    }
};
