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

  deletar: async (id: number) => {
    try {
      // Deleta as reservas vinculadas ao usuário para evitar erro de constraint de chave estrangeira
      await prisma.reserva.deleteMany({
        where: { usuarioId: id },
      });

      return await prisma.usuario.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Erro ao deletar usuário no repositório:', error);
      throw error;
    }
  },
};
