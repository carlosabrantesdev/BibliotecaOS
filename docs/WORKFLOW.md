# Workflow — Sistema de Reserva de Livros

Metodologia **Scrum** aplicada ao projeto acadêmico. Este documento descreve o processo de desenvolvimento adotado pela equipe.

---

## Fluxo Geral do Sprint

```
┌─────────────────────────────────────────────────────┐
│                   SPRINT (1 semana)                 │
│                                                     │
│  Planning → Desenvolvimento → Review → Retrospectiva│
└─────────────────────────────────────────────────────┘

1. Planejamento do Sprint
   ↓  Itens do Backlog priorizados
2. Desenvolvimento
   ↓  Branches de feature criadas a partir de main
3. Pull Request / Revisão
   ↓  Code review antes do merge em main
4. Small Release
   ↓  Entregável estável em main apresentado ao professor
5. Retrospectiva
   ↓  Lições aprendidas documentadas
```

---

## Estratégia de Branches

```
main ──────────────────────────────────────────▶  (estável, apresentação)
  │
  ├── feature/autenticacao-jwt    (concluída → merged)
  ├── feature/listagem-livros     (concluída → merged)
  └── feature/<próxima-tarefa>    (em desenvolvimento)
```

| Branch | Propósito |
|--------|-----------|
| `main` | Versão estável para apresentação ao professor. Nunca quebrado. |
| `feature/<nome>` | Uma feature ou correção por branch. Curta duração. |

### Regras

- Nunca commitar diretamente em `main` durante o sprint
- Feature branches sempre criadas a partir de `main` atualizado
- Merge em `main` somente após a feature estar funcional e testada

---

## Padrão de Commits

Seguimos **Conventional Commits** adaptado ao português:

```
<Tipo>: <descrição curta no imperativo>
```

| Tipo | Quando usar |
|------|-------------|
| `Feat:` | Nova funcionalidade |
| `Fix:` | Correção de bug |
| `Refactor:` | Refatoração sem mudança de comportamento |
| `Docs:` | Documentação, CLAUDE.md, README |
| `Chore:` | Tarefas de manutenção (deps, configs) |
| `Test:` | Adição ou correção de testes |

**Exemplos reais do projeto:**

```
Feat: listagem de livros conectada à API real
Feat: frontend consome API real de autenticação
Fix: authLoaded previne redirect prematuro em páginas protegidas
Chore: CLAUDE.md e atualização do package-lock
```

---

## Ciclo de Entrega (Semanas)

```
Semana 1 ──▶ Semana 2 ──▶ Semana 3 ──▶ ...
  Scaffold    Auth + API    Reservas
  Frontend    Livros        Empréstimos
  Backend     JWT           ...
```

### Semana 2 — Entregáveis concluídos

- [x] Scaffold do backend Node.js/Express com Prisma e SQLite
- [x] API de autenticação com JWT (`POST /api/auth/login`)
- [x] Middleware de autenticação (guard JWT)
- [x] Endpoint de listagem de livros protegido (`GET /api/livros`)
- [x] Frontend conectado à API real (login + catálogo)
- [x] Proteção de rotas no Next.js via `AuthContext`
- [x] Fix: `authLoaded` previne redirect prematuro

---

## Documentos por Sprint

Cada semana gera os seguintes artefatos em `docs/`:

| Artefato | Descrição |
|----------|-----------|
| CRC Cards | Responsabilidades das classes |
| Interaction Plan | Sequência de interações entre objetos |
| Small Release | Versão demonstrável ao professor |
| Casos de Teste | Cenários de validação manual |
| Documento de Tecnologias | Justificativa de escolhas técnicas |
