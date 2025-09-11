import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailNorm = (email || '').trim().toLowerCase();
        if (!emailNorm.includes('@') || !password || password.length < 6) {
            return res.status(400).json({ error: 'Email o Contraseña inválidos' });
        }

        const exists = await prisma.user.findUnique({ where: { email: emailNorm } });
        if (exists) {
            return res.status(409).json({ error: 'Email ya registrado' });
        }

        const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
        const passwordHash = await bcrypt.hash(password, rounds);
        const user = await prisma.user.create({ data: { email: emailNorm, passwordHash } });
        console.log('Usuario creado:', user);
        return res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        console.error('Error en register:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailNorm = (email || '').trim().toLowerCase();
        if (!emailNorm.includes('@') || !password || password.length < 6) {
            return res.status(400).json({ error: 'Email o Contraseña inválidos' });
        }

        const user = await prisma.user.findUnique({ where: { email: emailNorm } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );
        console.log('Usuario :', user);
        return res.json({ token });
    } catch (err) {
        console.error('Error en login:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default { register, login };


