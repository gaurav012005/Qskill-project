import { Translation } from '../models/Translation.js';
import { translateText } from '../utils/rapidapi.js';
import { sanitizeInput } from '../utils/validation.js';

/**
 * Translation Controller
 * Handles translation requests using MyMemory API (FREE)
 */
export async function translate(req, res) {
    try {
        const { text, targetLanguage, sourceLanguage = 'en' } = req.body;
        const userId = req.user?.id; // Optional - only exists for authenticated requests

        // Validate input
        if (!text || !targetLanguage) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Text and target language are required' }));
            return;
        }

        // Sanitize input
        const cleanText = sanitizeInput(text);

        if (cleanText.length === 0) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Text cannot be empty' }));
            return;
        }

        // Call translation API
        const translatedText = await translateText(cleanText, targetLanguage, sourceLanguage);

        // Save to database only if user is authenticated
        let translationId = null;
        if (userId) {
            translationId = await Translation.create(
                userId,
                cleanText,
                translatedText,
                sourceLanguage,
                targetLanguage
            );
        }

        // Send response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            translationId,
            sourceText: cleanText,
            translatedText,
            sourceLanguage,
            targetLanguage
        }));
    } catch (error) {
        console.error('Translation error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Translation failed',
            details: error.message
        }));
    }
}
