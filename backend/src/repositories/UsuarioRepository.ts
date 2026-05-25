import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UsuarioRepository = {
  buscarPorEmail: (email: string) =>
    prisma.usuario.findUnique({ where: { email } }),
};
