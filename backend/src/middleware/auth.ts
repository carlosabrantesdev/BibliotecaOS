import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  usuario?: { id: number; email: string; role: string };
}

export function autenticar(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ erro: 'Token não fornecido' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as {
      id: number;
      email: string;
      role: string;
    };
    req.usuario = payload;
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}
