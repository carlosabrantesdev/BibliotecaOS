import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', autenticar, async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        criadoEm: true,
      },
    });
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao buscar leitores' });
  }
});

export default router;