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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLivro, setEditingLivro] = useState<Livro | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Qualquer Status');
  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
    autor: '',
    linkImagem: '',
    disponivel: true,
  });

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

  const handleAdicionarLivro = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/livros`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(novoLivro),
      });

      if (response.ok) {
        const livroCriado = await response.json();
        setLivros([livroCriado, ...livros]);
        setIsModalOpen(false);
        setNovoLivro({ titulo: '', autor: '', linkImagem: '', disponivel: true });
      } else {
        alert('Erro ao adicionar livro');
      }
    } catch (err) {
      console.error('Erro ao adicionar livro:', err);
      alert('Erro de conexão com o servidor');
    }
  };

  const handleUpdateLivro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLivro) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/livros/${editingLivro.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(novoLivro),
      });

      if (response.ok) {
        const livroAtualizado = await response.json();
        setLivros(livros.map(l => l.id === editingLivro.id ? livroAtualizado : l));
        setIsModalOpen(false);
        setEditingLivro(null);
        setNovoLivro({ titulo: '', autor: '', linkImagem: '', disponivel: true });
      } else {
        alert('Erro ao atualizar livro');
      }
    } catch (err) {
      console.error('Erro ao atualizar livro:', err);
      alert('Erro de conexão com o servidor');
    }
  };

  const handleDeletarLivro = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este livro?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/livros/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setLivros(livros.filter(l => l.id !== id));
      } else {
        alert('Erro ao deletar livro');
      }
    } catch (err) {
      console.error('Erro ao deletar livro:', err);
      alert('Erro de conexão com o servidor');
    }
  };

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#0b1c30] transition-colors shadow-sm flex items-center"
          >
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
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] text-black placeholder-[#76777d] text-base transition-colors" 
                  placeholder="Ex: Algoritmos, Knuth" 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold text-[#45464d] mb-2">Status</label>
              <select 
                className="w-full px-4 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] text-black text-base appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Qualquer Status</option>
                <option>Disponível</option>
                <option>Emprestado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid Layout for Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {livros
            .filter((livro) => {
              const matchesSearch = 
                livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                livro.autor.toLowerCase().includes(searchTerm.toLowerCase());
              
              const matchesStatus = 
                statusFilter === 'Qualquer Status' || 
                (statusFilter === 'Disponível' && livro.disponivel) || 
                (statusFilter === 'Emprestado' && !livro.disponivel);

              return matchesSearch && matchesStatus;
            })
            .length === 0
            ? (
              <p className="text-[#45464d] col-span-4 py-8 text-center">
                Não há livros que correspondam aos filtros.
              </p>
            )
            : livros
              .filter((livro) => {
                const matchesSearch = 
                  livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  livro.autor.toLowerCase().includes(searchTerm.toLowerCase());
                
                const matchesStatus = 
                  statusFilter === 'Qualquer Status' || 
                  (statusFilter === 'Disponível' && livro.disponivel) || 
                  (statusFilter === 'Emprestado' && !livro.disponivel);

                return matchesSearch && matchesStatus;
              })
              .map((livro) => {
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
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className="text-lg font-bold text-black line-clamp-2">{livro.titulo}</h3>
                      <span className="text-xs font-medium bg-[#eef2f6] text-[#5a5c62] px-2 py-1 rounded-md border border-[#d1d5db] whitespace-nowrap">ID: {livro.id}</span>
                    </div>
                    <p className="text-sm text-[#45464d] mb-4">{livro.autor}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f2f4f6]">
                      <button 
                        onClick={() => router.push(`/detalhes/${livro.id}`)}
                        className="text-sm font-semibold text-[#0058be] hover:text-[#0b1c30] transition-colors"
                      >
                        Ver Detalhes
                      </button>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setEditingLivro(livro);
                            setNovoLivro({
                              titulo: livro.titulo,
                              autor: livro.autor,
                              linkImagem: livro.linkImagem || '',
                              disponivel: livro.disponivel
                            });
                            setIsModalOpen(true);
                          }}
                          className="text-[#76777d] hover:text-black transition-colors p-1" 
                          title="Editar"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeletarLivro(livro.id)}
                          className="text-[#76777d] hover:text-red-600 transition-colors p-1" 
                          title="Remover"
                        >
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
      <AddBookModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingLivro(null);
          setNovoLivro({ titulo: '', autor: '', linkImagem: '', disponivel: true });
        }} 
        onSubmit={editingLivro ? handleUpdateLivro : handleAdicionarLivro} 
        formData={novoLivro} 
        setFormData={setNovoLivro} 
        isEditing={!!editingLivro}
      />
    </div>
  );
}

function AddBookModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData,
  isEditing
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (e: React.FormEvent) => void; 
  formData: any; 
  setFormData: (data: any) => void; 
  isEditing: boolean;
}) {
  // Note: We need to pass the actual submit handler from the parent.
  // Since the parent has handleAdicionarLivro and handleUpdateLivro, 
  // we should probably pass a generic onSubmit.
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">{isEditing ? 'Editar Livro' : 'Adicionar Novo Livro'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Título</label>
            <input 
              required
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: O Senhor dos Anéis"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Autor</label>
            <input 
              required
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.autor}
              onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
              placeholder="Ex: J.R.R. Tolkien"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Link da Imagem (Capa)</label>
            <input 
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.linkImagem}
              onChange={(e) => setFormData({ ...formData, linkImagem: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="disponivel"
              checked={formData.disponivel}
              onChange={(e) => setFormData({ ...formData, disponivel: e.target.checked })}
              className="w-4 h-4 text-[#0058be] focus:ring-[#0058be]"
            />
            <label htmlFor="disponivel" className="text-sm font-medium text-[#45464d]">Disponível para reserva</label>
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
              Salvar Livro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}