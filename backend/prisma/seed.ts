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
    { titulo: 'Dom Casmurro', autor: 'Machado de Assis', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61x1ZHomWUL.jpg' },
    { titulo: 'Capitães da Areia', autor: 'Jorge Amado', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81t7altQZxL.jpg' },
    { titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61TaHURu27L._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Grande Sertão: Veredas', autor: 'João Guimarães Rosa', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81NtboFZziL.jpg' },
    { titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/91GAAzBixYL._UF1000,1000_QL80_.jpg' },
    { titulo: 'O Cortiço', autor: 'Aluísio Azevedo', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61hI7QLrTkL._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Vidas Secas', autor: 'Graciliano Ramos', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/618-b9Im6dL.jpg' },
    { titulo: 'Iracema', autor: 'José de Alencar', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/71LCDi6E2oL.jpg' },
    { titulo: 'O Alienista', autor: 'Machado de Assis', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61+cCiPBnWL._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'A Moreninha', autor: 'Joaquim Manuel de Macedo', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61Q6vZZzTML._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Senhora', autor: 'José de Alencar', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/711tJRe6LML.jpg' },
    { titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81TmOZIXvzL._AC_UF1000,1000_QL80_.jpg' },
    { titulo: '1984', autor: 'George Orwell', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'A Revolução dos Bichos', autor: 'George Orwell', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/61jgm6ooXzL._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Percy Jackson e o Ladrão de Raios', autor: 'Rick Riordan', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81mfMi0ni+L._UF1000,1000_QL80_.jpg' },
    { titulo: 'Naruto Vol. 1', autor: 'Masashi Kishimoto', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/91xUwI2UEVL.jpg' },
    { titulo: 'One Piece Vol. 1', autor: 'Eiichiro Oda', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/716EGgqzyOL.jpg' },
    { titulo: 'Attack on Titan Vol. 1', autor: 'Hajime Isayama', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81qPzeEO5IL.jpg' },
    { titulo: 'Death Note Vol. 1', autor: 'Tsugumi Ohba', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/81iDNjn-r3L._AC_UF1000,1000_QL80_.jpg' },
    { titulo: 'Demon Slayer Vol. 1', autor: 'Koyoharu Gotouge', disponivel: true, linkImagem: 'https://m.media-amazon.com/images/I/71oZmNhST-L._AC_UF1000,1000_QL80_.jpg' }
  ];

  for (const livro of livros) {
    await prisma.livro.create({ data: livro });
  }

  console.log('Seed concluído: usuários e livros criados.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
