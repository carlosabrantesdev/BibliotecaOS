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

  criar: async (dados: { titulo: string; autor: string; linkImagem?: string; disponivel: boolean }) => {
    return await prisma.livro.create({
      data: {
        ...dados,
        linkImagem: dados.linkImagem || '',
      },
    });
  },

  atualizar: async (id: number, dados: { titulo?: string; autor?: string; linkImagem?: string; disponivel?: boolean }) => {
    return await prisma.livro.update({
      where: { id },
      data: dados,
    });
  },

  deletar: async (id: number) => {
    return await prisma.livro.delete({
      where: { id },
    });
  },
};
