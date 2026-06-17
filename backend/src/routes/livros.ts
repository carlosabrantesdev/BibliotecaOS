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

router.post('/', autenticar, async (req, res) => {
  try {
    const { titulo, autor, linkImagem, disponivel } = req.body;
    
    if (!titulo || !autor) {
      return res.status(400).json({ message: 'Título e autor são obrigatórios' });
    }

    const novoLivro = await LivroService.criarLivro({
      titulo,
      autor,
      linkImagem,
      disponivel: disponivel !== undefined ? disponivel : true,
    });

    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar livro' });
  }
});

router.put('/:id', autenticar, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, autor, linkImagem, disponivel } = req.body;

    if (!titulo && !autor && linkImagem === undefined && disponivel === undefined) {
      return res.status(400).json({ message: 'Nenhum dado para atualizar foi fornecido' });
    }

    const livroAtualizado = await LivroService.atualizarLivro(id, {
      titulo,
      autor,
      linkImagem,
      disponivel,
    });

    res.json(livroAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar livro' });
  }
});

router.delete('/:id', autenticar, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await LivroService.deletarLivro(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar livro' });
  }
});

export default router;
