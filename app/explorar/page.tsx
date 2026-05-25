import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  status?: string;
  image: string;
  statusColor?: string;
  statusText?: string;
  icon?: string | null;
}

const BookCard = ({ 
  title, 
  author, 
  status, 
  image, 
  statusColor = 'bg-secondary-fixed', 
  statusText = 'Disponível', 
  icon = null 
}: BookCardProps) => {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-gray-400 cursor-pointer relative">
      <div className="w-full aspect-[2/3] bg-gray-100 relative overflow-hidden">
        <img 
          alt="Book cover" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image} 
        />
        <button 
          aria-label="Adicionar aos favoritos" 
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors text-gray-600"
        >
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm shadow-sm">
            Ver Detalhes
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{title}</h4>
        </div>
        <p className="text-sm text-gray-600">{author}</p>
        <div className="mt-auto pt-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${statusColor} text-xs font-semibold`}>
            {icon && <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{icon}</span>}
            {!icon && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ExplorarPage() {
  const books = [
    {
      title: "Nome do livro",
      author: "Nome do autor",
      status: "available",
      statusText: "Disponível",
      statusColor: "bg-blue-100 text-blue-800",
      image: "https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg",
      id: 0
    },
    {
      title: "Nome do livro",
      author: "Nome do autor",
      status: "waitlist",
      statusText: "Emprestado (Fila: 2)",
      statusColor: "bg-gray-200 text-gray-700",
      icon: "schedule",
      image: "https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg",
      id: 1
    },
    {
      title: "Nome do livro",
      author: "Nome do autor",
      status: "unavailable",
      statusText: "Indisponível",
      statusColor: "bg-red-100 text-red-800",
      icon: "block",
      image: "https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg",
      id: 2
    },
    {
      title: "Nome do livro",
      author: "Nome do autor",
      status: "available",
      statusText: "Disponível",
      statusColor: "bg-blue-100 text-blue-800",
      image: "https://image.slidesdocs.com/responsive-images/background/empty-book-cover-presented-in-3d-on-a-white-backdrop-powerpoint-background_31314acd44__960_540.jpg",
      id: 3
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header & Search Section */}
        <section className="flex flex-col gap-6 w-full max-w-3xl">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Explorar Acervo</h2>
            <p className="text-lg text-gray-600">Descubra novos títulos, pesquise por autores ou navegue por categorias em nossa biblioteca digital.</p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-500 group-focus-within:text-blue-600 transition-colors">search</span>
            </div>
            <input 
              className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-all" 
              placeholder="Pesquisar por título, autor, ISBN ou assunto..." 
              type="text" 
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                Buscar
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-2">
            <button className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm border border-black hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
              Disponíveis agora
            </button>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>new_releases</span>
              Novidades
            </button>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>category</span>
              Categorias
            </button>
          </div>
        </section>

        {/* Popular Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900">Mais populares</h3>
            <span className="text-sm text-gray-500">Exibindo 4 títulos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <BookCard 
                key={index}
                title={book.title}
                author={book.author}
                statusText={book.statusText}
                statusColor={book.statusColor}
                icon={book.icon}
                image={book.image}
              />
            ))}
          </div>
        </section>

        {/* All Books Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900">Todos os livros</h3>
            <span className="text-sm text-gray-500">Exibindo 4 títulos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <BookCard 
                key={index}
                title={book.title}
                author={book.author}
                statusText={book.statusText}
                statusColor={book.statusColor}
                icon={book.icon}
                image={book.image}
              />
            ))}
          </div>
        </section>

        <div className="h-12"></div>
      </div>
    </div>
  );
}
