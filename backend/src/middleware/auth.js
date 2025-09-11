import jwt from 'jsonwebtoken';

export default function authRequired(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [type, token] = hdr.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido/expirado' });
  }
}
