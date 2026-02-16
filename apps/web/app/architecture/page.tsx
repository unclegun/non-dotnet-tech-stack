export const metadata = {
  title: 'Architecture - Test Stack',
};

export default function ArchitecturePage() {
  return (
    <main className="container py-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg mb-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="card-body text-white p-5">
          <h1 className="display-4 fw-bold mb-3">🏗️ System Architecture</h1>
          <p className="lead mb-0">
            Explore the architectural patterns, design decisions, and component communication
            in this full-stack application. Built with modern best practices and clean separation of concerns.
          </p>
        </div>
      </div>

      {/* High-Level Architecture */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">📐 High-Level Architecture</h2>
            <p className="text-muted mb-0">Overview of the complete system structure</p>
          </div>
          <div className="card-body">
            <div className="bg-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`
┌──────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Next.js App (Port 3000)                               │  │
│  │  • React Server Components (data fetching)             │  │
│  │  • Client Components (interactivity)                   │  │
│  │  • API Client (typed, contract-based)                  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                         ↕ HTTP/JSON
┌──────────────────────────────────────────────────────────────┐
│              SHARED CONTRACTS (Zod Schemas)                  │
│  • ItemDto, CreateItemBody, ListItemsQuery                   │
│  • NoteDto, CreateNoteBody, ListNotesQuery                   │
│  • ProblemDetails (error format)                             │
└──────────────────────────────────────────────────────────────┘
                         ↕ Imported by both sides
┌──────────────────────────────────────────────────────────────┐
│                 FASTIFY API (Port 3001)                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Plugins (Middleware)                                  │  │
│  │  • requestContext → adds traceId                       │  │
│  │  • timing → measures duration                          │  │
│  │  • errorHandler → maps to Problem Details             │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Routes (HTTP Layer)                                   │  │
│  │  • Parse & validate requests                           │  │
│  │  • Return responses                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Services (Business Logic)                             │  │
│  │  • Reusable logic                                      │  │
│  │  • Can be called from routes, jobs, CLI               │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Repositories (Data Access)                            │  │
│  │  • Prisma queries                                      │  │
│  │  • Abstracts database                                  │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Background Jobs                                       │  │
│  │  • Heartbeat job (every 30s)                           │  │
│  │  • Uses same services/repos                            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                         ↕ Prisma Client
┌──────────────────────────────────────────────────────────────┐
│                   POSTGRESQL DATABASE                        │
│  • items (id, name, createdAt)                               │
│  • notes (id, content, createdAt)                            │
│  • heartbeats (id, message, createdAt)                       │
└──────────────────────────────────────────────────────────────┘
              `}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Request Flow Diagram */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🔄 Request Flow Diagram</h2>
            <p className="text-muted mb-0">How a POST /items request flows through the system</p>
          </div>
          <div className="card-body">
            <div className="bg-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`
1. User submits form
   ↓
2. ItemForm.tsx (client) → apiClient.createItem(body)
   ↓
3. HTTP POST /items with JSON body
   ↓
4. Fastify receives request
   ↓
5. requestContext plugin → adds traceId
   ↓
6. timing plugin → starts timer
   ↓
7. routes.ts → validates body with CreateItemBodySchema
   ↓
8. service.ts → business logic (if any)
   ↓
9. repo.ts → prisma.item.create()
   ↓
10. PostgreSQL → INSERT
   ↓
11. Result bubbles back up: DB → repo → service → routes
   ↓
12. timing plugin → logs duration with traceId
   ↓
13. HTTP 201 response with ItemDto
   ↓
14. apiClient receives typed result
   ↓
15. UI refreshes
              `}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Layered Architecture */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🎂 Layered Architecture</h2>
            <p className="text-muted mb-0">Three-layer architecture for separation of concerns</p>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="border rounded p-4 h-100 bg-light">
                  <h3 className="h5 mb-3">
                    <span className="badge bg-primary me-2">1</span>
                    Routes Layer
                  </h3>
                  <p className="text-muted small mb-3">HTTP Concerns</p>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Parsing & validation</li>
                    <li className="mb-2">✓ Status codes</li>
                    <li className="mb-2">✓ Delegates to services</li>
                  </ul>
                  <div className="mt-3">
                    <small className="text-muted">
                      <code>apps/api/src/modules/*/routes.ts</code>
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-4 h-100 bg-light">
                  <h3 className="h5 mb-3">
                    <span className="badge bg-success me-2">2</span>
                    Service Layer
                  </h3>
                  <p className="text-muted small mb-3">Business Logic</p>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Application logic</li>
                    <li className="mb-2">✓ Reusable operations</li>
                    <li className="mb-2">✓ DTO transformations</li>
                  </ul>
                  <div className="mt-3">
                    <small className="text-muted">
                      <code>apps/api/src/modules/*/service.ts</code>
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-4 h-100 bg-light">
                  <h3 className="h5 mb-3">
                    <span className="badge bg-info me-2">3</span>
                    Repository Layer
                  </h3>
                  <p className="text-muted small mb-3">Data Access</p>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Database operations</li>
                    <li className="mb-2">✓ Testable & mockable</li>
                    <li className="mb-2">✓ Abstracts data source</li>
                  </ul>
                  <div className="mt-3">
                    <small className="text-muted">
                      <code>apps/api/src/modules/*/repo.ts</code>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Patterns & Principles */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">💡 Design Patterns & Principles</h2>
            <p className="text-muted mb-0">Key architectural decisions and patterns used in this stack</p>
          </div>
          <div className="card-body">
            <div className="list-group list-group-flush">
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <span className="badge bg-primary me-3 mt-1">📋</span>
                  <div>
                    <h3 className="h5 mb-2">Contract-First API Design</h3>
                    <p className="mb-0 text-muted">
                      Define the API contract (request/response schemas) in a shared package.
                      Both frontend and backend import these contracts, ensuring type safety
                      and consistency.
                    </p>
                  </div>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-3 mt-1">🔌</span>
                  <div>
                    <h3 className="h5 mb-2">Plugin-Based Middleware</h3>
                    <p className="mb-0 text-muted">
                      Cross-cutting concerns (logging, tracing, error handling) are implemented
                      as Fastify plugins that run before/after route handlers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <span className="badge bg-info me-3 mt-1">💉</span>
                  <div>
                    <h3 className="h5 mb-2">Dependency Injection (Lightweight)</h3>
                    <p className="mb-0 text-muted">
                      Service and repository instances are created once and exported.
                      For more complex apps, consider a DI container.
                    </p>
                  </div>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <span className="badge bg-warning me-3 mt-1">🗃️</span>
                  <div>
                    <h3 className="h5 mb-2">Repository Pattern</h3>
                    <p className="mb-0 text-muted">
                      Data access is abstracted behind repository interfaces.
                      This makes it easier to test business logic without a database.
                    </p>
                  </div>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <span className="badge bg-danger me-3 mt-1">⚠️</span>
                  <div>
                    <h3 className="h5 mb-2">Problem Details for HTTP APIs</h3>
                    <p className="mb-0 text-muted">
                      Errors are returned in a consistent format (RFC 7807 inspired).
                      Similar to ASP.NET Core's ProblemDetails.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapping to Other Ecosystems */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🌐 Mapping to Other Ecosystems</h2>
            <p className="text-muted mb-0">If you're coming from another ecosystem, here's how concepts map</p>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="fw-semibold">This Stack</th>
                    <th className="fw-semibold"><span className="badge bg-primary">ASP.NET Core</span></th>
                    <th className="fw-semibold"><span className="badge bg-success">Spring Boot</span></th>
                    <th className="fw-semibold"><span className="badge bg-danger">Rails</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Fastify</strong></td>
                    <td>ASP.NET Core</td>
                    <td>Spring MVC</td>
                    <td>Rails Server</td>
                  </tr>
                  <tr>
                    <td><strong>Routes</strong></td>
                    <td>Controllers</td>
                    <td>Controllers</td>
                    <td>Controllers</td>
                  </tr>
                  <tr>
                    <td><strong>Services</strong></td>
                    <td>Services</td>
                    <td>Services</td>
                    <td>Services</td>
                  </tr>
                  <tr>
                    <td><strong>Repositories</strong></td>
                    <td>Repositories</td>
                    <td>Repositories</td>
                    <td>Models</td>
                  </tr>
                  <tr>
                    <td><strong>Plugins</strong></td>
                    <td>Middleware</td>
                    <td>Filters/Interceptors</td>
                    <td>Middleware/Concerns</td>
                  </tr>
                  <tr>
                    <td><strong>Zod Schemas</strong></td>
                    <td>Data Annotations</td>
                    <td>JSR-303 Validation</td>
                    <td>ActiveModel Validations</td>
                  </tr>
                  <tr>
                    <td><strong>Prisma</strong></td>
                    <td>Entity Framework</td>
                    <td>JPA/Hibernate</td>
                    <td>ActiveRecord</td>
                  </tr>
                  <tr>
                    <td><strong>ProblemDetails</strong></td>
                    <td>ProblemDetails</td>
                    <td>@ControllerAdvice</td>
                    <td>rescue_from</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-offs & Alternatives */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">⚖️ Trade-offs & Alternatives</h2>
            <p className="text-muted mb-0">Understanding the choices made and when to consider alternatives</p>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="border rounded p-4 h-100">
                  <h3 className="h5 mb-3">🏢 Monolith vs Microservices</h3>
                  <div className="alert alert-info mb-3">
                    <strong>This repo:</strong> Monolith (single API server)
                  </div>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">✅ Simpler deployment, easier local dev</li>
                    <li className="mb-2">✅ Shared code, transactions across entities</li>
                    <li className="mb-2">⚠️ Harder to scale independently</li>
                  </ul>
                  <p className="text-muted small mb-0">
                    <strong>When to split:</strong> Different scaling needs, team boundaries, independent deployments
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="border rounded p-4 h-100">
                  <h3 className="h5 mb-3">🗄️ ORM vs Raw SQL</h3>
                  <div className="alert alert-info mb-3">
                    <strong>This repo:</strong> Prisma (ORM)
                  </div>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">✅ Type-safe, easy to use, good DX</li>
                    <li className="mb-2">⚠️ Less control over queries</li>
                  </ul>
                  <p className="text-muted small mb-0">
                    <strong>When to use SQL:</strong> Complex joins, performance-critical queries, DB-specific features
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="border rounded p-4 h-100">
                  <h3 className="h5 mb-3">🔗 REST vs GraphQL</h3>
                  <div className="alert alert-info mb-3">
                    <strong>This repo:</strong> REST
                  </div>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">✅ Simple, well-understood, HTTP-native</li>
                    <li className="mb-2">⚠️ Fixed endpoints, potential over/under-fetching</li>
                  </ul>
                  <p className="text-muted small mb-0">
                    <strong>When GraphQL helps:</strong> Complex data requirements, mobile apps, many clients
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="border rounded p-4 h-100">
                  <h3 className="h5 mb-3">⚛️ Server Components vs Client SPA</h3>
                  <div className="alert alert-info mb-3">
                    <strong>This repo:</strong> Mix of both (Next.js App Router)
                  </div>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">✅ Server Components for data fetching (faster initial load)</li>
                    <li className="mb-2">✅ Client Components for interactivity</li>
                  </ul>
                  <p className="text-muted small mb-0">
                    <strong>Pure SPA:</strong> More client-side logic, slower initial load but smoother transitions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Not Included */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm border-warning border-2">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🚧 What's Not Included (Yet)</h2>
            <p className="text-muted mb-0">Real production apps would also need these features</p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">🔐</span>
                    Authentication & authorization (JWT, sessions, OAuth)
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">🚦</span>
                    Rate limiting
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">💾</span>
                    Caching (Redis)
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">📬</span>
                    Message queue (BullMQ, RabbitMQ)
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">📤</span>
                    File uploads (S3)
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">🔍</span>
                    Full-text search (Elasticsearch)
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">📊</span>
                    Monitoring & alerting (Datadog, New Relic)
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">🔄</span>
                    CI/CD pipeline
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <span className="badge bg-secondary me-2">💿</span>
                    Database backups & disaster recovery
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <div className="card-body text-white p-4">
            <h2 className="h3 mb-3">📚 Learn More</h2>
            <p className="mb-3">Explore these pages for deeper dives:</p>
            <div className="d-flex flex-wrap gap-2">
              <a href="/concepts" className="btn btn-light btn-lg">
                💭 Concepts
                <br />
                <small className="text-muted">Individual architectural patterns</small>
              </a>
              <a href="/code-walkthrough" className="btn btn-light btn-lg">
                🗺️ Code Walkthrough
                <br />
                <small className="text-muted">Guided tour of key files</small>
              </a>
              <a href="/observability" className="btn btn-light btn-lg">
                📡 Observability
                <br />
                <small className="text-muted">Logging and tracing in action</small>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
