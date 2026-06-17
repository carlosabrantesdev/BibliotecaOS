import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar } from '../middleware/auth';
import { UsuarioService } from '../services/UsuarioService';

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

router.post('/', autenticar, async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    const novoUsuario = await UsuarioService.criarUsuario({
      nome,
      email,
      senha,
      role: role || 'user',
    });

    res.status(201).json(novoUsuario);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Erro ao criar usuário' });
  }
});

router.delete('/:id', autenticar, async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = Number(id);
    const authUserId = (req as any).usuario?.id;

    if (usuarioId === authUserId) {
      return res.status(400).json({ message: 'Você não pode deletar a sua própria conta.' });
    }

    await UsuarioService.deletarUsuario(usuarioId);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
});

export default router;