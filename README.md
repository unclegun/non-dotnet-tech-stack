# Test Stack - Modern Full-Stack Architecture

An educational full-stack application demonstrating modern web development with **Next.js**, **Fastify**, **PostgreSQL**, and **Prisma**. This project not only works as a demo but also teaches you about the architecture itself through interactive documentation.

## 🎯 What This Is

This is a working monorepo application that:
- **Demonstrates**: A complete full-stack architecture with frontend, backend API, and database
- **Teaches**: Each page explains the technologies, patterns, and how data flows through the system
- **Works**: Create and view items with full CRUD operations
- **Runs easily**: Designed for GitHub Codespaces with simple setup

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Browser                                                │
│  ┌────────────────────────────────────────────────┐    │
│  │  Next.js (React App Router)                    │    │
│  │  Port: 3000                                     │    │
│  │  • Server/Client Components                    │    │
│  │  • TypeScript                                   │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/JSON
                   ↓
┌─────────────────────────────────────────────────────────┐
│  API Server                                             │
│  ┌────────────────────────────────────────────────┐    │
│  │  Fastify + TypeScript                          │    │
│  │  Port: 3001                                     │    │
│  │  • RESTful endpoints                            │    │
│  │  • Zod validation                               │    │
│  │  • Error handling                               │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────┬──────────────────────────────────────┘
                   │ Prisma Client
                   ↓
┌─────────────────────────────────────────────────────────┐
│  Database                                               │
│  ┌────────────────────────────────────────────────┐    │
│  │  PostgreSQL                                     │    │
│  │  • Prisma ORM                                   │    │
│  │  • Type-safe queries                            │    │
│  │  • Migrations                                   │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 + React + TypeScript | UI and routing with App Router |
| **Backend** | Fastify + TypeScript | Fast, low-overhead API server |
| **Database** | PostgreSQL | Relational database |
| **ORM** | Prisma | Type-safe database access |
| **Validation** | Zod | Runtime schema validation |
| **Monorepo** | npm workspaces | Manage multiple packages |

## 📁 Project Structure

```
/
├── package.json              # Root workspace configuration
├── .env.example              # Environment variable template
├── apps/
│   ├── api/                  # Fastify backend
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   ├── seed.ts       # Sample data
│   │   │   └── migrations/   # Version-controlled schema changes
│   │   └── src/
│   │       ├── server.ts     # Main server entry
│   │       ├── routes/       # API endpoints
│   │       │   ├── health.ts # GET /health
│   │       │   └── items.ts  # GET/POST /items
│   │       └── lib/          # Shared utilities
│   │           ├── db.ts     # Prisma client
│   │           ├── validate.ts
│   │           └── errors.ts
│   └── web/                  # Next.js frontend
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       ├── app/              # App Router pages
│       │   ├── layout.tsx
│       │   ├── page.tsx      # Home page
│       │   ├── learn/        # Learn the stack
│       │   └── architecture/ # Architecture deep dive
│       ├── components/       # React components
│       │   ├── Nav.tsx
│       │   ├── TechCard.tsx
│       │   ├── ItemForm.tsx
│       │   └── ItemList.tsx
│       └── lib/
│           ├── apiClient.ts  # Fetch wrapper
│           └── types.ts      # Shared types
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
