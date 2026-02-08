import { Translation } from '../models/Translation.js';
import { Favorite } from '../models/Favorite.js';

// Get translation history
export async function getHistory(req, res) {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        const history = await Translation.getHistory(userId, limit, offset);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            count: history.length,
            history
        }));
    } catch (error) {
        console.error('Get history error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to fetch history' }));
    }
}

// Get favorites
export async function getFavorites(req, res) {
    try {
        const userId = req.user.id;
        const favorites = await Favorite.getFavorites(userId);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            count: favorites.length,
            favorites
        }));
    } catch (error) {
        console.error('Get favorites error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to fetch favorites' }));
    }
}

// Add to favorites
export async function addFavorite(req, res) {
    try {
        const userId = req.user.id;
        const translationId = parseInt(req.params.id);

        if (!translationId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Translation ID is required' }));
            return;
        }

        // Check if translation exists and belongs to user
        const translation = await Translation.findById(translationId);
        if (!translation) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Translation not found' }));
            return;
        }

        if (translation.user_id !== userId) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        // Add to favorites
        const favoriteId = await Favorite.add(userId, translationId);

        if (!favoriteId) {
            res.statusCode = 409;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Already in favorites' }));
            return;
        }

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            message: 'Added to favorites',
            favoriteId
        }));
    } catch (error) {
        console.error('Add favorite error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to add favorite' }));
    }
}

// Remove from favorites
export async function removeFavorite(req, res) {
    try {
        const userId = req.user.id;
        const translationId = parseInt(req.params.id);

        if (!translationId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Translation ID is required' }));
            return;
        }

        const removed = await Favorite.remove(userId, translationId);

        if (!removed) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Favorite not found' }));
            return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            message: 'Removed from favorites'
        }));
    } catch (error) {
        console.error('Remove favorite error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to remove favorite' }));
    }
}
