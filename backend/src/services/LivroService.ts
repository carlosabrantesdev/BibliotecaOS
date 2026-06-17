import { LivroRepository } from '../repositories/LivroRepository';

export const LivroService = {
  listar: () => LivroRepository.listarTodos(),
  listarDisponiveis: () => LivroRepository.listarDisponiveis(),
  buscarPorId: (id: number) => LivroRepository.buscarPorId(id),
};
