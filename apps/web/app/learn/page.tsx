import TechCard from '@/components/TechCard';

export const metadata = {
  title: 'Learn the Stack - Test Stack',
};

export default function LearnPage() {
  return (
    <main>
      <div className="card">
        <h1>📚 Learn the Test Stack</h1>
        <p>
          This page explains each technology in our stack and how they work together.
          Think of this as your guide to understanding modern full-stack development.
        </p>
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

      <div className="card">
        <h2>🔗 How They Connect</h2>
        <p>Here's how data flows through the entire stack:</p>
        
        <div className="diagram">
          <pre>{`
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

      <div className="card">
        <h2>📦 Monorepo Structure</h2>
        <p>
          This project uses <strong>npm workspaces</strong> to manage multiple packages in one repository.
          This is similar to how large projects organize code into separate but related modules.
        </p>
        
        <div className="diagram">
          <pre>{`
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
        
        <p className="mt-3">
          Benefits: Each app has its own dependencies, but they're installed together.
          You can run both with one command: <code>npm run dev</code>
        </p>
      </div>
    </main>
  );
}
