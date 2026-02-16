export const metadata = {
  title: 'Architecture - Test Stack',
};

export default function ArchitecturePage() {
  return (
    <main>
      <h1>System Architecture</h1>
      <p>
        This page explains the architectural patterns, design decisions, and how components
        communicate in this full-stack application.
      </p>

      <section>
        <h2>High-Level Architecture</h2>
        <pre>{`
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
      </section>

      <section>
        <h2>Request Flow Diagram</h2>
        <p>How a POST /items request flows through the system:</p>
        <pre>{`
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
      </section>

      <section>
        <h2>Layered Architecture</h2>
        <p>
          The API uses a three-layer architecture for separation of concerns:
        </p>
        
        <h3>Routes Layer (HTTP)</h3>
        <ul>
          <li>Handles HTTP concerns: parsing, validation, status codes</li>
          <li>Thin layer that delegates to services</li>
          <li>Location: <code>apps/api/src/modules/*/routes.ts</code></li>
        </ul>

        <h3>Service Layer (Business Logic)</h3>
        <ul>
          <li>Contains application-specific logic</li>
          <li>Can be called from routes, background jobs, CLI tools</li>
          <li>Transforms between DTOs and domain models</li>
          <li>Location: <code>apps/api/src/modules/*/service.ts</code></li>
        </ul>

        <h3>Repository Layer (Data Access)</h3>
        <ul>
          <li>Encapsulates all database operations</li>
          <li>Makes testing easier (mock the repo)</li>
          <li>Abstracts data source (could swap DB, add caching, etc.)</li>
          <li>Location: <code>apps/api/src/modules/*/repo.ts</code></li>
        </ul>
      </section>

      <section>
        <h2>Design Patterns & Principles</h2>
        
        <h3>Contract-First API Design</h3>
        <p>
          Define the API contract (request/response schemas) in a shared package.
          Both frontend and backend import these contracts, ensuring type safety
          and consistency.
        </p>

        <h3>Plugin-Based Middleware</h3>
        <p>
          Cross-cutting concerns (logging, tracing, error handling) are implemented
          as Fastify plugins that run before/after route handlers.
        </p>

        <h3>Dependency Injection (Lightweight)</h3>
        <p>
          Service and repository instances are created once and exported.
          For more complex apps, consider a DI container.
        </p>

        <h3>Repository Pattern</h3>
        <p>
          Data access is abstracted behind repository interfaces.
          This makes it easier to test business logic without a database.
        </p>

        <h3>Problem Details for HTTP APIs</h3>
        <p>
          Errors are returned in a consistent format (RFC 7807 inspired).
          Similar to ASP.NET Core's ProblemDetails.
        </p>
      </section>

      <section>
        <h2>Mapping to Other Ecosystems</h2>
        <p>
          If you're coming from another ecosystem, here's how concepts map:
        </p>

        <table>
          <thead>
            <tr>
              <th>This Stack</th>
              <th>ASP.NET Core</th>
              <th>Spring Boot</th>
              <th>Rails</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fastify</td>
              <td>ASP.NET Core</td>
              <td>Spring MVC</td>
              <td>Rails Server</td>
            </tr>
            <tr>
              <td>Routes</td>
              <td>Controllers</td>
              <td>Controllers</td>
              <td>Controllers</td>
            </tr>
            <tr>
              <td>Services</td>
              <td>Services</td>
              <td>Services</td>
              <td>Services</td>
            </tr>
            <tr>
              <td>Repositories</td>
              <td>Repositories</td>
              <td>Repositories</td>
              <td>Models</td>
            </tr>
            <tr>
              <td>Plugins</td>
              <td>Middleware</td>
              <td>Filters/Interceptors</td>
              <td>Middleware/Concerns</td>
            </tr>
            <tr>
              <td>Zod Schemas</td>
              <td>Data Annotations</td>
              <td>JSR-303 Validation</td>
              <td>ActiveModel Validations</td>
            </tr>
            <tr>
              <td>Prisma</td>
              <td>Entity Framework</td>
              <td>JPA/Hibernate</td>
              <td>ActiveRecord</td>
            </tr>
            <tr>
              <td>ProblemDetails</td>
              <td>ProblemDetails</td>
              <td>@ControllerAdvice</td>
              <td>rescue_from</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Trade-offs & Alternatives</h2>

        <h3>Monolith vs Microservices</h3>
        <p><strong>This repo:</strong> Monolith (single API server)</p>
        <ul>
          <li>✅ Simpler deployment, easier local dev</li>
          <li>✅ Shared code, transactions across entities</li>
          <li>⚠️ Harder to scale independently</li>
        </ul>
        <p><strong>When to split:</strong> Different scaling needs, team boundaries, independent deployments</p>

        <h3>ORM vs Raw SQL</h3>
        <p><strong>This repo:</strong> Prisma (ORM)</p>
        <ul>
          <li>✅ Type-safe, easy to use, good DX</li>
          <li>⚠️ Less control over queries</li>
        </ul>
        <p><strong>When to use SQL:</strong> Complex joins, performance-critical queries, DB-specific features</p>

        <h3>REST vs GraphQL</h3>
        <p><strong>This repo:</strong> REST</p>
        <ul>
          <li>✅ Simple, well-understood, HTTP-native</li>
          <li>⚠️ Fixed endpoints, potential over/under-fetching</li>
        </ul>
        <p><strong>When GraphQL helps:</strong> Complex data requirements, mobile apps, many clients</p>

        <h3>Server Components vs Client SPA</h3>
        <p><strong>This repo:</strong> Mix of both (Next.js App Router)</p>
        <ul>
          <li>✅ Server Components for data fetching (faster initial load)</li>
          <li>✅ Client Components for interactivity</li>
        </ul>
        <p><strong>Pure SPA:</strong> More client-side logic, slower initial load but smoother transitions</p>
      </section>

      <section>
        <h2>What's Not Included (Yet)</h2>
        <p>Real production apps would also need:</p>
        <ul>
          <li>Authentication & authorization (JWT, sessions, OAuth)</li>
          <li>Rate limiting</li>
          <li>Caching (Redis)</li>
          <li>Message queue (BullMQ, RabbitMQ)</li>
          <li>File uploads (S3)</li>
          <li>Full-text search (Elasticsearch)</li>
          <li>Monitoring & alerting (Datadog, New Relic)</li>
          <li>CI/CD pipeline</li>
          <li>Database backups & disaster recovery</li>
        </ul>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>Explore these pages for deeper dives:</p>
        <ul>
          <li><a href="/concepts">Concepts</a> - Individual architectural patterns</li>
          <li><a href="/code-walkthrough">Code Walkthrough</a> - Guided tour of key files</li>
          <li><a href="/observability">Observability</a> - See logging and tracing in action</li>
        </ul>
      </section>
    </main>
  );
}
