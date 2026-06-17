import { Router } from 'express';
import { ReservaService } from '../services/ReservaService';
import { autenticar } from '../middleware/auth';

const router = Router();

router.post('/', autenticar, async (req, res) => {
  try {
    const { livroId } = req.body;
    const usuarioId = (req as any).usuario.id;

    if (!livroId) return res.status(400).json({ message: 'ID do livro é obrigatório' });

    const reserva = await ReservaService.reservar(usuarioId, livroId);
    res.status(201).json(reserva);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/minhas', autenticar, async (req, res) => {
  try {
    const usuarioId = (req as any).usuario.id;
    const reservas = await ReservaService.listarMinhasReservas(usuarioId);
    res.json(reservas);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.patch('/:id/confirmar', autenticar, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await ReservaService.confirmarRetirada(id);
    res.json({ message: 'Retirada confirmada' });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', autenticar, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await ReservaService.cancelarReserva(id);
    res.json({ message: 'Reserva cancelada' });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
