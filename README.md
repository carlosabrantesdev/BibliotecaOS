# Biblioteca — Sistema de Reserva de Livros

Projeto acadêmico da disciplina de **Processo de Software**, desenvolvido com metodologia **Scrum**. Semana 2 entregável: integração frontend ↔ API real com autenticação JWT.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack](#stack)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Como Rodar](#como-rodar)
- [API REST](#api-rest)
- [Credenciais de Teste](#credenciais-de-teste)
- [Documentação](#documentação)

---

## Visão Geral

Sistema web de biblioteca que permite autenticação de usuários e administradores, listagem de livros em tempo real e gestão do acervo. O frontend consome uma API REST que valida identidade via JWT antes de expor dados.

```
Usuário → Login (JWT) → Catálogo de Livros (protegido)
Admin   → Login (JWT) → Painel Administrativo
```

---

## Stack

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Frontend   | Next.js 16, React 19, Tailwind CSS v4   |
| Backend    | Node.js, Express, TypeScript            |
| ORM        | Prisma                                  |
| Banco      | SQLite (dev) → Neon PostgreSQL (prod)   |
| Auth       | JWT (`jsonwebtoken` + `bcryptjs`)       |

---

## Estrutura do Repositório

```
biblioteca-front/
├── app/                        → Next.js 16 (frontend)
│   ├── context/AuthContext.tsx → Estado global de autenticação
│   ├── components/             → Sidebar, Topbar, Footer
│   ├── catalogo/               → Listagem de livros (protegida)
│   ├── explorar/               → Página de exploração (usuário)
│   ├── painel/                 → Painel administrativo (admin)
│   ├── reservas/               → Gerenciamento de reservas
│   ├── emprestimos/            → Histórico de empréstimos
│   ├── favoritos/              → Favoritos do leitor
│   ├── leitores/               → Gestão de leitores (admin)
│   ├── relatorios/             → Relatórios (admin)
│   └── page.tsx                → Página de login
│
├── backend/                    → Node.js + Express (API REST)
│   ├── prisma/
│   │   ├── schema.prisma       → Modelos Usuario e Livro
│   │   └── seed.ts             → Dados de teste
│   └── src/
│       ├── routes/             → Entrypoints HTTP
│       ├── services/           → Regras de negócio
│       ├── repositories/       → Acesso ao banco via Prisma
│       └── middleware/auth.ts  → Guard JWT
│
└── docs/                       → Documentos da disciplina
    ├── WORKFLOW.md             → Workflow de branches e commits
    ├── DIAGRAMA_CLASSES.md     → Diagrama de classes e relacionamentos
    └── ARQUITETURA.md          → Arquitetura e fluxo de dados
```

---

## Como Rodar

### Pré-requisitos
- Node.js 18+
- npm

### 1. Backend (Express — porta 3001)

```bash
cd backend
npm install
npm run db:setup   # cria o banco SQLite e insere dados de teste
npm run dev
```

Verifique: `http://localhost:3001/api/health`

### 2. Frontend (Next.js — porta 3000)

```bash
# na raiz do projeto
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

## API REST

| Método | Rota                | Auth? | Descrição                         |
|--------|---------------------|-------|-----------------------------------|
| `GET`  | `/api/health`       | Não   | Health check da API               |
| `POST` | `/api/auth/login`   | Não   | Login; retorna `token` e `role`   |
| `POST` | `/api/auth/logout`  | Não   | Logout (stateless, sem blocklist) |
| `GET`  | `/api/livros`       | Sim   | Lista todos os livros             |

**Header de autenticação:**
```
Authorization: Bearer <token>
```

**Exemplo de login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@biblioteca.com","senha":"admin123"}'
```

---

## Credenciais de Teste

| Perfil        | E-mail                   | Senha         | Redireciona para |
|---------------|--------------------------|---------------|------------------|
| Administrador | `admin@biblioteca.com`   | `admin123`    | `/painel`        |
| Usuário       | `usuario@biblioteca.com` | `usuario123`  | `/explorar`      |

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Workflow](docs/WORKFLOW.md) | Branches, commits e ciclo Scrum |
| [Diagrama de Classes](docs/DIAGRAMA_CLASSES.md) | Classes, entidades e relacionamentos |
| [Arquitetura](docs/ARQUITETURA.md) | Fluxo de dados e camadas da aplicação |
| [CRC Cards – Semana 2](docs/CRC%20Cards%20–%20Semana%202.pdf) | Cartões de responsabilidade das classes |
| [Interaction Plan – Semana 2](docs/Interaction%20Plan%20–%20Semana%202.pdf) | Plano de interação do sprint |
| [Small Release – Semana 2](docs/Small%20Release%20–%20Semana%202.pdf) | Entregável da semana |
| [Casos de Teste – Semana 2](docs/Casos%20de%20Teste%20–%20Semana%202.pdf) | Cenários de teste validados |

---

## Migrar para Produção (Neon PostgreSQL)

1. Criar projeto em [neon.tech](https://neon.tech)
2. Copiar a `DATABASE_URL`
3. Atualizar `backend/.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   ```
4. Em `backend/prisma/schema.prisma`, trocar `provider = "sqlite"` por `provider = "postgresql"`
5. Rodar `npm run db:setup` dentro de `backend/`
