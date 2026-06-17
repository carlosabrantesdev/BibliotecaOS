import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardRepository {
  async getTotalLivros() {
    return await prisma.livro.count();
  }

  async getTotalUsuarios() {
    return await prisma.usuario.count();
  }

  async getEmprestimosAtivos() {
    return await prisma.reserva.count({
      where: {
        status: 'ATIVA',
      },
    });
  }

  async getDevolucoesAtrasadas() {
    const agora = new Date();
    return await prisma.reserva.count({
      where: {
        status: 'ATIVA',
        dataPrazo: {
          lt: agora,
        },
      },
    });
  }

  async getDashboardStats() {
    const [totalLivros, totalUsuarios, emprestimosAtivos, devolucoesAtrasadas] = await Promise.all([
      this.getTotalLivros(),
      this.getTotalUsuarios(),
      this.getEmprestimosAtivos(),
      this.getDevolucoesAtrasadas(),
    ]);

    return {
      totalLivros,
      totalUsuarios,
      emprestimosAtivos,
      devolucoesAtrasadas,
    };
  }
}
