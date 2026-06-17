import { LivroRepository } from '../repositories/LivroRepository';

export const LivroService = {
  listar: () => LivroRepository.listarTodos(),
  listarDisponiveis: () => LivroRepository.listarDisponiveis(),
  buscarPorId: (id: number) => LivroRepository.buscarPorId(id),
  criarLivro: (dados: { titulo: string; autor: string; linkImagem?: string; disponivel: boolean }) => 
    LivroRepository.criar(dados),
  atualizarLivro: (id: number, dados: { titulo?: string; autor?: string; linkImagem?: string; disponivel?: boolean }) => 
    LivroRepository.atualizar(id, dados),
  deletarLivro: (id: number) => 
    LivroRepository.deletar(id),
};
