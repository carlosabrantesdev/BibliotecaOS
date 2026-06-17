'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const COVER_PLACEHOLDER = 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
  linkImagem?: string;
}

export default function Catalogo() {
  const { role, authLoaded } = useAuth();
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoaded) return;
    if (role === null) {
      router.push('/');
      return;
    }
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/livros`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error('Erro ao carregar livros:', err))
      .finally(() => setLoading(false));
  }, [role, authLoaded, router]);

  if (!authLoaded || loading) {
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
      {/* Canvas */}
      <div className="p-8 flex-1 bg-[#f7f9fb]">
        {/* Page Header & Primary Action */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-black">Catálogo de Livros</h2>
            <p className="text-base text-[#45464d] mt-2">Gerencie ativos da biblioteca, rastreie disponibilidade e atualize metadados.</p>
          </div>
          <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#0b1c30] transition-colors shadow-sm flex items-center">
            <span className="material-symbols-outlined text-[20px] mr-2">add</span>
            Adicionar Livro
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-6 border border-[#c6c6cd] rounded-lg mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-5 relative">
              <label className="block text-sm font-semibold text-[#45464d] mb-2">Pesquisar Título ou Autor</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#76777d]">search</span>
                <input className="w-full pl-12 pr-4 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] text-black placeholder-[#76777d] text-base transition-colors" placeholder="Ex: Algoritmos, Knuth" type="text" />
              </div>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold text-[#45464d] mb-2">Status</label>
              <select className="w-full px-4 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] text-black text-base appearance-none">
                <option>Qualquer Status</option>
                <option>Disponível</option>
                <option>Emprestado</option>
                <option>Reservado</option>
                <option>Manutenção</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid Layout for Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {livros.length === 0
            ? (
              <p className="text-[#45464d] col-span-4 py-8 text-center">
                Não há livros cadastrados no momento.
              </p>
            )
            : livros.map((livro) => {
              const statusColor = livro.disponivel
                ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]'
                : 'bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]';
              const statusLabel = livro.disponivel ? 'Disponível' : 'Emprestado';
              return (
                <div key={livro.id} className="bg-white border border-[#c6c6cd] rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="h-48 bg-[#e6e8ea] relative flex items-center justify-center border-b border-[#c6c6cd] overflow-hidden">
                    <img alt={`Capa de ${livro.titulo}`} className="w-full h-full object-cover opacity-90 mix-blend-multiply" src={livro.linkImagem || COVER_PLACEHOLDER} />
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-semibold border ${statusColor}`}>
                      {statusLabel}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-black mb-1 line-clamp-2">{livro.titulo}</h3>
                    <p className="text-sm text-[#45464d] mb-4">{livro.autor}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f2f4f6]">
                      <button className="text-sm font-semibold text-[#0058be] hover:text-[#0b1c30] transition-colors">Ver Detalhes</button>
                      <div className="flex space-x-2">
                        <button className="text-[#76777d] hover:text-black transition-colors p-1" title="Editar">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="text-[#76777d] hover:text-red-600 transition-colors p-1" title="Remover">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
