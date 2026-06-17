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
      <div className="p-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#191c1e] mb-2">Leitores</h1>
              <p className="text-[#45464d]">Gerencie os leitores da biblioteca</p>
            </div>
            <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#0b1c30] transition-colors shadow-sm flex items-center">
              <span className="material-symbols-outlined text-[20px] mr-2">person_add</span>
              Adicionar Leitor
            </button>
          </div>

          <div className="bg-white border border-[#c6c6cd]/50 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f7f9fb] border-b border-[#c6c6cd]/50">
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
                      <td className="p-4 text-sm font-medium text-[#191c1e]">{user.nome}</td>
                      <td className="p-4 text-sm text-[#45464d]">{user.email}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-[#dae2fd] text-[#0058be]' : 'bg-[#f2f4f6] text-[#45464d]'}`}>
                          {user.role}\n                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-2 text-[#76777d] hover:text-red-600 transition-colors" title="Remover">
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
    </div>
  );
}