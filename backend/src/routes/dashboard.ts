import { Router } from 'express';
import { DashboardService } from '../services/DashboardService';
import { autenticar } from '../middleware/auth';

const router = Router();
const dashboardService = new DashboardService();

router.get('/stats', autenticar, async (req, res) => {
  try {
    const stats = await dashboardService.getStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
