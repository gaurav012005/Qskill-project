import https from 'https';

/**
 * Google Translate Free API via translate.googleapis.com
 * This uses Google's public endpoint (no API key required for basic usage)
 * Supports proper native scripts for all languages
 */

/**
 * Translate text using Google Translate free endpoint
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'hi', 'bn', 'ta')
 * @param {string} sourceLang - Source language code (default: 'en')
 * @returns {Promise<string>} Translated text in native script
 */
export async function translateText(text, targetLang, sourceLang = 'en') {
    return new Promise((resolve, reject) => {
        // Validate input
        if (!text || text.trim().length === 0) {
            return reject(new Error('Text is required'));
        }

        if (!targetLang) {
            return reject(new Error('Target language is required'));
        }

        // Encode text for URL
        const encodedText = encodeURIComponent(text);

        // Google Translate API endpoint (free, no key required)
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodedText}`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    // Parse the response
                    const parsed = JSON.parse(data);

                    // Extract translated text from response
                    // Response format: [[[translated_text, original_text, null, null, 10]], null, "en", ...]
                    if (parsed && parsed[0] && parsed[0][0] && parsed[0][0][0]) {
                        const translatedText = parsed[0].map(item => item[0]).join('');
                        resolve(translatedText);
                    } else {
                        reject(new Error('Translation failed - invalid response format'));
                    }
                } catch (error) {
                    console.error('Translation parse error:', error);
                    reject(new Error('Failed to parse translation response'));
                }
            });
        }).on('error', (error) => {
            console.error('Translation API error:', error);
            reject(new Error(`Translation API error: ${error.message}`));
        });
    });
}

/**
 * Get supported languages
 * Google Translate supports native scripts for all Indian languages
 */
export function getSupportedLanguages() {
    return {
        'hi': 'Hindi (हिन्दी)',
        'bn': 'Bengali (বাংলা)',
        'ta': 'Tamil (தமிழ்)',
        'te': 'Telugu (తెలుగు)',
        'mr': 'Marathi (मराठी)',
        'gu': 'Gujarati (ગુજરાતી)',
        'kn': 'Kannada (ಕನ್ನಡ)',
        'ml': 'Malayalam (മലയാളം)',
        'pa': 'Punjabi (ਪੰਜਾਬੀ)',
        'ur': 'Urdu (اردو)'
    };
}
