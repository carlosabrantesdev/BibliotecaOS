import Image from "next/image";
import Topbar from "./components/Topbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      <Topbar />

      {/* Main Content */}
      <div className="p-8 flex-1">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-black mb-4">Bem-vindo ao LibrarianOS</h1>
          <p className="text-lg text-[#45464d] mb-8">Sistema de Gerenciamento de Biblioteca - Arquivo Acadêmico</p>
          
          <div className="bg-white p-6 border border-[#c6c6cd] rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-black mb-4">Funcionalidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-3xl text-[#0058be]">menu_book</span>
                <div>
                  <h3 className="font-semibold text-black mb-1">Catálogo</h3>
                  <p className="text-sm text-[#45464d]">Gerencie todos os livros da biblioteca, visualize disponibilidade e detalhes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-3xl text-[#0058be]">swap_horiz</span>
                <div>
                  <h3 className="font-semibold text-black mb-1">Empréstimos</h3>
                  <p className="text-sm text-[#45464d]">Controle de empréstimos e devoluções de livros.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-3xl text-[#0058be]">group</span>
                <div>
                  <h3 className="font-semibold text-black mb-1">Leitores</h3>
                  <p className="text-sm text-[#45464d]">Gerencie os dados dos leitores e suas atividades.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-3xl text-[#0058be]">analytics</span>
                <div>
                  <h3 className="font-semibold text-black mb-1">Relatórios</h3>
                  <p className="text-sm text-[#45464d]">Visualize estatísticas e relatórios da biblioteca.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
