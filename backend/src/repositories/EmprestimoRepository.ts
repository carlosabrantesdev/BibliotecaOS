import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EmprestimoRepository {
  async findAll() {
    return prisma.reserva.findMany({
      where: {
        status: 'ATIVA',
      },
      include: {
        usuario: true,
        livro: true,
      },
    });
  }

  async create(data: { usuarioId: number; livroId: number; dataPrazo: Date }) {
    // Mark book as unavailable
    await prisma.livro.update({
      where: { id: data.livroId },
      data: { disponivel: false },
    });

    return prisma.reserva.create({
      data: {
        usuarioId: data.usuarioId,
        livroId: data.livroId,
        dataPrazo: data.dataPrazo,
        status: 'ATIVA',
      },
    });
  }

  async findStats() {
    const totalAtivos = await prisma.reserva.count({
      where: { status: 'ATIVA' },
    });

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const fimHoje = new Date();
    fimHoje.setHours(23, 59, 59, 999);

    const venceHoje = await prisma.reserva.count({
      where: {
        status: 'ATIVA',
        dataPrazo: {
          gte: hoje,
          lte: fimHoje,
        },
      },
    });

    const atrasados = await prisma.reserva.count({
      where: {
        status: 'ATIVA',
        dataPrazo: {
          lt: hoje,
        },
      },
    });

    return {
      totalAtivos,
      venceHoje,
      atrasados,
    };
  }

  async conclude(id: number) {
    const reserva = await prisma.reserva.findUnique({
      where: { id },
      include: { livro: true },
    });

    if (!reserva) throw new Error('Reserva não encontrada');

    await prisma.livro.update({
      where: { id: reserva.livroId },
      data: { disponivel: true },
    });

    return prisma.reserva.update({
      where: { id },
      data: { status: 'CONCLUIDA' },
    });
  }
}
