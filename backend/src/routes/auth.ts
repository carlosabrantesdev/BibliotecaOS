import { Router } from 'express';
import { AutenticacaoService } from '../services/AutenticacaoService';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    return;
  }

  const resultado = await AutenticacaoService.login(email, senha);

  if (!resultado) {
    res.status(401).json({ erro: 'Credenciais inválidas' });
    return;
  }

  res.json(resultado);
});

router.post('/logout', (_, res) => {
  res.json({ mensagem: 'Logout realizado com sucesso' });
});

export default router;
