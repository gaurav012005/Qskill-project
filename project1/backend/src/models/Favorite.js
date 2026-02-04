import { query, queryOne } from './db.js';

export const Favorite = {
    // Add translation to favorites
    async add(userId, translationId) {
        try {
            const sql = 'INSERT INTO favorites (user_id, translation_id) VALUES (?, ?)';
            const result = await query(sql, [userId, translationId]);
            return result.insertId;
        } catch (error) {
            // Handle duplicate entry error
            if (error.code === 'ER_DUP_ENTRY') {
                return null;
            }
            throw error;
        }
    },

    // Remove from favorites
    async remove(userId, translationId) {
        const sql = 'DELETE FROM favorites WHERE user_id = ? AND translation_id = ?';
        const result = await query(sql, [userId, translationId]);
        return result.affectedRows > 0;
    },

    // Get user's favorites
    async getFavorites(userId) {
        const sql = `
      SELECT t.id, t.source_text, t.translated_text, t.source_language, 
             t.target_language, t.created_at, f.created_at as favorited_at
      FROM favorites f
      JOIN translations t ON f.translation_id = t.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `;
        return await query(sql, [userId]);
    },

    // Check if translation is favorited
    async isFavorited(userId, translationId) {
        const sql = 'SELECT id FROM favorites WHERE user_id = ? AND translation_id = ?';
        const result = await queryOne(sql, [userId, translationId]);
        return !!result;
    }
};
