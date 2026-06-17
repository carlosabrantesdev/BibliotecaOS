'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const COVER_PLACEHOLDER = 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
  linkImagem: string;
}

export default function DetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/livros/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Livro não encontrado');
        
        const data = await response.json();
        setLivro(data);
      } catch (e) {
        setErro(e instanceof Error ? e.message : 'Erro ao carregar detalhes do livro');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchLivro();
  }, [params.id]);

  const handleReservar = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ livroId: livro?.id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Livro reservado com sucesso!');
        router.push('/reservas');
      } else {
        alert(`Erro ao realizar reserva: ${data.message || 'Erro desconhecido'}`);
      }
    } catch (e) {
      alert('Erro de conexão com o servidor.');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (erro || !livro) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">error_outline</span>
        <h2 className="text-2xl font-bold text-gray-900">{erro || 'Livro não encontrado'}</h2>
        <button 
          onClick={() => router.push('/explorar')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Voltar para o Acervo
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Voltar para a lista
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
          {/* Imagem do Livro */}
          <div className="w-full md:w-96 aspect-[3/4] bg-gray-100 relative">
            <img 
              src={livro.linkImagem || COVER_PLACEHOLDER} 
              alt={livro.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detalhes */}
          <div className="flex-1 p-8 md:p-12 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Detalhes do Livro</span>
              <h1 className="text-4xl font-bold text-gray-900">{livro.titulo}</h1>
              <p className="text-xl text-gray-600 italic">por {livro.autor}</p>
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-gray-100">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${livro.disponivel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <span className={`w-2 h-2 rounded-full ${livro.disponivel ? 'bg-green-600' : 'bg-red-600'}`}></span>
                {livro.disponivel ? 'Disponível para reserva' : 'Indisponível no momento'}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Sobre a obra</h3>
              <p className="text-gray-600 leading-relaxed">
                Este livro é uma obra fundamental de {livro.autor}. 
                Acompanhe a jornada e as reflexões presentes nesta narrativa envolvente. 
                Ideal para leitores que buscam aprofundar seus conhecimentos em literatura clássica e contemporânea.
              </p>
            </div>

            <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
              <button 
                disabled={!livro.disponivel}
                onClick={handleReservar}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
                  livro.disponivel 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {livro.disponivel ? 'Reservar Agora' : 'Indisponível'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
