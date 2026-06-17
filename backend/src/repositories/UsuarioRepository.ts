import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UsuarioRepository = {
  buscarPorEmail: (email: string) =>
    prisma.usuario.findUnique({ where: { email } }),

  criar: async (dados: { nome: string; email: string; senha: string; role: string }) => {
    return await prisma.usuario.create({
      data: dados,
    });
  },
};
