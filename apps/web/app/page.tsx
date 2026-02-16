import ItemList from '@/components/ItemList';
import ItemForm from '@/components/ItemForm';

export default function Home() {
  return (
    <main className="container py-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg mb-5 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <h1 className="display-4 fw-bold text-white mb-4">
            🚀 Test Stack Demo
          </h1>
          <p className="lead text-white mb-3">
            Welcome to an educational full-stack application demonstrating modern web architecture
            with <strong>Next.js</strong>, <strong>Fastify</strong>, <strong>Postgres</strong>, and <strong>Prisma</strong>.
          </p>
          <p className="text-white-50">
            This site not only works as a demo app but also teaches you about the architecture itself.
            Explore the sections below to learn how each layer works together.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {/* Live Demo Section */}
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title h3 mb-3">
                <span className="badge bg-primary rounded-pill me-2">📝</span>
                Live Demo
              </h2>
              <p className="text-muted mb-4">Create and view items stored in PostgreSQL database:</p>
              
              <ItemForm />
              
              <div className="mt-4">
                <h3 className="h5 mb-3 fw-semibold">Current Items</h3>
                <ItemList />
              </div>
            </div>
          </div>
        </div>

        {/* Request Flow Section */}
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title h3 mb-3">
                <span className="badge bg-success rounded-pill me-2">🔄</span>
                Request Flow
              </h2>
              <p className="text-muted mb-4">When you create an item, here's what happens:</p>
              
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

              <div className="mt-4">
                <h4 className="h6 fw-semibold mb-3">Key Concepts:</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span className="badge bg-info text-dark me-2">✓</span>
                    <strong>Client-side fetch:</strong> React components call API endpoints
                  </li>
                  <li className="mb-2">
                    <span className="badge bg-info text-dark me-2">✓</span>
                    <strong>Type-safe validation:</strong> Zod validates request data
                  </li>
                  <li className="mb-2">
                    <span className="badge bg-info text-dark me-2">✓</span>
                    <strong>ORM mapping:</strong> Prisma translates JS objects to SQL
                  </li>
                  <li className="mb-2">
                    <span className="badge bg-info text-dark me-2">✓</span>
                    <strong>Database persistence:</strong> Postgres stores the data
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New to Web Development */}
      <div className="alert alert-info border-2 border-info shadow-sm mb-5" role="alert">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="h5 fw-bold mb-2">
              <i className="bi bi-lightbulb-fill me-2"></i>
              New to Web Development?
            </h3>
            <p className="mb-0">
              Start with our comprehensive <strong>Getting Started Guide</strong> that explains 
              everything from scratch—no prior knowledge needed!
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <a href="/getting-started" className="btn btn-info btn-lg">
              <i className="bi bi-rocket-takeoff me-2"></i>
              Begin Here
            </a>
          </div>
        </div>
      </div>

      {/* Learning Path Section */}
      <div className="card border-0 shadow-sm mb-5">
        <div className="card-header bg-white border-0 pt-4 px-4">
          <h2 className="h3 mb-0">
            <span className="badge bg-warning text-dark rounded-pill me-2">🎓</span>
            Your Learning Journey
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Whether you're learning your first tech stack or comparing it to others you know, 
            we have resources for every level:
          </p>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <a href="/getting-started" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#198754'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">🚀</div>
                    <h4 className="card-title h6 fw-bold text-dark">Getting Started</h4>
                    <p className="card-text text-muted small mb-0">Complete beginner's guide with zero assumptions</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-md-6 col-lg-3">
              <a href="/learn" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#0dcaf0'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">📖</div>
                    <h4 className="card-title h6 fw-bold text-dark">Learn the Stack</h4>
                    <p className="card-text text-muted small mb-0">Deep dive into each technology used here</p>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <a href="/tech-stacks" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#dc3545'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">🌐</div>
                    <h4 className="card-title h6 fw-bold text-dark">Compare Stacks</h4>
                    <p className="card-text text-muted small mb-0">See how .NET, Spring, Rails solve same problems</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-md-6 col-lg-3">
              <a href="/concepts" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#6f42c1'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">📚</div>
                    <h4 className="card-title h6 fw-bold text-dark">Core Concepts</h4>
                    <p className="card-text text-muted small mb-0">Master patterns that work across all frameworks</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-md-6 col-lg-3">
              <a href="/architecture" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#0d6efd'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">🏗️</div>
                    <h4 className="card-title h6 fw-bold text-dark">Architecture</h4>
                    <p className="card-text text-muted small mb-0">System design and architectural patterns</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-md-6 col-lg-3">
              <a href="/code-walkthrough" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#fd7e14'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">🔍</div>
                    <h4 className="card-title h6 fw-bold text-dark">Code Tour</h4>
                    <p className="card-text text-muted small mb-0">Guided walkthrough of key files and patterns</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-md-6 col-lg-3">
              <a href="/observability" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#20c997'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">📊</div>
                    <h4 className="card-title h6 fw-bold text-dark">Observability</h4>
                    <p className="card-text text-muted small mb-0">Logging, tracing, and monitoring in action</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-md-6 col-lg-3">
              <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/health`} target="_blank" className="text-decoration-none">
                <div className="card h-100 border-2 hover-lift" style={{borderColor: '#198754'}}>
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">✅</div>
                    <h4 className="card-title h6 fw-bold text-dark">API Health</h4>
                    <p className="card-text text-muted small mb-0">Check the API server status</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Site Exists */}
      <div className="card border-0 shadow-lg mb-5" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="card-body p-5 text-white">
          <h2 className="h3 fw-bold mb-4">Why This Site Exists</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-3 rounded" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                <h5 className="fw-bold mb-2">🎯 Learn by Doing</h5>
                <p className="mb-0 small">
                  This isn't just documentation—it's a working application you can interact with, 
                  inspect, and learn from.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                <h5 className="fw-bold mb-2">🌉 Bridge Stacks</h5>
                <p className="mb-0 small">
                  Coming from .NET, Java, or Rails? We show you how concepts translate, 
                  making it easier to switch or compare stacks.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                <h5 className="fw-bold mb-2">📚 Reference Guide</h5>
                <p className="mb-0 small">
                  Use this as a study guide when learning any tech stack. 
                  The patterns are universal—only the syntax changes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

