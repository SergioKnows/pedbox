import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { importRedditData } from './services/importRedditData.js';


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//CRUD Operations
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/reddit-data', async (_req, res) => {
    const rows = await prisma.redditData.findMany();
    res.json(rows);
})

app.post('/reddit-data', async (req, res) => {
    const { name, price } = req.body;
    const created = await prisma.redditData.create({ data: { name, price } });
    res.status(201).json(created);
});


// --- importar subreddits y guardarlos ---
app.post('/import/reddits', async (_req, res) => {
    try {
        // importar datos de Reddit
        const total = await importRedditData();
        res.json({ imported: total });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Import failed" });
    }
});

// --- listar subreddits (para el front) ---
app.get('/subreddits', async (req, res) => {
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
});


const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));