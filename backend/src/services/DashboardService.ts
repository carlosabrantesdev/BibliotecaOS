import { DashboardRepository } from '../repositories/DashboardRepository';

export class DashboardService {
  private repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  async getStats() {
    try {
      return await this.repository.getDashboardStats();
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      throw new Error('Erro interno ao processar dados do dashboard');
    }
  }
}
