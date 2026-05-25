import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex justify-between items-center px-4 md:px-8 py-4 bg-[#e0e3e5] border-t border-[#c6c6cd] text-sm text-[#45464d]">
      <p>© 2026 Biblioteca. Sistema de Gerenciamento de Biblioteca.</p>
      <nav className="flex gap-6">
        <Link href="#" className="hover:text-black transition-colors focus:outline-none focus:underline">Ajuda</Link>
        <Link href="#" className="hover:text-black transition-colors focus:outline-none focus:underline">Termos de Uso</Link>
        <Link href="#" className="hover:text-black transition-colors focus:outline-none focus:underline">Privacidade</Link>
      </nav>
    </footer>
  );
}