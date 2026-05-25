import { Router } from 'express';
import { LivroService } from '../services/LivroService';
import { autenticar } from '../middleware/auth';

const router = Router();

router.get('/', autenticar, async (_, res) => {
  const livros = await LivroService.listar();
  res.json(livros);
});

export default router;
