import { LivroRepository } from '../repositories/LivroRepository';

export const LivroService = {
  listar: () => LivroRepository.listarTodos(),
};
