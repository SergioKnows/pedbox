import express from 'express';
import subredditController from '../controllers/mainController.js';

const router = express.Router();

// Ruta de documentación
router.get('/', (req, res) => {
    res.json({
        message: 'API de Reddit funcionando',
        endpoints: {
            'GET /api/subreddits': 'Listar subreddits con paginación',
            'GET /api/subreddits/:id': 'Obtener detalle de subreddit',
            'POST /api/subreddits/fetch': 'Obtener datos de Reddit'
        }
    });
});

// Rutas para subreddits
router.get('/subreddits', subredditController.getSubreddits);                    // GET /api/subreddits
router.post('/subreddits/fetch', subredditController.fetchRedditData);          // POST /api/subreddits/fetch
router.get('/subreddits/:id', subredditController.getSubredditById);              // GET /api/subreddits/:id

export default router;