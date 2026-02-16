# Architecture Lab - Implementation Summary

## What Was Built

This repository has been expanded from a simple CRUD demo into a comprehensive "architecture lab" that teaches modern full-stack patterns through working code and interactive documentation.

## Key Additions

### 1. Shared Contracts Package (`packages/contracts/`)
A new workspace package that centralizes API contracts using Zod schemas:
- **Purpose**: Single source of truth for API shape, shared between frontend and backend
- **Contents**: DTOs for Items, Notes, ProblemDetails
- **Benefit**: Type safety across the network boundary, contract-first API design

### 2. API Refactoring (Layered Architecture)

#### Plugins (`apps/api/src/plugins/`)
- **requestContext.ts**: Adds unique `traceId` to every request
- **timing.ts**: Measures and logs request duration
- **errorHandler.ts**: Maps errors to Problem Details format (RFC 7807 inspired)

#### Modular Structure (`apps/api/src/modules/`)
Each feature (Items, Notes) is organized as:
- **routes.ts**: HTTP layer (parsing, validation, status codes)
- **service.ts**: Business logic (reusable, can be called from routes/jobs/CLI)
- **repo.ts**: Data access layer (abstracts Prisma queries)

#### Background Jobs (`apps/api/src/jobs/`)
- **heartbeat.ts**: Runs every 30 seconds, writes to database
- Demonstrates scheduled task pattern with separate logging

### 3. Database Schema Updates (`apps/api/prisma/`)
- **Note model**: Second entity to demonstrate modularity
- **Heartbeat model**: For background job tracking
- Updated seed data with sample Notes and Heartbeat entries

### 4. Web Application Expansion

#### Educational Content Pages
- `/concepts` - Learning hub with links to individual lessons
- `/concepts/request-lifecycle` - How requests flow through middleware
- `/concepts/validation-contracts` - Contract-first API design
- `/concepts/error-handling` - Problem Details pattern
- `/concepts/data-access` - Layered architecture (routes → service → repo)
- `/concepts/observability` - Tracing and structured logging
- `/concepts/testing` - Testing strategy and examples

#### Feature Pages
- `/notes` - Second CRUD demo (mirrors Items pattern)
- `/architecture` - System diagrams and trade-off analysis
- `/code-walkthrough` - Guided tour of key files with explanations
- `/observability` - Live demo of logging and tracing

#### UI Improvements
- Updated navigation with all new pages
- Consistent styling across educational content
- Code examples in every concept page

### 5. Testing Infrastructure
- **Integration tests** (`apps/api/tests/api.test.ts`):
  - Tests full request/response cycle
  - Validates API contract compliance
  - Covers happy path and error cases
  - Tests pagination and search

### 6. Documentation
- Comprehensive **README.md** with architecture overview
- **SETUP.md** with step-by-step getting started guide
- Updated **.env.example** with all configuration options
- Inline code comments explaining patterns and trade-offs

## Architecture Patterns Demonstrated

### Contract-First API Design
- Zod schemas define the "contract" once
- Both frontend and backend import these contracts
- Runtime validation + compile-time types

### Three-Layer Architecture
```
Routes (HTTP)     → Handle requests/responses
  ↓
Services (Logic)  → Business rules, coordination
  ↓
Repositories (DB) → Data access abstraction
```

### Plugin-Based Middleware
- Cross-cutting concerns as Fastify plugins
- Request context (traceId)
- Timing/performance measurement
- Centralized error handling

### Observability
- Unique traceId for every request
- Structured JSON logging
- Error responses include traceId
- Duration logged automatically

### Error Handling
- Consistent Problem Details format
- Maps ZodError → 400 with field-level errors
- Maps AppError → custom status codes
- Maps unknown errors → 500 (hides details in prod)

## File Organization

```
/workspaces/non-dotnet-tech-stack/
│
├── packages/
│   └── contracts/                    # Shared API contracts
│       ├── src/
│       │   ├── index.ts
│       │   ├── items.ts             # Item DTOs & schemas
│       │   ├── notes.ts             # Note DTOs & schemas
│       │   └── errors.ts            # ProblemDetails schema
│       ├── package.json
│       └── tsconfig.json
│
├── apps/
│   ├── api/                          # Fastify backend
│   │   ├── src/
│   │   │   ├── server.ts             # Bootstrap, register plugins/routes
│   │   │   │
│   │   │   ├── plugins/              # Middleware
│   │   │   │   ├── requestContext.ts # Add traceId
│   │   │   │   ├── timing.ts         # Measure duration
│   │   │   │   └── errorHandler.ts   # Problem Details
│   │   │   │
│   │   │   ├── modules/              # Feature modules
│   │   │   │   ├── items/
│   │   │   │   │   ├── routes.ts     # HTTP endpoints
│   │   │   │   │   ├── service.ts    # Business logic
│   │   │   │   │   └── repo.ts       # Data access
│   │   │   │   └── notes/
│   │   │   │       ├── routes.ts
│   │   │   │       ├── service.ts
│   │   │   │       └── repo.ts
│   │   │   │
│   │   │   ├── jobs/                 # Background jobs
│   │   │   │   └── heartbeat.ts      # Runs every 30s
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   └── health.ts         # Health check
│   │   │   │
│   │   │   └── lib/                  # Utilities
│   │   │       ├── config.ts         # Env validation
│   │   │       ├── db.ts             # Prisma client
│   │   │       ├── appError.ts       # Custom errors
│   │   │       └── validate.ts       # Validation helper (deprecated)
│   │   │
│   │   ├── prisma/
│   │   │   ├── schema.prisma         # Item, Note, Heartbeat models
│   │   │   ├── seed.ts               # Sample data
│   │   │   └── migrations/           # Version controlled schema
│   │   │
│   │   ├── tests/
│   │   │   └── api.test.ts           # Integration tests
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                          # Next.js frontend
│       ├── app/
│       │   ├── page.tsx              # Homepage (Items demo)
│       │   ├── layout.tsx
│       │   │
│       │   ├── notes/
│       │   │   └── page.tsx          # Notes CRUD demo
│       │   │
│       │   ├── concepts/             # Learning pages
│       │   │   ├── page.tsx          # Concepts hub
│       │   │   ├── request-lifecycle/
│       │   │   ├── validation-contracts/
│       │   │   ├── error-handling/
│       │   │   ├── data-access/
│       │   │   ├── observability/
│       │   │   └── testing/
│       │   │
│       │   ├── architecture/
│       │   │   └── page.tsx          # Architecture guide
│       │   │
│       │   ├── code-walkthrough/
│       │   │   └── page.tsx          # Code tour
│       │   │
│       │   └── observability/
│       │       └── page.tsx          # Observability demo
│       │
│       ├── components/
│       │   ├── Nav.tsx               # Navigation (updated)
│       │   ├── ItemForm.tsx
│       │   ├── ItemList.tsx
│       │   ├── NoteForm.tsx          # New
│       │   ├── NoteList.tsx          # New
│       │   └── TechCard.tsx
│       │
│       ├── lib/
│       │   ├── apiClient.ts          # Type-safe API client (updated)
│       │   └── types.ts              # Legacy types (now using contracts)
│       │
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.js
│
├── package.json                      # Root workspace config (updated)
├── README.md                         # Comprehensive documentation (updated)
├── SETUP.md                          # Setup guide (new)
├── .env.example                      # Environment template (updated)
└── IMPLEMENTATION.md                 # This file (new)
```

## What Changed vs Original

### Removed/Deprecated
- `apps/api/src/lib/errors.ts` (old AppError) → replaced with `appError.ts`
- `apps/api/src/lib/validate.ts` → validation now inline with Zod in routes
- `apps/api/src/routes/items.ts` (old) → moved to `modules/items/routes.ts`
- `apps/web/lib/types.ts` (partially) → now using contracts package

### Added
- Entire `packages/contracts/` workspace
- `apps/api/src/plugins/` directory
- `apps/api/src/modules/` directory structure
- `apps/api/src/jobs/` directory
- `apps/api/src/lib/config.ts`
- `apps/api/src/lib/appError.ts`
- `apps/api/tests/` directory
- Multiple new pages in `apps/web/app/`
- `apps/web/components/Note*.tsx`

### Updated
- `apps/api/src/server.ts` - plugin registration, graceful shutdown
- `apps/api/prisma/schema.prisma` - Note and Heartbeat models
- `apps/api/prisma/seed.ts` - seed Notes and Heartbeat
- `apps/web/lib/apiClient.ts` - type-safe methods using contracts
- `apps/web/components/Nav.tsx` - links to new pages
- Root `package.json` - added packages/* workspace, test script
- `README.md` - comprehensive rewrite
- `.env.example` - new variables

## API Endpoints

### Changed
- `GET /items` - Now supports `?page=1&pageSize=20&q=search`
- `POST /items` - Same, but now returns typed `ItemDto`

### Added
- `GET /notes?page=1&pageSize=20&q=search` - List notes with pagination
- `POST /notes` - Create note

### Unchanged
- `GET /health` - Health check

## Technologies & Dependencies

### New Dependencies
- **fastify-plugin** - For creating Fastify plugins
- **@test-stack/contracts** - Shared contracts package (internal)

### No New External Dependencies
- Still using: Fastify, Next.js, Prisma, Zod, PostgreSQL
- Testing uses Node's built-in test runner (no Jest/Vitest)
- Logging uses Pino (already included with Fastify)

## Learning Path

Recommended order to explore the codebase:

1. **Read SETUP.md** - Get the app running
2. **Visit /concepts** - Understanding high-level patterns
3. **Read /architecture** - System overview
4. **Follow /code-walkthrough** - File-by-file explanation
5. **Try /observability** - See logging in action
6. **Study a module** - Pick Items or Notes, follow routes → service → repo
7. **Read tests** - See how contracts are validated
8. **Make changes** - Try adding a field or new entity

## Next Steps for Learning

After mastering this codebase, consider exploring:

### Immediate Next Steps
- Add authentication (JWT tokens)
- Add rate limiting
- Implement caching layer
- Add more comprehensive tests (unit tests for services)

### Advanced Topics
- Message queues (BullMQ for background jobs)
- Search indexing (Elasticsearch)
- Real-time features (WebSockets, Server-Sent Events)
- API versioning (v1, v2 endpoints)
- Database transactions and complex queries
- Database read replicas and connection pooling

### Production Readiness
- CI/CD pipeline
- Docker containers
- Kubernetes deployment
- Monitoring/APM (Datadog, New Relic)
- Log aggregation (ELK, Splunk)
- Distributed tracing (OpenTelemetry)
- Load testing and optimization

## Resources

- **Fastify**: https://www.fastify.io/
- **Next.js**: https://nextjs.org/
- **Prisma**: https://www.prisma.io/
- **Zod**: https://zod.dev/
- **RFC 7807 (Problem Details)**: https://datatracker.ietf.org/doc/html/rfc7807
- **Node Test Runner**: https://nodejs.org/api/test.html

## Support

This is an educational project. For questions:
1. Check the inline code comments
2. Visit the `/concepts` pages in the running app
3. Read the architecture documentation
4. Open a GitHub issue for clarifications

---

**Built to teach, easy to extend.** Happy learning! 🚀
