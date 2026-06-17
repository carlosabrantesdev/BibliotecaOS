import { EmprestimoRepository } from '../repositories/EmprestimoRepository';

export class EmprestimoService {
  private repository = new EmprestimoRepository();

  async listAll() {
    return this.repository.findAll();
  }

  async create(data: { usuarioId: number; livroId: number; dataPrazo: Date }) {
    return this.repository.create(data);
  }

  async getStats() {
    return this.repository.findStats();
  }

  async conclude(id: number) {
    return this.repository.conclude(id);
  }
}
