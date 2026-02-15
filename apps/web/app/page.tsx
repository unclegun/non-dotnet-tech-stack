import ItemList from '@/components/ItemList';
import ItemForm from '@/components/ItemForm';

export default function Home() {
  return (
    <main>
      <div className="card">
        <h1>Test Stack Demo</h1>
        <p>
          Welcome to an educational full-stack application demonstrating modern web architecture
          with <strong>Next.js</strong>, <strong>Fastify</strong>, <strong>Postgres</strong>, and <strong>Prisma</strong>.
        </p>
        <p className="text-muted">
          This site not only works as a demo app but also teaches you about the architecture itself.
          Explore the sections below to learn how each layer works together.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>📝 Live Demo</h2>
          <p>Create and view items stored in PostgreSQL database:</p>
          
          <ItemForm />
          
          <div className="mt-4">
            <h3>Current Items</h3>
            <ItemList />
          </div>
        </div>

        <div className="card">
          <h2>🔄 Request Flow</h2>
          <p>When you create an item, here's what happens:</p>
          
          <div className="diagram">
            <pre>{`
 Browser (React)
    ↓ [Form Submit]
    │
 Next.js (App Router)
    ↓ [API Call]
    │
 Fastify API Server
    ↓ [Zod Validation]
    │
 Prisma ORM
    ↓ [SQL Query]
    │
 PostgreSQL Database
    ↓ [Response]
    ↑
 Back to Browser
            `}</pre>
          </div>

          <div className="mt-3">
            <h4>Key Concepts:</h4>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Client-side fetch:</strong> React components call API endpoints</li>
              <li><strong>Type-safe validation:</strong> Zod validates request data</li>
              <li><strong>ORM mapping:</strong> Prisma translates JS objects to SQL</li>
              <li><strong>Database persistence:</strong> Postgres stores the data</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🚀 Quick Links</h2>
        <div className="grid grid-3">
          <a href="/learn" className="tech-card">
            <h4>📚 Learn the Stack</h4>
            <p className="text-muted">Understand each technology and its role</p>
          </a>
          <a href="/architecture" className="tech-card">
            <h4>🏗️ Architecture</h4>
            <p className="text-muted">Deep dive into system design and patterns</p>
          </a>
          <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/health`} target="_blank" className="tech-card">
            <h4>🔍 API Health</h4>
            <p className="text-muted">Check the API server status</p>
          </a>
        </div>
      </div>
    </main>
  );
}
