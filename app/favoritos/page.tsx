'use client';

import React from 'react';

export default function FavoritosPage() {
  const favorites = [
    {
      id: 1,
      title: 'Nome do livro',
      author: 'Nome do autor',
      cover: 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg',
      status: 'Disponível',
      type: 'Físico',
    },
    {
      id: 2,
      title: 'Nome do livro',
      author: 'Nome do autor',
      cover: 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg',
      status: 'Indisponível',
      type: 'Digital',
    },
    {
      id: 3,
      title: 'Nome do livro',
      author: 'Nome do autor',
      cover: 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg',
      status: 'Disponível',
      type: 'Físico',
    },
    {
      id: 4,
      title: 'Nome do livro',
      author: 'Nome do autor',
      cover: 'https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg',
      status: 'Disponível',
      type: 'Digital',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2 tracking-tight">Meus Favoritos</h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Gerencie os livros e recursos que você salvou para leitura e pesquisa futura.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-[20px] text-gray-600">sort</span>
                Ordenar por: Recentes
                <span className="material-symbols-outlined text-[20px] text-gray-600">expand_more</span>
              </button>
            </div>
          </div>
        </section>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((book) => (
            <div 
              key={book.id} 
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full relative isolate"
            >
              {/* Cover Image Area */}
              <div className="aspect-[2/3] w-full bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img 
                  alt={`Capa de ${book.title}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={book.cover} 
                />
                <button 
                  aria-label="Remover dos favoritos" 
                  className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-red-100 hover:text-red-600 transition-colors text-blue-600"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3 flex justify-between items-start gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[12px] uppercase tracking-wider font-semibold ${
                    book.status === 'Disponível' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {book.status}
                  </span>
                  <span className="text-[12px] text-gray-600">{book.type}</span>
                </div>
                
                <h3 className="text-lg font-bold text-black leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-base text-gray-600 mb-4">{book.author}</p>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                {book.status === 'Disponível' ? (
                  <button className="w-full bg-black text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                    Reservar
                  </button>
                ) : (
                  <button className="w-full border border-gray-300 text-black font-semibold text-sm py-2.5 rounded-lg hover:bg-gray-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                    Avisar-me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-16"></div>
    </div>
  );
}
