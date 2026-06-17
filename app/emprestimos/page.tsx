'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmprestimosPage() {
  const { role, authLoaded, token } = useAuth();
  const router = useRouter();
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({ totalAtivos: 0, venceHoje: 0, atrasados: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoEmprestimo, setNovoEmprestimo] = useState({
    usuarioId: '',
    livroId: '',
    dataPrazo: '',
  });

  useEffect(() => {
    if (!authLoaded) return;
    if (role === null) router.push('/');
  }, [role, authLoaded, router]);

  useEffect(() => {
    async function fetchLoans() {
      if (!authLoaded || !token) return;
      try {
        const response = await fetch('http://localhost:3001/api/emprestimos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setLoans(data.loans || []);
        setStats(data.stats || { totalAtivos: 0, venceHoje: 0, atrasados: 0 });
      } catch (error) {
        console.error('Erro ao carregar empréstimos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLoans();
  }, [authLoaded, token]);

  const handleCriarEmprestimo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/emprestimos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          ...novoEmprestimo,
          usuarioId: parseInt(novoEmprestimo.usuarioId),
          livroId: parseInt(novoEmprestimo.livroId),
        }),
      });

      if (response.ok) {
        alert('Empréstimo criado com sucesso!');
        setIsModalOpen(false);
        setNovoEmprestimo({ usuarioId: '', livroId: '', dataPrazo: '' });
        // Refresh data
        const dataResponse = await fetch('http://localhost:3001/api/emprestimos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await dataResponse.json();
        setLoans(data.loans);
        setStats(data.stats);
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error || 'Erro ao criar empréstimo'}`);
      }
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      alert('Erro de conexão com o servidor');
    }
  };

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

  const statsCards = [
    { label: "Total Ativo", value: stats.totalAtivos, variant: "default" },
    { label: "Vence Hoje", value: stats.venceHoje, variant: "default" },
    { label: "Atrasado", value: stats.atrasados, variant: "error" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb]">

      <main className="p-4 md:p-8 flex flex-col gap-12 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Empréstimos Ativos</h1>
            <p className="text-[#45464d] mt-1">Gerencie os empréstimos atuais e acompanhe itens atrasados.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#131b2e] text-white hover:bg-black px-6 py-2.5 rounded font-semibold transition-colors flex items-center justify-center gap-2 w-fit"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Novo Empréstimo
          </button>
        </div>

        {/* Stats/Filter Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsCards.map((stat, idx) => (
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
              <div className="text-2xl font-bold text-black">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-xl border border-[#e0e3e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-[#e0e3e5] text-[#45464d] text-sm uppercase font-semibold">
                  <th className="px-6 py-4">Leitor</th>
                  <th className="px-6 py-4">Livro</th>
                  <th className="px-6 py-4">Data Empréstimo</th>
                  <th className="px-6 py-4">Data Prazo</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e3e5]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-[#45464d]">Carregando empréstimos...</td>
                  </tr>
                ) : loans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-[#45464d]">Nenhum empréstimo ativo encontrado.</td>
                  </tr>
                ) : (
                  loans.map((loan: any) => {
                    const isOverdue = new Date(loan.dataPrazo) < new Date();
                    return (
                      <tr key={loan.id} className="hover:bg-[#fcfdfe] transition-colors">
                        <td className="px-6 py-4 font-medium text-black">
                          <div>{loan.usuario.nome}</div>
                          <div className="text-xs text-[#45464d]">ID: {loan.usuario.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-black font-medium">{loan.livro.titulo}</div>
                          <div className="text-xs text-[#45464d]">{loan.livro.autor} (ID: {loan.livro.id})</div>
                        </td>
                        <td className="px-6 py-4 text-[#45464d] text-sm">{formatDate(loan.dataReserva)}</td>
                        <td className="px-6 py-4 text-[#45464d] text-sm">{formatDate(loan.dataPrazo)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isOverdue ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#e6e8ea] text-black'
                          }`}>
                            {isOverdue ? 'Atrasado' : 'No Prazo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={async () => {
                              if (confirm('Deseja concluir este empréstimo?')) {
                                try {
                                  await fetch(`http://localhost:3001/api/emprestimos/${loan.id}/conclude`, {
                                    method: 'PATCH',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  // Refresh data
                                  const response = await fetch('http://localhost:3001/api/emprestimos', {
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  const data = await response.json();
                                  setLoans(data.loans);
                                  setStats(data.stats);
                                } catch (e) {
                                  alert('Erro ao concluir empréstimo');
                                }
                              }
                            }}
                            className="text-[#0058be] hover:text-[#003d82] font-semibold text-sm"
                          >
                            Concluir
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <LoanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCriarEmprestimo} 
        formData={novoEmprestimo} 
        setFormData={setNovoEmprestimo} 
      />
    </div>
  );
}

function LoanModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (e: React.FormEvent) => void; 
  formData: any; 
  setFormData: (data: any) => void; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Novo Empréstimo</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">ID do Usuário</label>
            <input 
              required
              type="number"
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.usuarioId}
              onChange={(e) => setFormData({ ...formData, usuarioId: e.target.value })}
              placeholder="Ex: 1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">ID do Livro</label>
            <input 
              required
              type="number"
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.livroId}
              onChange={(e) => setFormData({ ...formData, livroId: e.target.value })}
              placeholder="Ex: 10"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Data de Prazo</label>
            <input 
              required
              type="date"
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.dataPrazo}
              onChange={(e) => setFormData({ ...formData, dataPrazo: e.target.value })}
            />
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#c6c6cd] rounded font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-black text-white rounded font-semibold hover:bg-[#0b1c30] transition-colors"
            >
              Confirmar Empréstimo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}