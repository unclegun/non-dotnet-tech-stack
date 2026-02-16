# Test Stack - Architecture Lab

An educational full-stack application demonstrating modern web development patterns with **Next.js**, **Fastify**, **PostgreSQL**, and **Prisma**. This project teaches architecture through working code and interactive documentation.

## 🎯 What This Is

A complete architecture lab that:
- **Works**: Full-stack CRUD operations with Items and Notes
- **Teaches**: Interactive documentation explaining each pattern
- **Demonstrates**: Production-ready patterns (middleware, error handling, testing, observability)
- **Runs easily**: Designed for GitHub Codespaces with simple setup

Browse the [Concepts](http://localhost:3000/concepts) section in the running app to learn about request lifecycles, validation, error handling, data access, and more.

## 🏗️ Architecture Overview

```
┌───────────────────────────────────────────────────────────┐
│                    BROWSER (Next.js)                      │
│  • Server Components (data fetching)                      │
│  • Client Components (interactivity)                      │
│  • Type-safe API client                                   │
└─────────────────────┬─────────────────────────────────────┘
                      │ HTTP/JSON
                      ↓
┌───────────────────────────────────────────────────────────┐
│              SHARED CONTRACTS (Zod Schemas)               │
│  • ItemDto, CreateItemBody, ListItemsQuery                │
│  • NoteDto, CreateNoteBody, ListNotesQuery                │
│  • ProblemDetails (error format)                          │
└─────────────────────┬─────────────────────────────────────┘
                      │ Imported by both sides
                      ↓
┌───────────────────────────────────────────────────────────┐
│                   FASTIFY API SERVER                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Plugins: requestContext, timing, errorHandler     │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Routes → Services → Repositories → Database       │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Background Jobs (heartbeat every 30s)              │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────┬─────────────────────────────────────┘
                      │ Prisma ORM
                      ↓
┌───────────────────────────────────────────────────────────┐
│                  POSTGRESQL DATABASE                      │
│  • items, notes, heartbeats tables                        │
│  • Migrations for version control                         │
└───────────────────────────────────────────────────────────┘
```

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 + React + TypeScript | Server/client rendering with App Router |
| **Backend** | Fastify + TypeScript | Fast, low-overhead API server |
| **Validation** | Zod | Type-safe runtime validation |
| **Database** | PostgreSQL + Prisma | Relational DB with type-safe ORM |
| **Testing** | Node Test Runner | Built-in integration tests |
| **Logging** | Pino | Structured JSON logs |
| **Workspace** | npm workspaces | Monorepo management |

## 📁 Project Structure

```
/
├── package.json                    # Root workspace config
├── packages/
│   └── contracts/                  # ⭐ Shared API contracts
│       └── src/
│           ├── items.ts            # Item DTOs and schemas
│           ├── notes.ts            # Note DTOs and schemas
│           └── errors.ts           # ProblemDetails schema
│
├── apps/
│   ├── api/                        # Fastify backend
│   │   ├── prisma/
│   │   │   ├── schema.prisma       # DB models (Item, Note, Heartbeat)
│   │   │   ├── seed.ts             # Sample data
│   │   │   └── migrations/         # Version-controlled schema
│   │   ├── src/
│   │   │   ├── server.ts           # App bootstrap
│   │   │   ├── plugins/            # ⭐ Middleware
│   │   │   │   ├── requestContext.ts  # Adds traceId
│   │   │   │   ├── timing.ts          # Measures duration
│   │   │   │   └── errorHandler.ts    # Problem Details
│   │   │   ├── modules/            # ⭐ Feature modules
│   │   │   │   ├── items/
│   │   │   │   │   ├── routes.ts      # HTTP layer
│   │   │   │   │   ├── service.ts     # Business logic
│   │   │   │   │   └── repo.ts        # Data access
│   │   │   │   └── notes/
│   │   │   ├── jobs/               # ⭐ Background jobs
│   │   │   │   └── heartbeat.ts       # Runs every 30s
│   │   │   ├── routes/
│   │   │   │   └── health.ts          # Health check
│   │   │   └── lib/
│   │   │       ├── config.ts          # Env validation
│   │   │       ├── db.ts              # Prisma client
│   │   │       └── appError.ts        # Custom errors
│   │   └── tests/                  # ⭐ Integration tests
│   │       └── api.test.ts
│   │
│   └── web/                        # Next.js frontend
│       ├── app/
│       │   ├── page.tsx            # Homepage (Items demo)
│       │   ├── notes/              # Notes demo
│       │   ├── concepts/           # ⭐ Learning pages
│       │   │   ├── request-lifecycle/
│       │   │   ├── validation-contracts/
│       │   │   ├── error-handling/
│       │   │   ├── data-access/
│       │   │   ├── observability/
│       │   │   └── testing/
│       │   ├── architecture/       # Architecture diagrams
│       │   ├── code-walkthrough/   # Guided code tour
│       │   └── observability/      # Observability demo
│       ├── components/
│       │   ├── ItemForm.tsx
│       │   ├── ItemList.tsx
│       │   ├── NoteForm.tsx
│       │   └── NoteList.tsx
│       └── lib/
│           └── apiClient.ts        # Type-safe API client
```

⭐ = Key architectural components

## 🎓 What You'll Learn

This repo demonstrates:

### Core Patterns
- **Request Lifecycle**: How requests flow through plugins → routes → services → repos
- **Contract-First APIs**: Shared Zod schemas for type safety across frontend/backend
- **Layered Architecture**: Separation of HTTP, business logic, and data access
- **Error Handling**: Consistent Problem Details format with traceIds
- **Validation Strategy**: Runtime validation with compile-time types

### Observability
- **Request Tracing**: Unique traceId for every request
- **Structured Logging**: JSON logs with context
- **Performance Timing**: Automatic request duration logging

### Data Access
- **Repository Pattern**: Abstracted data access layer
- **ORM vs Raw SQL**: When to use each
- **Pagination & Filtering**: Efficient list endpoints

### Background Processing
- **Job Pattern**: Heartbeat job runs every 30 seconds
- **Job Logging**: Separate trace IDs for background tasks

### Testing
- **Integration Tests**: Full HTTP request/response testing
- **Contract Validation**: Tests verify API matches contracts

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL (or use Codespaces which includes it)

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/unclegun/non-dotnet-tech-stack
   cd non-dotnet-tech-stack
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```

3. **Set up database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```
   This starts:
   - API: http://localhost:3001
   - Web: http://localhost:3000

5. **Run tests:**
   ```bash
   npm run test
   ```

### In GitHub Codespaces

1. Click "Code" → "Create codespace on main"
2. Wait for setup to complete
3. Run:
   ```bash
   npm install
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```
4. Open the web preview

## 📋 Available Commands

From the root directory:

```bash
# Development
npm run dev          # Start both API and web in watch mode
npm run dev:api      # Start API only
npm run dev:web      # Start web only

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed with sample data
npm run db:studio    # Open Prisma Studio

# Testing
npm run test         # Run integration tests

# Building
npm run build        # Build all workspaces

# Cleanup
npm run clean        # Remove node_modules and build artifacts
```

## 🔍 Key Concepts Explained

### 1. Request Lifecycle
Every request flows through:
1. HTTP → Fastify
2. CORS plugin
3. `requestContext` plugin (adds traceId)
4. `timing` plugin (starts timer)
5. Route handler (validates with Zod)
6. Service layer (business logic)
7. Repository layer (database)
8. Response (timing logged)
9. `errorHandler` (if exception)

### 2. Contract-First API
```typescript
// packages/contracts/src/items.ts
export const CreateItemBodySchema = z.object({
  name: z.string().min(1).max(200),
});

// API validates incoming requests
const body = CreateItemBodySchema.parse(request.body);

// Frontend has type safety
async createItem(body: CreateItemBody): Promise<ItemDto>
```

### 3. Three-Layer Architecture
```
Routes (HTTP concerns)
  ↓ calls
Services (Business logic)
  ↓ calls
Repositories (Data access)
  ↓ uses
Prisma (ORM)
```

### 4. Error Handling
All errors return Problem Details:
```json
{
  "type": "https://...",
  "title": "Validation Failed",
  "status": 400,
  "detail": "Name is required",
  "instance": "/items",
  "traceId": "550e8400-...",
  "errors": [...]
}
```

### 5. Observability
Every log includes structured data:
```json
{
  "level": "info",
  "traceId": "550e8400-...",
  "method": "POST",
  "url": "/items",
  "statusCode": 201,
  "duration": "45ms",
  "msg": "Request completed"
}
```

## 🧪 Testing Strategy

### Integration Tests
Located in `apps/api/tests/api.test.ts`:
- Boot real server
- Make HTTP requests
- Validate responses match contracts
- Test happy path + error cases

```bash
npm run test
```

### What's Tested
- Health endpoint returns 200
- Create item and verify it appears in list
- Invalid input returns 400 with Problem Details
- Pagination works correctly
- Search filtering works

## 🌐 API Endpoints

### Health
- `GET /health` - Health check

### Items
- `GET /items?page=1&pageSize=20&q=search` - List items with pagination/search
- `POST /items` - Create item (body: `{name: string}`)

### Notes
- `GET /notes?page=1&pageSize=20&q=search` - List notes with pagination/search
- `POST /notes` - Create note (body: `{content: string}`)

All endpoints:
- Accept/return JSON
- Return Problem Details on error
- Include traceId in errors
- Log with structured data

## 📚 Learning Path

1. **Start here**: Read this README
2. **Run the app**: `npm run dev` and explore http://localhost:3000
3. **Read Concepts**: Visit http://localhost:3000/concepts for guided lessons
4. **Study the code**: Follow the [Code Walkthrough](http://localhost:3000/code-walkthrough)
5. **See it in action**: Visit [Observability](http://localhost:3000/observability) and watch logs
6. **Run tests**: `npm run test` and see integration tests pass
7. **Make changes**: Try adding a new field or entity

## 🔄 Common Tasks

### Add a New Entity
1. Add model to `apps/api/prisma/schema.prisma`
2. Create migration: `npm run db:migrate`
3. Add contracts in `packages/contracts/src/`
4. Create module in `apps/api/src/modules/`
   - `routes.ts`, `service.ts`, `repo.ts`
5. Register routes in `apps/api/src/server.ts`
6. Add UI in `apps/web/`

### Add a New Endpoint
1. Define contract in `packages/contracts/`
2. Add route in module's `routes.ts`
3. Add logic in module's `service.ts`
4. Add data access in module's `repo.ts`
5. Update frontend `apiClient.ts`
6. Add integration test

## 🎯 Design Principles

- **Explicit over clever**: Readable code > magic
  - ✅ Clear layer boundaries
  - ❌ Over-abstraction

- **Type-safe everywhere**: Catch errors at compile time
  - ✅ Prisma generates types from schema
  - ✅ Zod validates and infers types
  - ✅ Shared contracts across packages

- **Fail fast**: Catch config errors on startup
  - ✅ Validate env vars immediately
  - ✅ TypeScript strict mode

- **Observable by default**: Understand what's happening
  - ✅ Structured logs with traceIds
  - ✅ Timing for every request

- **Contract-first**: Define the interface, then implement
  - ✅ Shared schemas
  - ✅ Consistent error format

## 🗺️ Mapping to Other Ecosystems

| This Stack | ASP.NET Core | Spring Boot | Rails |
|-----------|--------------|-------------|-------|
| Fastify | ASP.NET Core | Spring MVC | Rails |
| Routes | Controllers | Controllers | Controllers |
| Services | Services | Services | Services |
| Repositories | Repositories | Repositories | Models |
| Plugins | Middleware | Filters | Middleware |
| Zod | Data Annotations | Bean Validation | Validations |
| Prisma | Entity Framework | JPA/Hibernate | ActiveRecord |
| ProblemDetails | ProblemDetails | @ControllerAdvice | rescue_from |

## 🚧 What's Not Included (Yet)

Real production apps would add:
- Authentication/authorization (JWT, OAuth)
- Rate limiting
- Caching (Redis)
- Message queue (BullMQ)
- File uploads (S3)
- Full-text search (Elasticsearch)
- APM/monitoring (Datadog, New Relic)
- CI/CD pipeline

## 🤝 Contributing

This is an educational project. Feel free to:
- Open issues for questions
- Suggest improvements
- Share how you used it to learn

## 📄 License

MIT

## 🙏 Acknowledgments

Built to teach modern full-stack architecture patterns in a way that's approachable for developers from any background.

---

**Ready to learn?** Start the app and visit http://localhost:3000/concepts
```

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **PostgreSQL**: 14 or higher

### Option A: GitHub Codespaces (Recommended)

1. **Create a Codespace** from this repository
2. **PostgreSQL Setup**: 
   - If your devcontainer includes PostgreSQL, it will be available automatically
   - Otherwise, use a managed PostgreSQL instance (see Option B)

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and set your DATABASE_URL
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Setup database**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Start development servers**:
   ```bash
   npm run dev
   ```

7. **Open in browser**:
   - Web UI: `http://localhost:3000`
   - API: `http://localhost:3001`
   
   In Codespaces, ports will auto-forward. Click the "Ports" tab to see URLs.

### Option B: Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/unclegun/non-dotnet-tech-stack.git
   cd non-dotnet-tech-stack
   ```

2. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS with Homebrew
   brew install postgresql@15
   brew services start postgresql@15
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Create database
   createdb teststack
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/teststack?schema=public"
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Setup database**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Start development servers**:
   ```bash
   npm run dev
   ```

7. **Open in browser**:
   - Web UI: http://localhost:3000
   - API: http://localhost:3001

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies for monorepo |
| `npm run dev` | Start both API and web servers concurrently |
| `npm run dev:api` | Start only the API server (port 3001) |
| `npm run dev:web` | Start only the web server (port 3000) |
| `npm run db:migrate` | Run Prisma migrations (creates/updates DB schema) |
| `npm run db:seed` | Populate database with sample data |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |
| `npm run build` | Build both apps for production |
| `npm run clean` | Remove all node_modules and build artifacts |

## 🔧 Configuration

### Environment Variables

**API (`apps/api/.env`)**:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
API_PORT=3001
NODE_ENV=development
LOG_LEVEL=info
```

**Web (`apps/web/.env`)**:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

> **Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in these variables.

## 🔌 API Endpoints

### Health Check
```http
GET /health
```
Returns server status and uptime.

### List Items
```http
GET /items
```
Returns all items from the database.

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Item name",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create Item
```http
POST /items
Content-Type: application/json

{
  "name": "New item"
}
```

**Response**:
```json
{
  "data": {
    "id": "uuid",
    "name": "New item",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Item created successfully"
}
```

## 🐛 Troubleshooting

### Database Connection Failed

**Error**: `Can't reach database server at localhost:5432`

**Solutions**:
1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list | grep postgresql
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Check DATABASE_URL in `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```

3. Test connection:
   ```bash
   psql $DATABASE_URL
   ```

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solutions**:
1. Find and kill the process:
   ```bash
   # Find process on port 3000
   lsof -i :3000
   
   # Kill it
   kill -9 <PID>
   ```

2. Or use different ports in `.env`:
   ```env
   API_PORT=3002
   NEXT_PUBLIC_API_URL="http://localhost:3002"
   ```

### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
cd apps/api
npx prisma generate
```

This regenerates the Prisma Client based on your schema.

### CORS Error in Browser

**Error**: `Access to fetch at 'http://localhost:3001/items' has been blocked by CORS policy`

**Solution**:
- Ensure the API server is running
- Check that `NEXT_PUBLIC_API_URL` matches the API server URL
- Verify CORS configuration in `apps/api/src/server.ts` includes your origin

### Codespaces Port Forwarding

In GitHub Codespaces, ports are auto-forwarded but may need to be made public:

1. Go to the **Ports** tab in VS Code
2. Right-click on port 3000 or 3001
3. Select **Port Visibility** → **Public**

## 🎓 Learning Path

1. **Start with the demo**: Visit http://localhost:3000 and try creating items
2. **Understand the flow**: See how data moves from form → API → database
3. **Read /learn**: Detailed explanation of each technology
4. **Study /architecture**: Deep dive into patterns and design decisions
5. **Explore the code**: Follow a request through the codebase

## 📚 Key Concepts Demonstrated

- **Monorepo structure** with npm workspaces
- **Type safety** end-to-end with TypeScript
- **API design** with RESTful principles
- **Validation** with Zod schemas
- **ORM** with Prisma for type-safe database access
- **Error handling** with custom error classes
- **Server/Client Components** in Next.js App Router
- **Environment-based configuration**
- **Database migrations** with version control

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment! Some ideas:
- Add update/delete operations
- Implement pagination
- Add authentication
- Create more complex data models
- Add tests

## 📄 License

MIT License - feel free to use this project for learning and teaching.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Fastify Documentation](https://www.fastify.io/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Built with ❤️ for learning modern web development**
Learning how to set up modern web app without the .Net architecture
