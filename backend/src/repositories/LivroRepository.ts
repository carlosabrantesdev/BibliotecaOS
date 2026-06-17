import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const LivroRepository = {
  listarTodos: () =>
    prisma.livro.findMany({ orderBy: { criadoEm: 'desc' } }),

  listarDisponiveis: () =>
    prisma.livro.findMany({
      where: { disponivel: true },
      orderBy: { criadoEm: 'desc' },
    }),

  buscarPorId: (id: number) =>
    prisma.livro.findUnique({
      where: { id },
    }),
};
