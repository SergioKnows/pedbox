import express from 'express';
import subredditController from '../controllers/mainController.js';
import authController from '../controllers/authController.js';
import authRequired from '../middleware/auth.js';

const router = express.Router();

// Ruta de documentación
router.get('/', (req, res) => {
    res.json({
        message: 'API de Reddit funcionando',
        endpoints: {
            'GET /api/subreddits': 'Listar subreddits con paginación',
            'GET /api/subreddits/:id': 'Obtener detalle de subreddit',
            'POST /api/subreddits/fetch': 'Obtener datos de Reddit',
            'GET /api/me': 'Obtener información del usuario'
        }
    });
});

// Rutas para subreddits
router.get('/subreddits', subredditController.getSubreddits);                    // GET /api/subreddits
router.post('/subreddits/fetch', subredditController.fetchRedditData);          // POST /api/subreddits/fetch
router.get('/subreddits/:id', subredditController.getSubredditById);              // GET /api/subreddits/:id

// Rutas para autenticación
router.get('/me', authRequired, (req, res) => {
    res.json({ userId: req.user.sub, email: req.user.email, role: req.user.role });
});
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

export default router;