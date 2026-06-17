import { UsuarioRepository } from '../repositories/UsuarioRepository';

export const UsuarioService = {
  async criarUsuario(dados: { nome: string; email: string; senha: string; role: string }) {
    return await UsuarioRepository.criar(dados);
  },

  async deletarUsuario(id: number) {
    // Aqui poderiam ser adicionadas validações extras, como verificar se o usuário é admin
    // ou se é o próprio usuário tentando se deletar.
    return await UsuarioRepository.deletar(id);
  },
};
