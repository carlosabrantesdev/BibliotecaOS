# Sistema de Reserva de Livros — Monorepo

Projeto acadêmico da disciplina de Processo de Software. Metodologia Scrum.

## Estrutura do repositório

```
biblioteca-front/
├── app/          → Next.js 16 (frontend)
├── backend/      → Node.js + Express (API REST)
├── docs/         → Documentos da disciplina (PDFs por semana)
└── CLAUDE.md
```

## Como rodar

### Frontend (Next.js — porta 3000)
```bash
npm run dev
```

### Backend (Express — porta 3333)
```bash
cd backend
npm install
npm run db:setup   # cria o banco SQLite e insere dados de teste
npm run dev
```

## Credenciais de teste (após seed)
- **Admin:** admin@biblioteca.com / admin123
- **Usuário:** usuario@biblioteca.com / usuario123

## Stack

| Camada     | Tecnologia                        |
|------------|-----------------------------------|
| Frontend   | Next.js 16, React 19, Tailwind v4 |
| Backend    | Node.js, Express, TypeScript      |
| ORM        | Prisma                            |
| Banco      | SQLite (dev) → Neon PostgreSQL (prod) |
| Auth       | JWT (jsonwebtoken + bcryptjs)     |

## API (Semana 2)

| Método | Rota              | Auth? | Descrição              |
|--------|-------------------|-------|------------------------|
| POST   | /api/auth/login   | Não   | Login, retorna JWT     |
| POST   | /api/auth/logout  | Não   | Logout (stateless)     |
| GET    | /api/livros       | Sim   | Lista todos os livros  |
| GET    | /api/health       | Não   | Health check da API    |

**Auth header:** `Authorization: Bearer <token>`

## Arquitetura do backend (espelha CRC Cards)

```
src/
├── routes/          → Entrypoints HTTP
├── services/        → Regras de negócio (AutenticacaoService, LivroService)
├── repositories/    → Acesso ao banco (UsuarioRepository, LivroRepository)
└── middleware/      → JWT auth guard
```

## Migrar para Neon (produção)

1. Criar projeto em neon.tech
2. Copiar a `DATABASE_URL` de conexão
3. Atualizar `backend/.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   ```
4. Atualizar `backend/prisma/schema.prisma`: trocar `provider = "sqlite"` por `provider = "postgresql"`
5. Rodar `npm run db:setup` dentro de `backend/`

## Workflow de branches

- `main` → versão estável para apresentação ao professor
- `feature/<nome>` → novas funcionalidades
- Commits seguem o padrão: `Feat:`, `Fix:`, `Docs:`, `Refactor:`
