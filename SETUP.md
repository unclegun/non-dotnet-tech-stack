# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This installs dependencies for all workspaces (contracts, api, web).

### 2. Build Shared Contracts
```bash
cd packages/contracts && npm run build && cd ../..
```

### 3. Set Up Database

Create a `.env` file in the root:
```bash
cp .env.example .env
```

Edit `.env` and set your `DATABASE_URL`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/teststack"
```

### 4. Run Migrations
```bash
npm run db:migrate
npm run db:seed
```

This creates the database schema and seeds it with sample data.

### 5. Start Development Servers
```bash
npm run dev
```

This starts both the API (port 3001) and web (port 3000) servers.

Visit http://localhost:3000 to see the app!

## What's New

This expanded version includes:

### Architecture Improvements
- **Shared Contracts Package** (`packages/contracts/`): Zod schemas shared between API and web
- **Layered Architecture**: Routes → Services → Repositories pattern
- **Middleware Plugins**: requestContext (traceId), timing, errorHandler
- **Modular Structure**: Each entity (Items, Notes) is a self-contained module

### New Features
- **Notes CRUD**: A second entity demonstrating modularity
- **Pagination & Filtering**: `GET /items?page=1&pageSize=20&q=search`
- **Background Jobs**: Heartbeat job runs every 30 seconds
- **Integration Tests**: `apps/api/tests/api.test.ts`

### Educational Content
- **Concepts Pages** (`/concepts/*`): 
  - Request lifecycle & middleware
  - Validation & contract-first APIs
  - Error handling with Problem Details
  - Data access patterns (ORM vs SQL)
  - Observability basics
  - Testing strategy

- **Architecture Page** (`/architecture`): System diagrams and design trade-offs
- **Code Walkthrough** (`/code-walkthrough`): Guided tour of key files
- **Observability Demo** (`/observability`): See tracing and logging in action

### Observability
- **Request Tracing**: Every request gets a unique `traceId`
- **Structured Logging**: JSON logs with context
- **Timing**: Automatic request duration measurement
- **Error Tracing**: Errors include `traceId` for correlation

### API Enhancements
- **Problem Details**: RFC 7807-inspired error responses
- **Zod Validation**: Runtime validation with type inference
- **Type Safety**: End-to-end types from database to UI

## Project Structure

```
/
├── packages/
│   └── contracts/          # Shared API contracts (Zod schemas)
│
├── apps/
│   ├── api/                # Fastify backend
│   │   ├── src/
│   │   │   ├── plugins/        # Middleware (requestContext, timing, errorHandler)
│   │   │   ├── modules/        # Feature modules (items/, notes/)
│   │   │   ├── jobs/           # Background jobs (heartbeat)
│   │   │   ├── lib/            # Utilities (config, db, errors)
│   │   │   └── server.ts       # Bootstrap
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # DB models (Item, Note, Heartbeat)
│   │   │   └── seed.ts
│   │   └── tests/              # Integration tests
│   │
│   └── web/                # Next.js frontend
│       ├── app/
│       │   ├── concepts/       # Learning pages
│       │   ├── architecture/   # Architecture guide
│       │   ├── code-walkthrough/
│       │   ├── observability/
│       │   └── notes/          # Notes demo
│       ├── components/
│       └── lib/
│           └── apiClient.ts    # Type-safe API client
```

## Available Commands

```bash
# Development
npm run dev          # Start API + web
npm run dev:api      # API only (port 3001)
npm run dev:web      # Web only (port 3000)

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed data
npm run db:studio    # Prisma Studio

# Testing
npm run test         # Run integration tests

# Building
npm run build        # Build all workspaces
npm run clean        # Clean all build artifacts
```

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string

### Optional
- `API_PORT`: API server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `LOG_LEVEL`: Logging level (info/debug/warn/error)
- `JOBS_ENABLED`: Enable background jobs (default: true)
- `NEXT_PUBLIC_API_URL`: API URL for frontend (default: http://localhost:3001)

## Troubleshooting

### Database Connection Error
Make sure PostgreSQL is running and `DATABASE_URL` is correct in `.env`.

### Module Not Found Errors
Run `npm install` in the root directory to install all workspace dependencies.

### Contracts Import Errors
Build the contracts package: `cd packages/contracts && npm run build`

### Port Already in Use
Change ports in `.env`:
```
API_PORT=3002
```
And update `NEXT_PUBLIC_API_URL` in web's environment.

## Next Steps

1. **Explore the UI**: Visit http://localhost:3000/concepts
2. **Read the Code**: Follow the code walkthrough
3. **Watch the Logs**: See tracing in action
4. **Run Tests**: `npm run test`
5. **Add a Feature**: Try adding a new entity or endpoint

## Learn More

- Read the [main README](./README.md) for architecture overview
- Visit `/concepts` in the running app for detailed lessons
- Check `/architecture` for system diagrams
- See `/code-walkthrough` for guided file tour
