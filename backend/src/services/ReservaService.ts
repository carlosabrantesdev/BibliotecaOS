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

  listarMinhasReservas: async (usuarioId: number) => {
    try {
      return await ReservaRepository.listarPorUsuario(usuarioId);
    } catch (error) {
      console.error('Erro em ReservaService.listarMinhasReservas:', error);
      throw error;
    }
  },

  confirmarRetirada: async (reservaId: number) => {
    const reserva = await ReservaRepository.atualizarStatus(reservaId, 'CONCLUIDA');
    
    // O livro continua indisponível pois agora está com o usuário (emprestado)
    // Se houvesse um sistema de empréstimo separado, aqui faríamos a transição.
    
    return reserva;
  },

  cancelarReserva: (reservaId: number) => 
    ReservaRepository.cancelar(reservaId)
};

// Importação necessária para o update do livro no service
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
