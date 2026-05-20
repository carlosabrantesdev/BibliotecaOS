'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 bg-[#f2f4f6] border-r border-[#c6c6cd] py-2 flex-shrink-0">
      <div className="px-6 mb-12 pt-2">
        <h1 className="text-xl font-bold text-black">Biblioteca</h1>
        <p className="text-xs text-[#45464d] uppercase tracking-widest mt-1">Arquivo Acadêmico</p>
      </div>
      <div className="flex-1 px-4 space-y-2">
        <Link href="/" className={`flex items-center px-4 py-3 rounded transition-all duration-200 group ${isActive('/painel') ? 'text-black bg-[#e6e8ea]' : 'text-[#45464d] hover:text-black hover:bg-[#e6e8ea]'}`}>
          <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">dashboard</span>
          <span className="text-sm font-semibold">Painel</span>
        </Link>
        <Link href="/catalogo" className={`flex items-center px-4 py-3 rounded transition-all duration-200 ${isActive('/catalogo') ? 'text-[#0058be] border-r-4 border-[#0058be] font-bold bg-[#d8e2ff]/10' : 'text-[#45464d] hover:text-black hover:bg-[#e6e8ea] group'}`}>
          <span className="material-symbols-outlined mr-3">menu_book</span>
          <span className="text-sm font-semibold">Catálogo</span>
        </Link>
        <Link href="/emprestimo" className={`flex items-center px-4 py-3 rounded transition-all duration-200 group ${isActive('/emprestimo') ? 'text-black bg-[#e6e8ea]' : 'text-[#45464d] hover:text-black hover:bg-[#e6e8ea]'}`}>
          <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">swap_horiz</span>
          <span className="text-sm font-semibold">Empréstimos</span>
        </Link>
        <Link href="/leitores" className={`flex items-center px-4 py-3 rounded transition-all duration-200 group ${isActive('/leitores') ? 'text-black bg-[#e6e8ea]' : 'text-[#45464d] hover:text-black hover:bg-[#e6e8ea]'}`}>
          <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">group</span>
          <span className="text-sm font-semibold">Leitores</span>
        </Link>
        <Link href="/relatorios" className={`flex items-center px-4 py-3 rounded transition-all duration-200 group ${isActive('/relatorios') ? 'text-black bg-[#e6e8ea]' : 'text-[#45464d] hover:text-black hover:bg-[#e6e8ea]'}`}>
          <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">analytics</span>
          <span className="text-sm font-semibold">Relatórios</span>
        </Link>
      </div>
      <div className="mt-auto px-4 pb-2">
        <a href="#" className="flex items-center px-4 py-3 rounded text-[#45464d] hover:text-black hover:bg-[#e6e8ea] transition-all duration-200 group">
          <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">help</span>
          <span className="text-sm font-semibold">Central de Ajuda</span>
        </a>
      </div>
    </nav>
  );
}
