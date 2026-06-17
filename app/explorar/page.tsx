'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const COVER_PLACEHOLDER = 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
  linkImagem: string;
}

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  disponivel: boolean;
  imageLink: string;
}

const BookCard = ({ id, title, author, disponivel, imageLink }: BookCardProps) => {
  const router = useRouter();
  const statusText = disponivel ? 'Disponível' : 'Emprestado';
  const statusColor = disponivel ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700';
  const statusIcon = disponivel ? null : 'schedule';

  return (
    <div 
      onClick={() => router.push(`/detalhes/${id}`)}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-gray-400 cursor-pointer relative"
    >
      <div className="w-full aspect-[2/3] bg-gray-100 relative overflow-hidden">
        <img
          alt={`Capa de ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageLink || COVER_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm shadow-sm text-center">
            Ver Detalhes
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{title}</h4>
        <p className="text-sm text-gray-600">{author}</p>
        <div className="mt-auto pt-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${statusColor} text-xs font-semibold`}>
            {statusIcon
              ? <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{statusIcon}</span>
              : <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            }
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};

const BookCardSkeleton = () => (
  <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
    <div className="w-full aspect-[2/3] bg-gray-200" />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
    </div>
  </div>
);

export default function ExplorarPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [filtro, setFiltro] = useState<'todos' | 'disponiveis'>('todos');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const endpoint = filtro === 'disponiveis' ? '/api/livros/disponiveis' : '/api/livros';
    
    fetch(`${API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar livros');
        return res.json();
      })
      .then((data) => setLivros(data))
      .catch(() => setErro('Não foi possível carregar o acervo. Tente novamente.'))
      .finally(() => setLoading(false));
  }, [filtro]);

  const disponiveis = livros.filter((l) => l.disponivel);

  const livrosFiltrados = livros.filter((livro) => 
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) || 
    livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  const disponiveisFiltrados = disponiveis.filter((livro) => 
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) || 
    livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-6 w-full max-w-3xl">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Explorar Acervo</h2>
            <p className="text-lg text-gray-600">Descubra novos títulos, pesquise por autores ou navegue por categorias em nossa biblioteca digital.</p>
          </div>
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-500 group-focus-within:text-blue-600 transition-colors">search</span>
            </div>
            <input
              className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-all"
              placeholder="Pesquisar por título, autor, ISBN ou assunto..."
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            {erro}
          </div>
        )}

        {/* Disponíveis */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900">Disponíveis agora</h3>
            <span className="text-sm text-gray-500">
              {loading ? '...' : `${disponiveis.length} título${disponiveis.length !== 1 ? 's' : ''}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)
              : disponiveisFiltrados.length === 0
                ? <p className="text-gray-500 col-span-4">Nenhum livro disponível correspondente à busca.</p>
                : disponiveisFiltrados.map((livro) => (
                    <BookCard key={livro.id} id={livro.id} title={livro.titulo} author={livro.autor} disponivel={livro.disponivel} imageLink={livro.linkImagem} />
                  ))
            }
          </div>
        </section>

        {/* Todos */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900">Todos os livros</h3>
            <span className="text-sm text-gray-500">
              {loading ? '...' : `${livros.length} título${livros.length !== 1 ? 's' : ''}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)
              : livrosFiltrados.length === 0 && !erro
                ? <p className="text-gray-500 col-span-4">Nenhum livro correspondente à busca.</p>
                : livrosFiltrados.map((livro) => (
                    <BookCard key={livro.id} id={livro.id} title={livro.titulo} author={livro.autor} disponivel={livro.disponivel} imageLink={livro.linkImagem} />
                  ))
            }
          </div>
        </section>

        <div className="h-12"></div>
      </div>
    </div>
  );
}
