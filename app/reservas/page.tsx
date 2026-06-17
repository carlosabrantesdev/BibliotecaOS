'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Reservation {
  id: number;
  livro: {
    titulo: string;
    autor: string;
    capaUrl: string;
  };
  dataReserva: string;
  dataPrazo: string;
  status: string;
}

export default function ReservasPage() {
  const { authLoaded } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservations() {
      if (!authLoaded) return;
      
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3333/api/reservas/minhas', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Erro ao carregar reservas');
        
        const data = await res.json();
        setReservations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, [authLoaded]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-red-200">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header Section */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2 tracking-tight">Minhas Reservas</h2>
              <p className="text-lg text-gray-600">Gerencie seus livros reservados e aguardando retirada.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white text-black font-semibold text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filtrar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Nova Reserva
              </button>
            </div>
          </div>
        </section>

        {/* Reservations List */}
        <div className="grid grid-cols-1 gap-4 w-full">
          {reservations.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-4">library_books</span>
              <p className="text-gray-500 font-medium">Você não possui reservas ativas no momento.</p>
            </div>
          ) : (
            reservations.map((res) => (
              <div 
                key={res.id} 
                className="relative bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm flex items-center gap-4 md:gap-6 hover:border-blue-600 transition-colors group"
              >
                <span className="absolute top-4 right-4 px-3 py-1 bg-blue-100 text-blue-800 font-semibold text-xs rounded-full shadow-sm">
                  {res.status}
                </span>

                {/* Book Cover */}
                <div className="w-16 h-24 md:w-24 md:h-36 bg-gray-100 rounded overflow-hidden shrink-0 shadow-inner">
                  <img 
                    alt={`Capa de ${res.livro.titulo}`} 
                    className="w-full h-full object-cover" 
                    src={res.livro.capaUrl || 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg'} 
                  />
                </div>

                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-black truncate group-hover:text-[#0058be] transition-colors">
                        {res.livro.titulo}
                      </h3>
                      <p className="text-base text-[#45464d]">{res.livro.autor}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#45464d] text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      Reservado em: {new Date(res.dataReserva).toLocaleDateString('pt-BR')}
                    </div>
                    <div className={`flex items-center gap-1 font-semibold text-black`}>
                      <span className="material-symbols-outlined text-[18px]">alarm</span>
                      Prazo: {new Date(res.dataPrazo).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex gap-2">
                  <button className="px-4 py-2 bg-black text-white rounded font-semibold text-sm hover:opacity-90 transition-opacity">
                    Confirmar Retirada
                  </button>
                  <button className="px-4 py-2 border border-[#76777d] text-black rounded font-semibold text-sm hover:bg-[#f2f4f6] transition-colors">
                    Cancelar
                  </button>
                </div>
                
                {/* Mobile Action Button */}
                <button className="lg:hidden text-[#45464d]">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Histórico Recente */}
        <div className="mt-12 bg-white border border-[#c6c6cd] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#c6c6cd] bg-[#f2f4f6] flex justify-between items-center">
            <h3 className="text-xl font-bold text-black">Histórico Recente</h3>
            <a className="text-sm font-semibold text-[#0058be] hover:underline" href="#">Ver todo o histórico</a>
          </div>
        </div>
      </div>
    </div>
  );
}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-[#45464d] border-b border-[#c6c6cd]">
                  <th className="px-6 py-3 font-semibold text-sm">Livro</th>
                  <th className="px-6 py-3 font-semibold text-sm">Data da Reserva</th>
                  <th className="px-6 py-3 font-semibold text-sm">Devolução</th>
                  <th className="px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="px-6 py-3 font-semibold text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                {past_reservations.map((past_res) => (
                  <tr 
                    key={past_res.id} 
                    className="border-b border-[#c6c6cd]/50 last:border-none hover:bg-[#f2f4f6] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-[#e0e3e5] rounded overflow-hidden shrink-0">
                          <img 
                            alt={`Capa de ${past_res.title}`} 
                            className="w-full h-full object-cover" 
                            src={past_res.cover} 
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-black">{past_res.title}</p>
                          <p className="text-[#45464d] text-[12px]">{past_res.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#45464d]">{past_res.dateReserved}</td>
                    <td className="px-6 py-4 text-[#45464d]">{past_res.deadline}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#f2f4f6] text-[#45464d] rounded text-[12px] font-semibold">
                        {past_res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0058be] hover:text-[#004395]">
                        <span className="material-symbols-outlined text-[20px]">rate_review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
    </div>
  );
}