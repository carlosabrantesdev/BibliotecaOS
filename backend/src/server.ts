import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import livrosRoutes from './routes/livros';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/livros', livrosRoutes);

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
