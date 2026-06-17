'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Painel() {
  const { role, token, authLoaded } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalLivros: 0,
    emprestimosAtivos: 0,
    devolucoesAtrasadas: 0,
    totalUsuarios: 0,
  });

  useEffect(() => {
    if (authLoaded && role === null) {
      router.push('/');
    }
  }, [authLoaded, role, router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    }

    if (role) {
      fetchStats();
    }
  }, [role, token]);

  if (role === null) {
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

      {/* Main Content */}
      <div className="p-8 flex-1">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Summary Cards */}
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
            {/* Card 1 */}
            <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-[#45464d] uppercase tracking-wider mb-1 font-semibold">Total de Livros</p>
                  <h3 className="text-4xl font-bold text-[#191c1e]">{stats.totalLivros}</h3>
                </div>
                <div className="p-3 bg-[#dae2fd]/20 rounded-lg text-black">
                  <span className="material-symbols-outlined">library_books</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#dae2fd]/10 rounded-full blur-xl group-hover:bg-[#dae2fd]/20 transition-all"></div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-[#45464d] uppercase tracking-wider mb-1 font-semibold">Empréstimos Ativos</p>
                  <h3 className="text-4xl font-bold text-[#0058be]">{stats.emprestimosAtivos}</h3>
                </div>
                <div className="p-3 bg-[#d8e2ff]/50 rounded-lg text-[#0058be]">
                  <span className="material-symbols-outlined">import_contacts</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#ffdad6] rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-[#93000a] uppercase tracking-wider mb-1 font-semibold">Devoluções Atrasadas</p>
                  <h3 className="text-4xl font-bold text-[#ba1a1a]">{stats.devolucoesAtrasadas}</h3>
                </div>
                <div className="p-3 bg-[#ffdad6]/50 rounded-lg text-[#ba1a1a]">
                  <span className="material-symbols-outlined">warning</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-[#45464d] uppercase tracking-wider mb-1 font-semibold">Leitores</p>
                  <h3 className="text-4xl font-bold text-[#191c1e]">{stats.totalUsuarios}</h3>
                </div>
                <div className="p-3 bg-[#d3e4fe]/50 rounded-lg text-black">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}