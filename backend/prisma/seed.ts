import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminSenha = await bcrypt.hash('admin123', 10);
  const userSenha = await bcrypt.hash('usuario123', 10);

  await prisma.usuario.upsert({
    where: { email: 'admin@biblioteca.com' },
    update: {},
    create: { email: 'admin@biblioteca.com', senha: adminSenha, role: 'admin', nome: 'Administrador' },
  });

  await prisma.usuario.upsert({
    where: { email: 'usuario@biblioteca.com' },
    update: {},
    create: { email: 'usuario@biblioteca.com', senha: userSenha, role: 'user', nome: 'Leitor Padrão' },
  });

  const livros = [
    { titulo: 'Dom Casmurro', autor: 'Machado de Assis', disponivel: true },
    { titulo: 'Capitães da Areia', autor: 'Jorge Amado', disponivel: false },
    { titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', disponivel: true },
    { titulo: 'Grande Sertão: Veredas', autor: 'João Guimarães Rosa', disponivel: true },
    { titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', disponivel: false },
    { titulo: 'O Cortiço', autor: 'Aluísio Azevedo', disponivel: true },
  ];

  for (const livro of livros) {
    await prisma.livro.create({ data: livro });
  }

  console.log('Seed concluído: 2 usuários e 6 livros criados.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
