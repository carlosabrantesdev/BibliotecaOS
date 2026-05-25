import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const LivroRepository = {
  listarTodos: () =>
    prisma.livro.findMany({ orderBy: { criadoEm: 'desc' } }),
};
