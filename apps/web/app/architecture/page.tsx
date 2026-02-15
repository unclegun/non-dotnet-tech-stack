export const metadata = {
  title: 'Architecture - Test Stack',
};

export default function ArchitecturePage() {
  return (
    <main>
      <div className="card">
        <h1>🏗️ System Architecture</h1>
        <p>
          Deep dive into the architectural patterns, design decisions, and how components
          communicate in this full-stack application.
        </p>
      </div>

      <div className="card">
        <h2>Overall Architecture</h2>
        <div className="diagram">
          <pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  React Components (Client/Server)                         │  │
│  │  • ItemForm (client - interactive)                        │  │
│  │  • ItemList (server - data fetching)                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            ↕ HTTP/fetch                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Next.js App Router (Port 3000)                           │  │
│  │  • Server-side rendering                                  │  │
│  │  • Routing & layouts                                      │  │
│  │  • Static optimization                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             ↕ HTTP/JSON
┌─────────────────────────────────────────────────────────────────┐
│                    FASTIFY API (Port 3001)                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  HTTP Layer                                               │  │
│  │  • CORS middleware                                        │  │
│  │  • Error handling                                         │  │
│  │  • Logging (Pino)                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Route Handlers                                           │  │
│  │  • GET  /health → healthRoutes                            │  │
│  │  • GET  /items  → itemsRoutes                             │  │
│  │  • POST /items  → itemsRoutes                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Validation Layer (Zod)                                   │  │
│  │  • Schema definition                                      │  │
│  │  • Runtime validation                                     │  │
│  │  • Type inference                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             ↕ Prisma Client
┌─────────────────────────────────────────────────────────────────┐
│                    PRISMA ORM                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Client API                                               │  │
│  │  • findMany, findOne, create, update, delete              │  │
│  │  • Type-safe query builder                                │  │
│  │  • Connection pooling                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Query Engine                                             │  │
│  │  • SQL generation                                         │  │
│  │  • Result mapping                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             ↕ SQL/TCP
┌─────────────────────────────────────────────────────────────────┐
│                   POSTGRESQL DATABASE                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tables:                                                  │  │
│  │  • items (id, name, createdAt)                            │  │
│  │  • _prisma_migrations (schema versioning)                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
          `}</pre>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Request Lifecycle</h2>
          <p>Let's trace a POST /items request through the entire system:</p>
          
          <h4 className="mt-3">Step-by-Step:</h4>
          
          <div className="tech-card">
            <h4>1. Client Submission</h4>
            <pre>{`// User clicks submit
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch(
    'http://localhost:3001/items',
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ name })
    }
  );
};`}</pre>
          </div>

          <div className="tech-card">
            <h4>2. Network Transport</h4>
            <p className="text-muted">
              Browser serializes JSON and sends HTTP POST request to API server.
              Next.js is bypassed for direct API calls.
            </p>
          </div>

          <div className="tech-card">
            <h4>3. Fastify Routing</h4>
            <pre>{`// Fastify matches route
fastify.post('/items', async (req, reply) => {
  // Handler executes
});`}</pre>
          </div>

          <div className="tech-card">
            <h4>4. Validation</h4>
            <pre>{`// Zod validates input
const schema = z.object({
  name: z.string().min(1).max(200)
});

const data = schema.parse(req.body);
// Throws if invalid`}</pre>
          </div>

          <div className="tech-card">
            <h4>5. Database Operation</h4>
            <pre>{`// Prisma creates record
const item = await prisma.item.create({
  data: { name: data.name }
});

// Generated SQL:
// INSERT INTO items (id, name, createdAt)
// VALUES (uuid(), $1, now())`}</pre>
          </div>

          <div className="tech-card">
            <h4>6. Response</h4>
            <pre>{`// Send success response
return reply.code(201).send({
  data: item,
  message: 'Item created'
});`}</pre>
          </div>
        </div>

        <div className="card">
          <h2>Design Patterns</h2>
          
          <div className="tech-card">
            <h4>Separation of Concerns</h4>
            <p>Each layer has a single responsibility:</p>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li><strong>Routes:</strong> HTTP handling only</li>
              <li><strong>Validation:</strong> Data validation only</li>
              <li><strong>Prisma:</strong> Database access only</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>Dependency Injection</h4>
            <p>
              Fastify uses a plugin system similar to DI. The Prisma client is
              imported where needed, and could be registered as a plugin:
            </p>
            <pre>{`// lib/db.ts - Centralized instance
export const prisma = new PrismaClient();

// routes/items.ts - Imported dependency
import { prisma } from '../lib/db.js';`}</pre>
          </div>

          <div className="tech-card">
            <h4>Repository Pattern (via ORM)</h4>
            <p>
              Prisma acts as a repository layer, abstracting SQL:
            </p>
            <pre>{`// Instead of raw SQL
const items = await prisma.item.findMany();

// Prisma generates:
// SELECT * FROM items;`}</pre>
          </div>

          <div className="tech-card">
            <h4>Error Handling</h4>
            <p>Centralized error handling with custom error types:</p>
            <pre>{`// Custom error classes
class ValidationError extends AppError {
  constructor(message, errors) {
    super('VALIDATION_ERROR', message, 400);
  }
}

// Global error handler
fastify.setErrorHandler((error, req, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode)
      .send({ error: { ... } });
  }
  // ... handle other errors
});`}</pre>
          </div>

          <div className="tech-card">
            <h4>Type Safety</h4>
            <p>End-to-end type safety from DB to UI:</p>
            <pre>{`// 1. Prisma schema defines types
model Item { ... }

// 2. Generated TypeScript types
type Item = {
  id: string;
  name: string;
  createdAt: Date;
}

// 3. Shared types in web app
export interface Item { ... }

// 4. React components use types
const [items, setItems] = 
  useState<Item[]>([]);`}</pre>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Configuration & Environment</h2>
        <p>Environment-based configuration keeps secrets out of code:</p>
        
        <div className="grid grid-2">
          <div>
            <h4>API (.env)</h4>
            <pre>{`DATABASE_URL="postgresql://..."
API_PORT=3001
NODE_ENV=development`}</pre>
          </div>
          
          <div>
            <h4>Web (.env)</h4>
            <pre>{`NEXT_PUBLIC_API_URL="http://localhost:3001"`}</pre>
            <p className="text-muted mt-2">
              Note: <code>NEXT_PUBLIC_*</code> variables are exposed to the browser.
              Never put secrets here.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Deployment Considerations</h2>
        
        <div className="tech-card">
          <h4>Production Checklist</h4>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li>Use environment variables for all config</li>
            <li>Enable CORS only for trusted origins</li>
            <li>Use connection pooling for database</li>
            <li>Implement proper logging and monitoring</li>
            <li>Add rate limiting to API endpoints</li>
            <li>Use HTTPS in production</li>
            <li>Run database migrations before deploy</li>
            <li>Build optimized production bundles</li>
          </ul>
        </div>

        <div className="tech-card">
          <h4>Scaling Strategies</h4>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li><strong>Horizontal:</strong> Run multiple API instances behind a load balancer</li>
            <li><strong>Database:</strong> Use read replicas for read-heavy workloads</li>
            <li><strong>Caching:</strong> Add Redis for frequently accessed data</li>
            <li><strong>CDN:</strong> Serve Next.js static assets from CDN</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h2>Development Workflow</h2>
        
        <div className="diagram">
          <pre>{`
Development Process:

1. Make changes to code
   └→ TypeScript checks types
   
2. Save files
   └→ tsx/Next.js auto-reload
   
3. Test in browser
   └→ See changes immediately
   
4. Database changes?
   └→ Update schema.prisma
   └→ Run: npm run db:migrate
   └→ Prisma generates new types
   
5. Ready to commit
   └→ All types are validated
   └→ No runtime surprises
          `}</pre>
        </div>
      </div>

      <div className="card">
        <h2>Key Takeaways</h2>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
          <li>✅ <strong>Type safety everywhere:</strong> TypeScript + Zod + Prisma = fewer bugs</li>
          <li>✅ <strong>Clear boundaries:</strong> Each layer has one job and does it well</li>
          <li>✅ <strong>Modern patterns:</strong> Validation, error handling, async/await</li>
          <li>✅ <strong>Developer experience:</strong> Hot reload, auto-generated types, clear errors</li>
          <li>✅ <strong>Production ready:</strong> Logging, error handling, graceful shutdown</li>
        </ul>
      </div>
    </main>
  );
}
