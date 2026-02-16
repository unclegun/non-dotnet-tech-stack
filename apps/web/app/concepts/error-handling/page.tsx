export default function ErrorHandlingPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-4 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <h1 className="display-5 fw-bold text-white mb-0">⚠️ Error Handling Patterns</h1>
        </div>
      </div>
      
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">The Challenge</h2>
            <p className="text-muted">
              Without consistent error handling, your API returns errors in different formats:
              sometimes strings, sometimes objects, sometimes HTML. This makes it hard for
              clients to handle errors gracefully.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Problem Details Format (RFC 7807)</h2>
            <p className="mb-3">
              A standardized format for HTTP error responses. Inspired by ASP.NET Core's ProblemDetails.
            </p>
            <div className="alert alert-secondary" role="alert">
              <pre className="mb-0">{`
{
  "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
  "title": "Validation Failed",
  "status": 400,
  "detail": "One or more validation errors occurred.",
  "instance": "/items",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "errors": [...]  // Additional context
}
              `}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Code Example: Error Handler Plugin</h2>
            <p className="mb-3">Location: <code>apps/api/src/plugins/errorHandler.ts</code></p>
            <pre>{`
fastify.setErrorHandler((error, request, reply) => {
  const traceId = request.traceId;

  if (error instanceof ZodError) {
    const problemDetails: ProblemDetails = {
      type: 'https://...',
      title: 'Validation Failed',
      status: 400,
      detail: 'One or more validation errors occurred.',
      instance: request.url,
      traceId,
    };
    return reply.status(400).send({
      ...problemDetails,
      errors: error.errors,
    });
  }

  // Handle other error types...
});
            `}</pre>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Error Types Handled</h2>
            <div className="list-group">
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 text-danger">ZodError</h5>
                  <span className="badge bg-warning text-dark">400</span>
                </div>
                <p className="mb-0 text-muted small">Validation failures → 400 with field-level errors</p>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 text-danger">AppError</h5>
                  <span className="badge bg-secondary">Custom</span>
                </div>
                <p className="mb-0 text-muted small">Business logic errors → Custom status code</p>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 text-danger">Unknown</h5>
                  <span className="badge bg-danger">500</span>
                </div>
                <p className="mb-0 text-muted small">Unexpected errors → 500 (hide details in production)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm" style={{borderLeft: '4px solid #198754'}}>
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">✅ Benefits</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">✓</span>
                  <div>
                    <strong>Consistent</strong>
                    <p className="mb-0 text-muted small">All errors have the same shape</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">✓</span>
                  <div>
                    <strong>Traceable</strong>
                    <p className="mb-0 text-muted small">Include traceId to correlate with logs</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">✓</span>
                  <div>
                    <strong>Machine-Readable</strong>
                    <p className="mb-0 text-muted small">Clients can parse and display errors</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">✓</span>
                  <div>
                    <strong>Human-Friendly</strong>
                    <p className="mb-0 text-muted small">Clear title and detail messages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="card border-0 shadow-sm bg-dark text-white">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">🧪 Try It</h2>
            <pre>{`
# Trigger a validation error
curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": ""}'

# Response includes traceId and detailed errors
            `}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}
