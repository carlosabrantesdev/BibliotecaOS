import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

export const AutenticacaoService = {
  async login(email: string, senha: string) {
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) return null;

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return null;

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '8h' }
    );

    return { token, role: usuario.role, nome: usuario.nome };
  },
};
