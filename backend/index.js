import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mainRoutes from './src/routes/mainRoutes.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

const app = express();

// Middlewares globales
app.use(cors({
    origin: ['http://localhost:5173', 'https://pedbox.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Rutas principales
app.use('/api', mainRoutes);

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

export default app;