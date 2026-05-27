# Arquitetura do Sistema

Visão geral da arquitetura em camadas, fluxo de dados e decisões técnicas do projeto.

---

## Visão em Camadas

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
│                    Next.js 16 + React 19                        │
│                                                                 │
│   ┌──────────┐   ┌─────────────┐   ┌──────────────────────┐    │
│   │ page.tsx │   │ AuthContext │   │  Páginas protegidas  │    │
│   │ (login)  │──▶│  (estado    │◀──│  catalogo, painel,   │    │
│   └──────────┘   │   global)   │   │  explorar, reservas  │    │
│                  └──────┬──────┘   └──────────────────────┘    │
└─────────────────────────┼───────────────────────────────────────┘
                          │ fetch() + Bearer token
                          │ NEXT_PUBLIC_API_URL (env)
┌─────────────────────────▼───────────────────────────────────────┐
│                         BACKEND                                 │
│                  Express + TypeScript                           │
│                                                                 │
│   ┌──────────────────┐     ┌──────────────────────────────┐     │
│   │     Routes       │     │         Middleware           │     │
│   │  POST /auth/login│     │  autenticar() — valida JWT   │     │
│   │  POST /auth/logout│    └──────────────┬───────────────┘     │
│   │  GET  /livros ───┼──── protegido por ─┘                    │
│   │  GET  /health    │                                          │
│   └────────┬─────────┘                                          │
│            │                                                    │
│   ┌────────▼─────────┐                                          │
│   │     Services     │                                          │
│   │  AutenticacaoSvc │  bcrypt.compare + jwt.sign               │
│   │  LivroService    │                                          │
│   └────────┬─────────┘                                          │
│            │                                                    │
│   ┌────────▼─────────┐                                          │
│   │  Repositories    │                                          │
│   │  UsuarioRepo     │  prisma.usuario.findUnique()             │
│   │  LivroRepo       │  prisma.livro.findMany()                 │
│   └────────┬─────────┘                                          │
└────────────┼────────────────────────────────────────────────────┘
             │ Prisma Client
┌────────────▼────────────────────────────────────────────────────┐
│                    BANCO DE DADOS                               │
│          SQLite (dev)  ──▶  Neon PostgreSQL (prod)              │
│                                                                 │
│   tabela: usuarios          tabela: livros                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Autenticação (Login)

```
Frontend                           Backend                    Banco
   │                                  │                         │
   │  POST /api/auth/login             │                         │
   │  { email, senha }                 │                         │
   │─────────────────────────────────▶│                         │
   │                                  │  findUnique(email)      │
   │                                  │────────────────────────▶│
   │                                  │◀────────────────────────│
   │                                  │  bcrypt.compare(senha)  │
   │                                  │  jwt.sign({ id, role }) │
   │◀─────────────────────────────────│                         │
   │  { token, role, nome }            │                         │
   │                                  │                         │
   │  localStorage.setItem('token')    │                         │
   │  router.push('/painel' | '/explorar')                       │
```

---

## Fluxo de Acesso a Rota Protegida

```
Frontend                           Backend
   │                                  │
   │  GET /api/livros                  │
   │  Authorization: Bearer <token>   │
   │─────────────────────────────────▶│
   │                                  │  autenticar() middleware
   │                                  │  jwt.verify(token)
   │                                  │     ✓ válido → next()
   │                                  │     ✗ inválido → 401
   │                                  │
   │                                  │  LivroService.listar()
   │                                  │  LivroRepository.listarTodos()
   │◀─────────────────────────────────│
   │  [ { id, titulo, autor, ... } ]   │
```

---

## Fluxo de Proteção de Rota (Frontend)

```
Usuário acessa /catalogo
      │
      ▼
AuthContext.authLoaded === false?
      │ Sim → exibe spinner (aguarda localStorage)
      │
      ▼
role === null?
      │ Sim → router.push('/') — redireciona para login
      │
      ▼
Busca livros na API com token
      │
      ▼
Renderiza catálogo
```

---

## Variáveis de Ambiente

| Arquivo | Variável | Valor padrão |
|---------|----------|--------------|
| `backend/.env` | `DATABASE_URL` | `file:./dev.db` |
| `backend/.env` | `JWT_SECRET` | `dev-secret` |
| `.env.local` | `NEXT_PUBLIC_API_URL` | `http://localhost:3001` |

---

## Decisões Técnicas

| Decisão | Justificativa |
|---------|---------------|
| SQLite em dev | Zero configuração, portável entre máquinas da equipe |
| JWT stateless | Sem necessidade de session store; simplifica o backend |
| Prisma ORM | Migrations versionadas, troca de banco sem reescrever queries |
| Next.js App Router | SSR + client components no mesmo projeto; rotas por diretório |
| Tailwind v4 | Utility-first; sem arquivos CSS por componente |
| TypeScript no backend | Tipagem das entidades Prisma e payloads JWT |
