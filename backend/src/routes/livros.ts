import { Router } from 'express';
import { LivroService } from '../services/LivroService';
import { autenticar } from '../middleware/auth';

const router = Router();

router.get('/', autenticar, async (_, res) => {
  const livros = await LivroService.listar();
  res.json(livros);
});

router.get('/disponiveis', autenticar, async (_, res) => {
  const livros = await LivroService.listarDisponiveis();
  res.json(livros);
});

router.get('/:id', autenticar, async (req, res) => {
  const id = parseInt(req.params.id);
  const livro = await LivroService.buscarPorId(id);

  if (!livro) {
    return res.status(404).json({ message: 'Livro não encontrado' });
  }

  res.json(livro);
});

export default router;
