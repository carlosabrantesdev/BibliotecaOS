'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export default function Leitores() {
  const { role, authLoaded } = useAuth();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'user',
  });

  const handleRemoveUsuario = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este usuário?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert('Erro ao remover usuário');
      }
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      alert('Erro ao remover usuário');
    }
  };

  useEffect(() => {
    if (!authLoaded) return;
    if (role === null) {
      router.push('/');
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/usuarios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsuarios(data);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [role, authLoaded, router]);

  const handleAdicionarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(novoUsuario),
      });

      if (res.ok) {
        const userCriado = await res.json();
        setUsuarios((prev) => [...prev, userCriado]);
        setIsModalOpen(false);
        setNovoUsuario({ nome: '', email: '', senha: '', role: 'user' });
        alert('Leitor adicionado com sucesso!');
      } else {
        const errorData = await res.json();
        alert(`Erro: ${errorData.message || 'Erro ao adicionar leitor'}`);
      }
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
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
        <div className="w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#191c1e] mb-2">Leitores</h1>
              <p className="text-[#45464d]">Gerencie os leitores da biblioteca</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#0b1c30] transition-colors shadow-sm flex items-center"
            >
              <span className="material-symbols-outlined text-[20px] mr-2">person_add</span>
              Adicionar Leitor
            </button>
          </div>

          <div className="bg-white border border-[#c6c6cd]/50 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f7f9fb] border-b border-[#c6c6cd]/50">
                  <th className="p-4 text-xs font-semibold text-[#45464d] uppercase tracking-wider">ID</th>
                  <th className="p-4 text-xs font-semibold text-[#45464d] uppercase tracking-wider">Nome</th>
                  <th className="p-4 text-xs font-semibold text-[#45464d] uppercase tracking-wider">E-mail</th>
                  <th className="p-4 text-xs font-semibold text-[#45464d] uppercase tracking-wider">Papel</th>
                  <th className="p-4 text-xs font-semibold text-[#45464d] uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[#45464d]">
                      Nenhum leitor encontrado.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id} className="border-b border-[#f2f4f6] last:border-none hover:bg-[#fcfcfd] transition-colors">
                      <td className="p-4 text-sm font-medium text-[#191c1e]">{user.id}</td>
                      <td className="p-4 text-sm font-medium text-[#191c1e]">{user.nome}</td>
                      <td className="p-4 text-sm text-[#45464d]">{user.email}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-[#dae2fd] text-[#0058be]' : 'bg-[#f2f4f6] text-[#45464d]'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="p-2 text-[#76777d] hover:text-red-600 transition-colors" 
                            title="Remover"
                            onClick={() => handleRemoveUsuario(user.id)}
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAdicionarUsuario} 
        formData={novoUsuario} 
        setFormData={setNovoUsuario} 
      />
    </div>
  );
}

function UserModal({ 
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
          <h3 className="text-xl font-bold text-black">Adicionar Novo Leitor</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Nome Completo</label>
            <input 
              required
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: João Silva"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">E-mail</label>
            <input 
              required
              type="email"
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Senha</label>
            <input 
              required
              type="password"
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#45464d] mb-1">Papel (Role)</label>
            <select 
              className="w-full px-4 py-2 bg-[#f7f9fb] border border-[#c6c6cd] rounded focus:outline-none focus:border-[#0058be] text-black"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">Usuário / Leitor</option>
              <option value="admin">Administrador</option>
            </select>
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
              Salvar Leitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}