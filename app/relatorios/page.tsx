'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Relatorios() {
  const { role, authLoaded } = useAuth();
  const router = useRouter();

  // Redirect if not logged in or wrong role
  useEffect(() => {
    if (!authLoaded) return;
    if (role === null) router.push('/');
  }, [role, authLoaded, router]);

  if (!authLoaded || role === null) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7f9fb] text-[#191c1e]">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0058be] mb-4"></div>
            <p className="text-[#45464d]">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      <div className="p-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#191c1e] mb-2">Relatórios</h1>
          <p className="text-[#45464d] mb-8">Visualize relatórios e estatísticas da biblioteca</p>

          <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-[#c6c6cd] text-6xl mb-4">analytics</span>
            <h2 className="text-xl font-semibold text-[#191c1e] mb-2">Relatórios da Biblioteca</h2>
            <p className="text-[#45464d] max-w-md mx-auto">
              Aqui você pode visualizar relatórios sobre empréstimos, leitores e desempenho da biblioteca.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}