'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const { role, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  // Admin routes
  const adminRoutes = [
    { path: '/painel', icon: 'dashboard', label: 'Painel' },
    { path: '/catalogo', icon: 'menu_book', label: 'Catálogo' },
    { path: '/emprestimos', icon: 'swap_horiz', label: 'Empréstimos' },
    { path: '/leitores', icon: 'group', label: 'Leitores' },
    { path: '/relatorios', icon: 'analytics', label: 'Relatórios' },
  ];

  // User routes
  const userRoutes = [
    { path: '/explorar', icon: 'explore', label: 'Explorar' },
    { path: '/reservas', icon: 'event', label: 'Reservas' },
    { path: '/favoritos', icon: 'favorite', label: 'Favoritos' },
  ];

  // Determine which routes to show based on role
  const routes = role === 'admin' ? adminRoutes : userRoutes;

  return (
    <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col h-screen w-64 bg-[#f2f4f6] border-r border-[#c6c6cd] py-2 flex-shrink-0 sticky top-0 transition-all duration-300`}>
      <div className="px-6 mb-12 pt-2">
        <h1 className="text-xl font-bold text-black">Biblioteca</h1>
        <p className="text-xs text-[#45464d] uppercase tracking-widest mt-1">
          {role === 'admin' ? 'ADMINISTRAÇÃO' : 'PORTAL DO LEITOR'}
        </p>
      </div>
      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`flex items-center px-4 py-3 rounded transition-all duration-200 group ${
              isActive(route.path)
                ? 'text-[#0058be] border-r-4 border-[#0058be] font-bold bg-[#d8e2ff]/10'
                : 'text-[#45464d] hover:text-black hover:bg-[#e6e8ea]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">
              {route.icon}
            </span>
            <span className="text-sm font-semibold">{route.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto px-4 pb-2">
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 rounded text-[#45464d] hover:text-black hover:bg-[#e6e8ea] transition-all duration-200 group w-full text-left"
        >
          <span className="material-symbols-outlined mr-3 group-hover:text-black transition-colors">logout</span>
          <span className="text-sm font-semibold">Sair</span>
        </button>
      </div>
    </nav>
  );
}
