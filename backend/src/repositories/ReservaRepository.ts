import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ReservaRepository = {
  criar: async (data: { usuarioId: number, livroId: number, dataPrazo: Date }) => 
    await prisma.reserva.create({ data }),

  listarPorUsuario: async (usuarioId: number) => 
    await prisma.reserva.findMany({
      where: { usuarioId },
      include: { livro: true },
      orderBy: { dataReserva: 'desc' }
    }),

  atualizarStatus: async (id: number, status: string) => 
    await prisma.reserva.update({
      where: { id },
      data: { status }
    }),

  cancelar: async (id: number) => {
    const reserva = await prisma.reserva.findUnique({ where: { id } });
    if (!reserva) throw new Error('Reserva não encontrada');

    // Torna o livro disponível novamente
    await prisma.livro.update({
      where: { id: reserva.livroId },
      data: { disponivel: true }
    });

    return prisma.reserva.update({
      where: { id },
      data: { status: 'CANCELADA' }
    });
  }
};
