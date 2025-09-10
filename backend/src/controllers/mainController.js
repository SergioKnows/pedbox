import { PrismaClient } from '@prisma/client';
import { fetchRedditData } from '../../services/fetchRedditData.js';

const prisma = new PrismaClient();

const subredditController = {
    // Listar todos los subreddits con paginación
    getSubreddits: async (req, res) => {
        try {
            const page = Math.max(parseInt(req.query.page ?? "1", 10), 1);
            const pageSize = Math.min(Math.max(parseInt(req.query.pageSize ?? "20", 10), 1), 100);
            const skip = (page - 1) * pageSize;

            const [rows, total] = await Promise.all([
                prisma.redditData.findMany({
                    orderBy: { subscribers: 'desc' },
                    skip,
                    take: pageSize,
                }),
                prisma.redditData.count(),
            ]);

            res.json({ page, pageSize, total, rows });
        } catch (error) {
            console.error('Error al obtener subreddits:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener detalle de un subreddit específico
    getSubredditById: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID debe ser un número válido' });
            }

            const subreddit = await prisma.redditData.findUnique({
                where: { id }
            });

            if (!subreddit) {
                return res.status(404).json({ error: 'Subreddit no encontrado' });
            }

            res.json(subreddit);
        } catch (error) {
            console.error('Error al obtener subreddit:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener datos de Reddit
    fetchRedditData: async (req, res) => {
        try {
            const total = await fetchRedditData();
            res.json({ fetched: total });
        } catch (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).json({ error: "Fetch failed" });
        }
    }
};

export default subredditController;