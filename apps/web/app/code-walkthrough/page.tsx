export default function CodeWalkthroughPage() {
  return (
    <main className="container py-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg mb-5" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <div className="card-body text-white p-5">
          <h1 className="display-4 fw-bold mb-3">🗺️ Code Walkthrough</h1>
          <p className="lead mb-0">
            A guided tour of the key files and patterns in this repository.
            Each section links to specific files and explains what they do.
          </p>
        </div>
      </div>

      {/* Project Structure */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">📁 Project Structure</h2>
            <p className="text-muted mb-0">High-level overview of the monorepo layout</p>
          </div>
          <div className="card-body">
            <div className="bg-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`
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
            </div>
          </div>
        </div>
      </section>

      {/* Key Files to Understand */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🔑 Key Files to Understand</h2>
            <p className="text-muted mb-0">Essential files that demonstrate core patterns and concepts</p>
          </div>
          <div className="card-body">
            <div className="accordion" id="keyFilesAccordion">
              {/* Shared Contracts */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                    <span className="badge bg-primary me-2">1</span>
                    Shared Contracts
                  </button>
                </h3>
                <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">packages/contracts/src/items.ts</code>
                    </p>
                    <p className="mb-0">
                      Defines the "contract" between API and frontend using Zod.
                      Both sides import these types, ensuring consistency.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Server Bootstrap */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                    <span className="badge bg-primary me-2">2</span>
                    API Server Bootstrap
                  </button>
                </h3>
                <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/api/src/server.ts</code>
                    </p>
                    <p className="mb-0">
                      Registers plugins, routes, and starts the server.
                      This is the entry point for the API.
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Context Plugin */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                    <span className="badge bg-primary me-2">3</span>
                    Request Context Plugin
                  </button>
                </h3>
                <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/api/src/plugins/requestContext.ts</code>
                    </p>
                    <p className="mb-0">
                      Adds a unique <code>traceId</code> to every request.
                      Demonstrates Fastify's plugin system.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Handler Plugin */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                    <span className="badge bg-primary me-2">4</span>
                    Error Handler Plugin
                  </button>
                </h3>
                <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/api/src/plugins/errorHandler.ts</code>
                    </p>
                    <p className="mb-0">
                      Centralized error handling that maps errors to Problem Details format.
                      Handles Zod validation errors, AppErrors, and unknown exceptions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Module */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5">
                    <span className="badge bg-primary me-2">5</span>
                    Items Module
                  </button>
                </h3>
                <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <code className="bg-light px-2 py-1 rounded">apps/api/src/modules/items/routes.ts</code> - HTTP endpoints
                      </li>
                      <li className="list-group-item">
                        <code className="bg-light px-2 py-1 rounded">apps/api/src/modules/items/service.ts</code> - Business logic
                      </li>
                      <li className="list-group-item">
                        <code className="bg-light px-2 py-1 rounded">apps/api/src/modules/items/repo.ts</code> - Database queries
                      </li>
                    </ul>
                    <p className="mb-0 mt-3">
                      Demonstrates the three-layer architecture: routes → service → repository.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prisma Schema */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6">
                    <span className="badge bg-primary me-2">6</span>
                    Prisma Schema
                  </button>
                </h3>
                <div id="collapse6" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/api/prisma/schema.prisma</code>
                    </p>
                    <p className="mb-0">
                      Defines database models (Item, Note, Heartbeat).
                      Prisma generates TypeScript types from this schema.
                    </p>
                  </div>
                </div>
              </div>

              {/* Background Job */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7">
                    <span className="badge bg-primary me-2">7</span>
                    Background Job
                  </button>
                </h3>
                <div id="collapse7" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/api/src/jobs/heartbeat.ts</code>
                    </p>
                    <p className="mb-0">
                      A minimal background job that runs every 30 seconds.
                      Demonstrates how to add scheduled tasks.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Client */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8">
                    <span className="badge bg-primary me-2">8</span>
                    API Client
                  </button>
                </h3>
                <div id="collapse8" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/web/lib/apiClient.ts</code>
                    </p>
                    <p className="mb-0">
                      Type-safe API client for the frontend.
                      Uses contracts to ensure type safety across the network boundary.
                    </p>
                  </div>
                </div>
              </div>

              {/* Integration Tests */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse9">
                    <span className="badge bg-primary me-2">9</span>
                    Integration Tests
                  </button>
                </h3>
                <div id="collapse9" className="accordion-collapse collapse" data-bs-parent="#keyFilesAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      <code className="bg-light px-2 py-1 rounded">apps/api/tests/api.test.ts</code>
                    </p>
                    <p className="mb-0">
                      Smoke tests that validate the API contract.
                      Tests the full request/response cycle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Data Flows */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🔄 How Data Flows</h2>
            <p className="text-muted mb-0">Step-by-step request/response lifecycle</p>
          </div>
          <div className="card-body">
            <div className="bg-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`
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
            </div>
          </div>
        </div>
      </section>

      {/* Patterns to Notice */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">✨ Patterns to Notice</h2>
            <p className="text-muted mb-0">Key architectural patterns and best practices</p>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex align-items-start">
                <span className="badge bg-success rounded-pill me-3 mt-1">✓</span>
                <div>
                  <strong>Contract-First:</strong> Schema defined once, used everywhere
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <span className="badge bg-success rounded-pill me-3 mt-1">✓</span>
                <div>
                  <strong>Layered Architecture:</strong> Clear separation of concerns
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <span className="badge bg-success rounded-pill me-3 mt-1">✓</span>
                <div>
                  <strong>Plugin-Based Middleware:</strong> Fastify plugins for cross-cutting concerns
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <span className="badge bg-success rounded-pill me-3 mt-1">✓</span>
                <div>
                  <strong>Structured Logging:</strong> JSON logs with traceId
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <span className="badge bg-success rounded-pill me-3 mt-1">✓</span>
                <div>
                  <strong>Error Handling:</strong> Centralized, consistent Problem Details
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <span className="badge bg-success rounded-pill me-3 mt-1">✓</span>
                <div>
                  <strong>Type Safety:</strong> End-to-end TypeScript from DB to UI
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🚀 Next Steps</h2>
            <p className="text-muted mb-0">Get started with the codebase</p>
          </div>
          <div className="card-body">
            <p className="mb-3">Clone the repo and explore these files in your editor:</p>
            <div className="bg-dark text-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`git clone https://github.com/unclegun/non-dotnet-tech-stack
cd non-dotnet-tech-stack
npm install`}</pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
