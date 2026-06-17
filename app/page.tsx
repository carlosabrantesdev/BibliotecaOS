'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import Footer from "./components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      // Lógica de Login
      const success = await login(email, password);
      setLoading(false);

      if (success) {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
          router.push('/painel');
        } else {
          router.push('/explorar');
        }
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } else {
      // Lógica de Registro
      try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha: password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.erro || 'Erro ao criar conta');
        }

        // Login automático após registro bem-sucedido
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        
        setLoading(false);
        router.push('/explorar');
      } catch (err: any) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] text-[#191c1e] antialiased">
      <main className="flex-grow flex w-full">
        {/* Lado Esquerdo: Formulário */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative z-10 bg-[#f7f9fb]">
          <div className="w-full max-w-[420px] flex flex-col gap-12">
            
            {/* Cabeçalho */}
            <header className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-black text-[32px]">local_library</span>
                <h1 className="text-3xl font-bold text-black tracking-tight">Biblioteca</h1>
              </div>
              <h2 className="text-2xl font-semibold text-[#191c1e]">
                {isLogin ? 'Bem-vindo ao Portal do Leitor' : 'Crie sua Conta de Leitor'}
              </h2>
              <p className="text-base text-[#45464d]">
                {isLogin 
                  ? 'Insira suas credenciais institucionais para acessar o acervo digital e gerenciar suas reservas.' 
                  : 'Junte-se à nossa comunidade e comece a explorar nosso acervo digital agora mesmo.'}
              </p>
            </header>

            {isLogin && (
              <div className="bg-[#e6f0ff] border border-[#c6d7ff] rounded-sm p-4 text-sm">
                <p className="font-semibold mb-2">Credenciais de teste:</p>
                <p><strong>Administrador:</strong> admin@biblioteca.com / admin123</p>
                <p><strong>Usuário:</strong> usuario@biblioteca.com / usuario123</p>
              </div>
            )}

            {/* Formulário */}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              
              {/* Mensagem de Erro */}
              {error && (
                <div className="bg-[#ffebee] border border-[#ffcdd2] text-[#c62828] p-3 rounded-sm text-sm">
                  {error}
                </div>
              )}

              {/* Input: Nome (Apenas Registro) */}
              {!isLogin && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#191c1e]" htmlFor="nome">Nome Completo</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c6c6cd] pointer-events-none">person</span>
                    <input
                      className="w-full bg-white border border-[#c6c6cd] rounded-sm py-3 pl-10 pr-4 text-base text-[#191c1e] placeholder:text-[#c6c6cd] focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] transition-colors shadow-sm"
                      id="nome"
                      placeholder="Seu nome completo"
                      required
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Input: Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#191c1e]" htmlFor="email">
                  {isLogin ? 'E-mail Institucional' : 'E-mail'}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c6c6cd] pointer-events-none">mail</span>
                  <input
                    className="w-full bg-white border border-[#c6c6cd] rounded-sm py-3 pl-10 pr-4 text-base text-[#191c1e] placeholder:text-[#c6c6cd] focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] transition-colors shadow-sm"
                    id="email"
                    placeholder={isLogin ? "nome.sobrenome@instituicao.edu.br" : "seuemail@exemplo.com"}
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Input: Senha */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#191c1e]" htmlFor="password">Senha</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c6c6cd] pointer-events-none">lock</span>
                  <input
                    className="w-full bg-white border border-[#c6c6cd] rounded-sm py-3 pl-10 pr-4 text-base text-[#191c1e] placeholder:text-[#c6c6cd] focus:outline-none focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] transition-colors shadow-sm"
                    id="password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Ações / Botões */}
              <div className="flex flex-col gap-3 mt-4">
                <button 
                  className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold text-sm py-3 rounded-sm hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60" 
                  type="submit" 
                  disabled={loading}
                >
                  <span>{loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}</span>
                  {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                </button>
                
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="w-full flex items-center justify-center bg-white border border-[#76777d] text-black font-semibold text-sm py-3 rounded-sm hover:bg-[#f2f4f6] transition-colors text-center" 
                  type="button"
                >
                  {isLogin ? 'Criar conta' : 'Voltar para Login'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Lado Direito: Imagem (Escondida no Mobile) */}
        <section className="hidden lg:block lg:w-1/2 relative bg-[#e6e8ea] border-l border-[#c6c6cd] overflow-hidden">
          <img
            alt="Academic Library"
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply filter grayscale-[20%]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyCN7xg_xx9-cJFikJBEsmekEsz9yajSfzCzlVoQpMP0upvwwkP6boP5-LJAa2ZqGF1xbkdTzf6gy9JCipmVyMopTH_iRAyG9tEgQRHk4eRuhjEHDKL7lBKNMBQXird7pU8xQzFpoiO7qwDD5-lhygNgbh2FtUn6qycnCHDYNBPiY3SRKMLucyVMVs2cy64195lYioCH55ueQ5rHI3tdfKy9rYMb2y9jGulc41ICTzbOQXnCzNI8Jgacfh9H8HFDvz3EpeywOyM4w"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f2f4f6]/80 via-transparent to-transparent pointer-events-none"></div>
        </section>
      </main>

      {/* Footer renderizado aqui */}
      <Footer />
    </div>
  );
}