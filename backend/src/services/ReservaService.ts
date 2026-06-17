import { ReservaRepository } from '../repositories/ReservaRepository';
import { LivroRepository } from '../repositories/LivroRepository';

export const ReservaService = {
  reservar: async (usuarioId: number, livroId: number) => {
    const livro = await LivroRepository.buscarPorId(livroId);
    if (!livro) throw new Error('Livro não encontrado');
    if (!livro.disponivel) throw new Error('Livro já está reservado');

    // Define prazo de 7 dias para retirada
    const dataPrazo = new Date();
    dataPrazo.setDate(dataPrazo.getDate() + 7);

    const reserva = await ReservaRepository.criar({
      usuarioId,
      livroId,
      dataPrazo
    });

    // Marca o livro como indisponível
    await prisma.livro.update({
      where: { id: livroId },
      data: { disponivel: false }
    });

    return reserva;
  },

  listarMinhasReservas: (usuarioId: number) => 
    ReservaRepository.listarPorUsuario(usuarioId),

  confirmarRetirada: async (reservaId: number) => {
    return ReservaRepository.atualizarStatus(reservaId, 'CONCLUIDA');
  },

  cancelarReserva: (reservaId: number) => 
    ReservaRepository.cancelar(reservaId)
};

// Importação necessária para o update do livro no service
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
