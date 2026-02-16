import Link from 'next/link';

export default function ConceptsPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-5 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>
          <h1 className="display-4 fw-bold text-white mb-3">📚 Learning Concepts</h1>
          <p className="lead text-white mb-0">
            This section covers key architectural patterns and practices used in modern web applications.
            Each concept is backed by real code examples in this repository.
          </p>
        </div>
      </div>

      <section>
        <h2 className="h3 mb-4 fw-semibold">Core Concepts</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <Link href="/concepts/request-lifecycle" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary rounded-circle me-3 p-3 fs-5">🔄</span>
                    <h3 className="card-title h5 mb-0 fw-bold text-dark">Request Lifecycle & Middleware Pipeline</h3>
                  </div>
                  <p className="card-text text-muted mb-0">
                    How requests flow through the system from HTTP to business logic
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link href="/concepts/validation-contracts" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-success rounded-circle me-3 p-3 fs-5">✓</span>
                    <h3 className="card-title h5 mb-0 fw-bold text-dark">Validation Strategy & Contract-First Thinking</h3>
                  </div>
                  <p className="card-text text-muted mb-0">
                    Using Zod for type-safe validation and shared contracts
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link href="/concepts/error-handling" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-danger rounded-circle me-3 p-3 fs-5">⚠️</span>
                    <h3 className="card-title h5 mb-0 fw-bold text-dark">Error Handling Patterns</h3>
                  </div>
                  <p className="card-text text-muted mb-0">
                    Problem Details format and centralized error handling
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link href="/concepts/data-access" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-info rounded-circle me-3 p-3 fs-5">🗄️</span>
                    <h3 className="card-title h5 mb-0 fw-bold text-dark">Data Access Patterns</h3>
                  </div>
                  <p className="card-text text-muted mb-0">
                    Service and repository layers, when to use ORM vs raw SQL
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link href="/concepts/observability" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-warning text-dark rounded-circle me-3 p-3 fs-5">📊</span>
                    <h3 className="card-title h5 mb-0 fw-bold text-dark">Observability Basics</h3>
                  </div>
                  <p className="card-text text-muted mb-0">
                    Structured logging, request IDs, and performance timing
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link href="/concepts/testing" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-secondary rounded-circle me-3 p-3 fs-5">🧪</span>
                    <h3 className="card-title h5 mb-0 fw-bold text-dark">Testing Strategy</h3>
                  </div>
                  <p className="card-text text-muted mb-0">
                    Unit tests vs integration tests, what to test and when
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
