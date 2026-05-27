# Diagrama de Classes e Relacionamentos

Representação das classes do sistema, seus atributos, métodos e relacionamentos — alinhado aos CRC Cards da Semana 2.

---

## Diagrama de Classes (Backend)

```mermaid
classDiagram
    direction TB

    class Usuario {
        +Int id
        +String email
        +String senha
        +String role
        +String nome
        +DateTime criadoEm
    }

    class Livro {
        +Int id
        +String titulo
        +String autor
        +Boolean disponivel
        +DateTime criadoEm
    }

    class UsuarioRepository {
        +buscarPorEmail(email: String) Usuario
    }

    class LivroRepository {
        +listarTodos() Livro[]
    }

    class AutenticacaoService {
        +login(email: String, senha: String) TokenPayload
    }

    class LivroService {
        +listar() Livro[]
    }

    class AuthMiddleware {
        +autenticar(req, res, next) void
    }

    class AuthRoute {
        +POST /login
        +POST /logout
    }

    class LivroRoute {
        +GET / (autenticado)
    }

    %% Relações
    AutenticacaoService --> UsuarioRepository : usa
    LivroService --> LivroRepository : usa
    UsuarioRepository --> Usuario : acessa
    LivroRepository --> Livro : acessa
    AuthRoute --> AutenticacaoService : chama
    LivroRoute --> LivroService : chama
    LivroRoute --> AuthMiddleware : protegido por
```

---

## Diagrama de Classes (Frontend)

```mermaid
classDiagram
    direction TB

    class AuthContext {
        +UserRole role
        +Boolean authLoaded
        +login(email, password) Boolean
        +logout() void
    }

    class LoginPage {
        -String email
        -String password
        -String error
        -Boolean loading
        +handleSubmit() void
    }

    class CatalogoPage {
        -Livro[] livros
        -Boolean loading
        +fetchLivros() void
    }

    class Sidebar {
        +renderMenu() void
    }

    class Topbar {
        +renderTopbar() void
    }

    class Livro {
        +Int id
        +String titulo
        +String autor
        +Boolean disponivel
    }

    LoginPage --> AuthContext : usa login()
    CatalogoPage --> AuthContext : usa role, authLoaded
    CatalogoPage --> Livro : exibe lista
    Sidebar --> AuthContext : usa role
```

---

## Diagrama de Entidades (Banco de Dados)

```mermaid
erDiagram
    USUARIOS {
        Int     id         PK
        String  email      UK
        String  senha
        String  role
        String  nome
        DateTime criado_em
    }

    LIVROS {
        Int     id         PK
        String  titulo
        String  autor
        Boolean disponivel
        DateTime criado_em
    }
```

> **Nota:** Na Semana 2 as entidades ainda são independentes. A tabela de `RESERVAS` (com FK para `USUARIOS` e `LIVROS`) está planejada para a Semana 3.

---

## Relacionamento entre Camadas

```
┌──────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)              │
│  LoginPage ──▶ AuthContext ──▶ POST /api/auth/login│
│  CatalogoPage ──▶ GET /api/livros (Bearer token)  │
└────────────────────────┬─────────────────────────┘
                         │ HTTP (REST + JWT)
┌────────────────────────▼─────────────────────────┐
│                   BACKEND (Express)               │
│  Route ──▶ Middleware(JWT) ──▶ Service ──▶ Repo  │
└────────────────────────┬─────────────────────────┘
                         │ Prisma ORM
┌────────────────────────▼─────────────────────────┐
│              BANCO DE DADOS (SQLite / PostgreSQL)  │
│  tabla: usuarios          tabela: livros           │
└──────────────────────────────────────────────────┘
```
