import TechCard from '@/components/TechCard';

export const metadata = {
  title: 'Learn the Stack - Test Stack',
};

export default function LearnPage() {
  return (
    <main className="container py-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg mb-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="card-body text-white p-5">
          <h1 className="display-4 fw-bold mb-3">📚 Learn the Test Stack</h1>
          <p className="lead mb-0">
            Explore each technology in our stack and discover how they work together.
            Your comprehensive guide to understanding modern full-stack development with TypeScript, React, and Node.js.
          </p>
        </div>
      </div>

      <TechCard
        title="Frontend: Next.js + React + TypeScript"
        icon="⚛️"
        description="The user interface layer"
      >
        <p>
          <strong>Next.js</strong> is a React framework that provides routing, server-side rendering,
          and optimized builds. We're using the new <strong>App Router</strong> which uses React Server Components by default.
        </p>
        
        <h4 className="mt-3">Key Features:</h4>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li><strong>File-based routing:</strong> Files in <code>app/</code> become routes</li>
          <li><strong>Server Components:</strong> React components that render on the server</li>
          <li><strong>Client Components:</strong> Interactive components (use "use client")</li>
          <li><strong>TypeScript:</strong> Type safety across your entire frontend</li>
        </ul>

        <div className="mt-3">
          <h4>Example Component:</h4>
          <pre>{`// Client component for interactivity
'use client';

export default function ItemForm() {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await apiClient.post('/items', { name });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`}</pre>
        </div>
      </TechCard>

      <TechCard
        title="Backend: Fastify + TypeScript"
        icon="⚡"
        description="The API server layer"
      >
        <p>
          <strong>Fastify</strong> is a fast, low-overhead web framework for Node.js.
          It's similar to Express but with better performance and built-in TypeScript support.
        </p>
        
        <h4 className="mt-3">Key Features:</h4>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li><strong>Route handlers:</strong> Define endpoints like GET /items</li>
          <li><strong>Plugin system:</strong> Modular architecture (like middleware)</li>
          <li><strong>Schema validation:</strong> Integrated with validation libraries</li>
          <li><strong>Logging:</strong> Built-in structured logging with Pino</li>
        </ul>

        <div className="mt-3">
          <h4>Example Route:</h4>
          <pre>{`// routes/items.ts
export default async function itemsRoutes(fastify) {
  fastify.get('/items', async (request, reply) => {
    const items = await prisma.item.findMany();
    return { data: items };
  });
  
  fastify.post('/items', async (request, reply) => {
    const data = validate(schema, request.body);
    const item = await prisma.item.create({ data });
    return { data: item };
  });
}`}</pre>
        </div>

        <div className="mt-3">
          <p className="text-muted">
            <strong>Compared to other frameworks:</strong> Fastify is like a lightweight controller
            layer. Routes are similar to controller actions, and plugins act like middleware.
          </p>
        </div>
      </TechCard>

      <TechCard
        title="Database: PostgreSQL + Prisma ORM"
        icon="🗄️"
        description="The data persistence layer"
      >
        <p>
          <strong>PostgreSQL</strong> is a powerful relational database, and <strong>Prisma</strong>
          is a modern ORM (Object-Relational Mapper) that provides type-safe database access.
        </p>
        
        <h4 className="mt-3">Prisma Features:</h4>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li><strong>Schema-first:</strong> Define models in schema.prisma</li>
          <li><strong>Type generation:</strong> Auto-generates TypeScript types</li>
          <li><strong>Migrations:</strong> Version control for your database schema</li>
          <li><strong>Query builder:</strong> Fluent, type-safe API for queries</li>
        </ul>

        <div className="mt-3">
          <h4>Schema Definition:</h4>
          <pre>{`// prisma/schema.prisma
model Item {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  
  @@map("items")
}`}</pre>
        </div>

        <div className="mt-3">
          <h4>Using Prisma Client:</h4>
          <pre>{`// TypeScript usage
const items = await prisma.item.findMany({
  where: { name: { contains: 'test' } },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

const newItem = await prisma.item.create({
  data: { name: 'My Item' }
});`}</pre>
        </div>

        <div className="mt-3">
          <p className="text-muted">
            <strong>ORM Benefits:</strong> Prisma is similar to Entity Framework or other ORMs.
            It maps your JavaScript/TypeScript objects to database tables and provides type safety.
          </p>
        </div>
      </TechCard>

      <TechCard
        title="Validation: Zod"
        icon="✅"
        description="Runtime type validation"
      >
        <p>
          <strong>Zod</strong> is a TypeScript-first schema validation library.
          It validates data at runtime and infers TypeScript types from your schemas.
        </p>
        
        <h4 className="mt-3">Why Validation Matters:</h4>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Never trust client input - always validate on the server</li>
          <li>Provides clear error messages for invalid data</li>
          <li>Type safety from validation schema to database</li>
          <li>Works seamlessly with TypeScript</li>
        </ul>

        <div className="mt-3">
          <h4>Example Schema:</h4>
          <pre>{`import { z } from 'zod';

const CreateItemSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(200, 'Name too long'),
});

// Infer TypeScript type from schema
type CreateItemInput = z.infer<typeof CreateItemSchema>;

// Validate and parse
const data = CreateItemSchema.parse(request.body);`}</pre>
        </div>
      </TechCard>

      {/* How They Connect */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🔗 How They Connect</h2>
            <p className="text-muted mb-0">Data flow through the entire stack</p>
          </div>
          <div className="card-body">
            <div className="bg-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`
1. User fills form in browser
   └→ React state updates

2. Form submission triggers API call
   └→ fetch() sends JSON to API

3. Fastify receives request
   └→ Route handler executes

4. Zod validates request body
   └→ Throws error if invalid

5. Prisma constructs SQL query
   └→ Translates JS to SQL

6. PostgreSQL executes query
   └→ Returns database rows

7. Prisma maps rows to objects
   └→ Type-safe JavaScript objects

8. Fastify sends JSON response
   └→ HTTP 200/201 with data

9. Next.js receives response
   └→ Updates UI state

10. React re-renders with new data
    └→ User sees updated list
              `}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Monorepo Structure */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">📦 Monorepo Structure</h2>
            <p className="text-muted mb-0">Organized with npm workspaces</p>
          </div>
          <div className="card-body">
            <div className="alert alert-info mb-3">
              This project uses <strong>npm workspaces</strong> to manage multiple packages in one repository.
              This is similar to how large projects organize code into separate but related modules.
            </div>
            <div className="bg-light rounded p-3 mb-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`
/
├── package.json          # Root workspace config
├── apps/
│   ├── api/             # Fastify backend
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── routes/
│   │   │   └── lib/
│   │   └── prisma/
│   │       └── schema.prisma
│   └── web/             # Next.js frontend
│       ├── app/         # App router pages
│       ├── components/
│       └── lib/
              `}</pre>
            </div>
            <div className="d-flex align-items-start">
              <span className="badge bg-success me-3 mt-1">✓</span>
              <p className="mb-0">
                <strong>Benefits:</strong> Each app has its own dependencies, but they're installed together.
                You can run both with one command: <code className="text-primary">npm run dev</code>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
