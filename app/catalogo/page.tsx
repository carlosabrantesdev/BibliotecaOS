import Image from "next/image";
import Topbar from "../components/Topbar";

export default function Catalogo() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      <Topbar />

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
              <label className="block text-sm font-semibold text-[#45464d] mb-2">Disciplina / Gênero</label>
              <select className="w-full px-4 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] text-black text-base appearance-none">
                <option>Todas as Disciplinas</option>
                <option>Ciência da Computação</option>
                <option>Filosofia</option>
                <option>Matemática</option>
                <option>História</option>
              </select>
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
            <div className="md:col-span-1 flex justify-end">
              <button className="p-3 border border-[#c6c6cd] rounded text-black hover:bg-[#f2f4f6] transition-colors w-full flex justify-center items-center">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid Layout for Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              title: "Estrutura e Interpretação de Programas de Computador",
              author: "Abelson, Sussman",
              status: "Disponível",
              statusColor: "bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlismR5IYflzAlj6JzEIYp14GUYHQP5qotoJTxyvAkRg25q7iffpSeaZW4oFjQvOESpXY80a-7n-wsu19S86hnEbKPDHCBupbSl_9fEPzcc-qnY-UPFdehMQ_sMlj-Le-GjFeFv4uewvw537-HTfnRVXR-__BR6v-1_CzaNzaZlJMBq4lRX5JtvrkCF-8Rk1grdsJOydwnFukmbUklydfs2MFfxuBAz8g81Qbrs3ecF4ORD055blnO3zaQ0E8SJXjl8cTYWBKUglI"
            },
            {
              title: "O Declínio e Queda do Império Romano",
              author: "Edward Gibbon",
              status: "Emprestado",
              statusColor: "bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHLZzlQ5hGdxHwoPWFSyCsF0WKlv4629nXbyqiIZdenauGlcf2lFIF2SrIKzWfxnPQ_rHgVHj06W_7UclyQ6ouDOlgGqPbAGcSQYw9VtxLyPoJxkJX_ebg65UQWMtYDYKF0UxZNhSwYHwjzZzy8pIhaLE6uQcbLREH4RZU1YmHDrQ062_-RSaH6ly41WuY2DngVys2ror3ppdTJIfk8TojtusoTvpmm7oQovb5YuWQOImAW_WQk1Tn7nVKdZaN-zFaEVW26ppwZwQ"
            },
            {
              title: "Princípios de Análise Matemática",
              author: "Walter Rudin",
              status: "Reservado",
              statusColor: "bg-[#fff3e0] text-[#ef6c00] border-[#ffe0b2]",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBix-vzTLjNuHji_NUgxOYKJ7P0ncIaKxn1Xpy3xQVpiNXgG4TVkTFogWXWSmaVPQkYQt0R0GSm_W3T1ygORw65KiZi4kRiQeGNTBLKrkDqHpfgnvHvMu3BKIA7JnVjfVlsPoXEC5xqHwiNewngzc-GpEsnx2j_jDSoq6rPin27T23QzpwupJyA2itPRNcrTtNNXbjiobYOi6cGnPnhQhPiWfd6IMFYLOzAYi0gbhvueFnEGqWBUUY1blZuFN5PTwrv76p4meEFtzA"
            },
            {
              title: "Crítica da Razão Pura",
              author: "Immanuel Kant",
              status: "Disponível",
              statusColor: "bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF6XxZu0MMT-vXPWxEis0gZeZPPNRs6I6x8s8ShRg-6GeKmaajyJePhGO9DAF0sCieaEWl-Xk7db1tHY5Y18wZPtle8AcRj7AKmmELN0GXeIlgVIEez7GwsQdZ8czpRM7rLGmwPWlDI22BROnJlhD4qzxAXYNzhCwflydXFX-vF1z4ymN_vzJGxzzy6yphqn5RpR9Ye6ze5nd1eZrixSGvqudifDHlnnA__esb0o42XngiwsF6uqpQpn_c2R_GJeV0ynrwh5Tz1Ks"
            }
          ].map((book, idx) => (
            <div key={idx} className="bg-white border border-[#c6c6cd] rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-48 bg-[#e6e8ea] relative flex items-center justify-center border-b border-[#c6c6cd] overflow-hidden">
                <img alt="Capa do livro" className="w-full h-full object-cover opacity-90 mix-blend-multiply" src={book.img} />
                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-semibold border ${book.statusColor}`}>
                  {book.status}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-black mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-[#45464d] mb-4">{book.author}</p>
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
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button className="p-2 border border-[#c6c6cd] rounded text-[#45464d] hover:bg-white hover:text-black transition-colors disabled:opacity-50">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 border border-[#0058be] bg-[#d8e2ff]/10 text-[#0058be] text-sm font-semibold rounded flex items-center justify-center">1</button>
          <button className="w-10 h-10 border border-[#c6c6cd] text-black text-sm font-semibold rounded hover:bg-white transition-colors flex items-center justify-center">2</button>
          <button className="w-10 h-10 border border-[#c6c6cd] text-black text-sm font-semibold rounded hover:bg-white transition-colors flex items-center justify-center">3</button>
          <span className="px-2 text-[#76777d]">...</span>
          <button className="p-2 border border-[#c6c6cd] rounded text-[#45464d] hover:bg-white hover:text-black transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
