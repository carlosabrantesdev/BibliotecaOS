'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmprestimosPage() {
  const { role, authLoaded } = useAuth();
  const router = useRouter();

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

  const stats = [
    { label: "Total Ativo", value: "1,248", variant: "default" },
    { label: "Vence Hoje", value: "42", variant: "default" },
    { label: "Atrasado", value: "18", variant: "error" },
  ];

  const loans = [
    {
      id: "STD-8492",
      reader: "Ana Beatriz Silva",
      title: "Dom Casmurro",
      author: "Machado de Assis",
      loanDate: "10 de Mai, 2026",
      dueDate: "24 de Mai, 2026",
      status: "No Prazo",
      statusColor: "bg-[#e6e8ea] text-black",
    },
    {
      id: "FAC-1042",
      reader: "Ricardo Oliveira",
      title: "Capitães da Areia",
      author: "Jorge Amado",
      loanDate: "20 de Abr, 2026",
      dueDate: "04 de Mai, 2026",
      status: "Atrasado (21 dias)",
      statusColor: "bg-[#ffdad6] text-[#93000a]",
    },
    {
      id: "STD-9921",
      reader: "Mariana Costa",
      title: "A Hora da Estrela",
      author: "Clarice Lispector",
      loanDate: "15 de Mai, 2026",
      dueDate: "29 de Mai, 2026",
      status: "No Prazo",
      statusColor: "bg-[#e6e8ea] text-black",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb]">

      <main className="p-4 md:p-8 flex flex-col gap-12 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Empréstimos Ativos</h1>
            <p className="text-[#45464d] mt-1">Gerencie os empréstimos atuais e acompanhe itens atrasados.</p>
          </div>
          <button className="bg-[#131b2e] text-white hover:bg-black px-6 py-2.5 rounded font-semibold transition-colors flex items-center justify-center gap-2 w-fit">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Novo Empréstimo
          </button>
        </div>

        {/* Stats/Filter Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                stat.variant === 'error'
                ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/20'
                : 'bg-white border-[#e0e3e5]'
              }`}
            >
              <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                stat.variant === 'error' ? 'text-[#ba1a1a] flex items-center gap-1' : 'text-[#45464d]'
              }`}>
                {stat.variant === 'error' && <span className="material-symbols-outlined text-[16px]">warning</span>}
                {stat.label}
              </div>
              <div className={`text-2xl font-bold ${stat.variant === 'error' ? 'text-[#ba1a1a]' : 'text-black'}`}>
                {stat.value}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end">
            <button className="border border-[#c6c6cd] text-[#45464d] hover:bg-[#f2f4f6] px-4 py-2 rounded font-semibold flex items-center gap-2 transition-colors text-sm">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Opções de Filtro
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-[#e0e3e5] rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f4f6] border-b border-[#e0e3e5] text-[#45464d] text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4 font-semibold">Leitor</th>
                  <th className="p-4 font-semibold">Título do Livro</th>
                  <th className="p-4 font-semibold">Data do Empréstimo</th>
                  <th className="p-4 font-semibold">Data de Vencimento</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#191c1e] divide-y divide-[#e0e3e5]">
                {loans.map((loan, idx) => (
                  <tr key={idx} className="hover:bg-[#f7f9fb] transition-colors group">
                    <td className="p-4">
                      <div className="font-semibold text-black">{loan.reader}</div>
                      <div className="text-[#45464d] text-xs mt-0.5">ID: {loan.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{loan.title}</div>
                      <div className="text-[#45464d] text-xs mt-0.5">{loan.author}</div>
                    </td>
                    <td className="p-4 text-[#45464d]">{loan.loanDate}</td>
                    <td className={`p-4 ${loan.status.includes('Atrasado') ? 'text-[#ba1a1a] font-semibold' : 'text-[#45464d]'}`}>
                      {loan.dueDate}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${loan.statusColor}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#0058be] hover:bg-[#d8e2ff]/50 px-2 py-1 rounded text-xs font-semibold transition-colors">Renovar</button>
                        <button className="border border-[#c6c6cd] hover:bg-[#f2f4f6] px-2 py-1 rounded text-xs font-semibold transition-colors">Devolver</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-[#e0e3e5] flex items-center justify-between text-xs text-[#45464d]">
            <div>Mostrando 1 a 3 de 1.248 registros</div>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-[#f2f4f6] rounded transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0058be] text-white font-semibold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f2f4f6] transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f2f4f6] transition-colors">3</button>
              <span className="px-1">...</span>
              <button className="p-1 hover:bg-[#f2f4f6] rounded transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
