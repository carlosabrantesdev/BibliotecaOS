'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Painel() {
  const { role } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (role === null) {
      router.push('/');
    }
  }, [role, router]);

  // Show loading state while checking auth
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
                  <h3 className="text-4xl font-bold text-[#191c1e]">142.850</h3>
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
                  <h3 className="text-4xl font-bold text-[#0058be]">3.241</h3>
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
                  <h3 className="text-4xl font-bold text-[#ba1a1a]">187</h3>
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
                  <p className="text-xs text-[#45464d] uppercase tracking-wider mb-1 font-semibold">Novos Leitores</p>
                  <h3 className="text-4xl font-bold text-[#191c1e]">45</h3>
                </div>
                <div className="p-3 bg-[#d3e4fe]/50 rounded-lg text-black">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Section */}
          <div className="md:col-span-8 flex flex-col gap-8">
            {/* Chart Area Placeholder */}
            <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-6 shadow-sm flex flex-col h-96">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#191c1e]">Estatísticas de Empréstimo</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-[#e6e8ea] rounded-md text-[#191c1e]">Semanal</button>
                  <button className="px-3 py-1 text-sm text-[#45464d] hover:bg-[#f2f4f6] rounded-md transition-colors">Mensal</button>
                </div>
              </div>
              <div className="flex-1 bg-[#f7f9fb] border border-[#c6c6cd]/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #c6c6cd 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #c6c6cd 40px)'}}></div>
                <div className="flex items-end h-full w-full px-8 pb-8 pt-12 gap-4 opacity-70">
                  <div className="w-1/6 bg-[#adc6ff] rounded-t-sm h-1/3"></div>
                  <div className="w-1/6 bg-[#adc6ff] rounded-t-sm h-1/2"></div>
                  <div className="w-1/6 bg-[#adc6ff] rounded-t-sm h-3/4"></div>
                  <div className="w-1/6 bg-[#0058be] rounded-t-sm h-full relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#e0e3e5] px-2 py-1 rounded text-xs font-bold shadow-sm">Pico</div>
                  </div>
                  <div className="w-1/6 bg-[#adc6ff] rounded-t-sm h-2/3"></div>
                  <div className="w-1/6 bg-[#adc6ff] rounded-t-sm h-1/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-0 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-[#c6c6cd]/30 bg-[#f2f4f6]/30">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#191c1e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ba1a1a]">notifications_active</span>
                    Devoluções Urgentes
                  </h3>
                  <span className="bg-[#ba1a1a] text-white px-2 py-1 rounded-full text-[12px] font-semibold">Ações Necessárias</span>
                </div>
                <p className="text-sm text-[#45464d] mt-2">Itens com mais de 30 dias de atraso.</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white font-semibold text-[#45464d] text-sm border-b border-[#c6c6cd]/50">
                    <tr>
                      <th className="p-4">Leitor e Item</th>
                      <th className="p-4 text-right">Atraso</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#191c1e] divide-y divide-[#c6c6cd]/30">
                    <tr className="hover:bg-[#f2f4f6] transition-colors cursor-pointer">
                      <td className="p-4">
                        <p className="font-semibold">Michael Torres</p>
                        <p className="text-[#45464d] truncate w-48" title="Intro to Quantum Mechanics">Intro to Quantum Mechanics</p>
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[#ba1a1a] font-medium bg-[#ffdad6]/30 px-2 py-1 rounded">42 dias</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f2f4f6] transition-colors cursor-pointer">
                      <td className="p-4">
                        <p className="font-semibold">Elena Rostova</p>
                        <p className="text-[#45464d] truncate w-48" title="History of the Peloponnesian War">History of the Peloponnes...</p>
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[#ba1a1a] font-medium bg-[#ffdad6]/30 px-2 py-1 rounded">38 dias</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f2f4f6] transition-colors cursor-pointer">
                      <td className="p-4">
                        <p className="font-semibold">James Wilson</p>
                        <p className="text-[#45464d] truncate w-48" title="Principles of Economics">Principles of Economics</p>
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[#ba1a1a] font-medium bg-[#ffdad6]/30 px-2 py-1 rounded">31 dias</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-[#c6c6cd]/30 bg-white">
                <button className="w-full bg-black text-white font-semibold text-sm py-2 rounded-lg hover:bg-[#191c1e] transition-colors flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Enviar Lembretes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}