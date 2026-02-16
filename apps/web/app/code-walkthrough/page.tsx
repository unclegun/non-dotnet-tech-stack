export default function CodeWalkthroughPage() {
  return (
    <main>
      <h1>Code Walkthrough</h1>
      <p>
        A guided tour of the key files and patterns in this repository.
        Each section links to specific files and explains what they do.
      </p>

      <section>
        <h2>Project Structure</h2>
        <pre>{`
/
├── packages/
│   └── contracts/          ← Shared API contracts (Zod schemas)
│       └── src/
│           ├── items.ts    ← Item DTOs and schemas
│           ├── notes.ts    ← Note DTOs and schemas
│           └── errors.ts   ← ProblemDetails schema
│
├── apps/
│   ├── api/                ← Fastify backend
│   │   ├── src/
│   │   │   ├── plugins/    ← Middleware (requestContext, timing, errorHandler)
│   │   │   ├── modules/    ← Feature modules (items, notes)
│   │   │   │   ├── items/
│   │   │   │   │   ├── routes.ts   ← HTTP endpoints
│   │   │   │   │   ├── service.ts  ← Business logic
│   │   │   │   │   └── repo.ts     ← Data access
│   │   │   │   └── notes/
│   │   │   ├── jobs/       ← Background jobs (heartbeat)
│   │   │   ├── lib/        ← Utilities (config, db, errors)
│   │   │   └── server.ts   ← App entry point
│   │   ├── prisma/
│   │   │   ├── schema.prisma    ← Database models
│   │   │   └── seed.ts          ← Sample data
│   │   └── tests/
│   │       └── api.test.ts      ← Integration tests
│   │
│   └── web/                ← Next.js frontend
│       ├── app/            ← Pages (App Router)
│       │   ├── concepts/   ← Learning pages
│       │   ├── notes/      ← Notes feature
│       │   └── page.tsx    ← Homepage
│       ├── components/     ← React components
│       └── lib/            ← API client
│
└── package.json            ← Workspace root
        `}</pre>
      </section>

      <section>
        <h2>Key Files to Understand</h2>

        <h3>1. Shared Contracts</h3>
        <code>packages/contracts/src/items.ts</code>
        <p>
          Defines the "contract" between API and frontend using Zod.
          Both sides import these types, ensuring consistency.
        </p>

        <h3>2. API Server Bootstrap</h3>
        <code>apps/api/src/server.ts</code>
        <p>
          Registers plugins, routes, and starts the server.
          This is the entry point for the API.
        </p>

        <h3>3. Request Context Plugin</h3>
        <code>apps/api/src/plugins/requestContext.ts</code>
        <p>
          Adds a unique <code>traceId</code> to every request.
          Demonstrates Fastify's plugin system.
        </p>

        <h3>4. Error Handler Plugin</h3>
        <code>apps/api/src/plugins/errorHandler.ts</code>
        <p>
          Centralized error handling that maps errors to Problem Details format.
          Handles Zod validation errors, AppErrors, and unknown exceptions.
        </p>

        <h3>5. Items Module</h3>
        <ul>
          <li><code>apps/api/src/modules/items/routes.ts</code> - HTTP endpoints</li>
          <li><code>apps/api/src/modules/items/service.ts</code> - Business logic</li>
          <li><code>apps/api/src/modules/items/repo.ts</code> - Database queries</li>
        </ul>
        <p>
          Demonstrates the three-layer architecture: routes → service → repository.
        </p>

        <h3>6. Prisma Schema</h3>
        <code>apps/api/prisma/schema.prisma</code>
        <p>
          Defines database models (Item, Note, Heartbeat).
          Prisma generates TypeScript types from this schema.
        </p>

        <h3>7. Background Job</h3>
        <code>apps/api/src/jobs/heartbeat.ts</code>
        <p>
          A minimal background job that runs every 30 seconds.
          Demonstrates how to add scheduled tasks.
        </p>

        <h3>8. API Client</h3>
        <code>apps/web/lib/apiClient.ts</code>
        <p>
          Type-safe API client for the frontend.
          Uses contracts to ensure type safety across the network boundary.
        </p>

        <h3>9. Integration Tests</h3>
        <code>apps/api/tests/api.test.ts</code>
        <p>
          Smoke tests that validate the API contract.
          Tests the full request/response cycle.
        </p>
      </section>

      <section>
        <h2>How Data Flows</h2>
        <pre>{`
1. User clicks "Create Item" in the browser
   ↓
2. ItemForm.tsx calls apiClient.createItem()
   ↓
3. API client sends POST /items with validated body (CreateItemBody)
   ↓
4. Fastify receives request, runs plugins (traceId, timing)
   ↓
5. routes.ts validates request body with CreateItemBodySchema
   ↓
6. service.ts contains business logic (currently just delegation)
   ↓
7. repo.ts executes Prisma query
   ↓
8. Prisma talks to PostgreSQL
   ↓
9. Result bubbles back up: repo → service → routes → HTTP response
   ↓
10. API client receives typed ItemDto
   ↓
11. Browser refreshes to show new item
        `}</pre>
      </section>

      <section>
        <h2>Patterns to Notice</h2>
        <ul>
          <li><strong>Contract-First:</strong> Schema defined once, used everywhere</li>
          <li><strong>Layered Architecture:</strong> Clear separation of concerns</li>
          <li><strong>Plugin-Based Middleware:</strong> Fastify plugins for cross-cutting concerns</li>
          <li><strong>Structured Logging:</strong> JSON logs with traceId</li>
          <li><strong>Error Handling:</strong> Centralized, consistent Problem Details</li>
          <li><strong>Type Safety:</strong> End-to-end TypeScript from DB to UI</li>
        </ul>
      </section>

      <section>
        <h2>Next Steps</h2>
        <p>Clone the repo and explore these files in your editor:</p>
        <pre>{`
git clone https://github.com/unclegun/non-dotnet-tech-stack
cd non-dotnet-tech-stack
npm install
        `}</pre>
      </section>
    </main>
  );
}
