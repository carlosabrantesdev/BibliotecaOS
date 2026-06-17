import { Router } from 'express';
import { EmprestimoService } from '../services/EmprestimoService';
import { autenticar } from '../middleware/auth';

const router = Router();
const service = new EmprestimoService();

router.get('/', autenticar, async (req, res) => {
  try {
    const loans = await service.listAll();
    const stats = await service.getStats();
    res.json({ loans, stats });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', autenticar, async (req, res) => {
  try {
    const { usuarioId, livroId, dataPrazo } = req.body;
    const loan = await service.create({
      usuarioId,
      livroId,
      dataPrazo: new Date(dataPrazo),
    });
    res.status(201).json(loan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id/conclude', autenticar, async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await service.conclude(parseInt(id));
    res.json(loan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { router as emprestimoRouter };
