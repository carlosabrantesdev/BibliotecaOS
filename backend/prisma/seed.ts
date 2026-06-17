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
    { titulo: 'Dom Casmurro', autor: 'Machado de Assis', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61x1ZHomWUL.jpg'},
    { titulo: 'Capitães da Areia', autor: 'Jorge Amado', disponivel: false, linkImagem: 'https://m.media-amazon.com/images/I/81t7altQZxL.jpg' },
    { titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61TaHURu27L._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Grande Sertão: Veredas', autor: 'João Guimarães Rosa', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81NtboFZziL.jpg'},
    { titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', disponivel: false, linkImagem: 'https://m.media-amazon.com/images/I/91GAAzBixYL._UF1000,1000_QL80_.jpg'},
    { titulo: 'O Cortiço', autor: 'Aluísio Azevedo', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61hI7QLrTkL._AC_UF1000,1000_QL80_.jpg'},
  ];

  for (const livro of livros) {
    await prisma.livro.create({ data: livro });
  }

  console.log('Seed concluído: 2 usuários e 6 livros criados.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
