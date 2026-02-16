export default function ObservabilityConceptPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-4 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
          <h1 className="display-5 fw-bold text-white mb-0">👁️ Observability Basics</h1>
        </div>
      </div>
      
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">What is Observability?</h2>
            <p className="text-muted">
              Observability is the ability to understand what's happening inside your system
              by looking at its outputs (logs, metrics, traces). It's essential for debugging
              production issues and understanding system behavior.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">The Three Pillars</h2>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded h-100">
                  <div className="fw-bold mb-2">📝 Logs</div>
                  <p className="mb-0 text-muted small">Timestamped records of events</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded h-100">
                  <div className="fw-bold mb-2">📊 Metrics</div>
                  <p className="mb-0 text-muted small">Numerical measurements over time (CPU, request rate, errors)</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded h-100">
                  <div className="fw-bold mb-2">🔍 Traces</div>
                  <p className="mb-0 text-muted small">Follow a single request across services</p>
                </div>
              </div>
            </div>
            <div className="alert alert-info mt-4" role="alert">
              <strong>💡 Focus:</strong> This app focuses on <strong>logs</strong> and basic <strong>tracing</strong>.
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Request Tracing with traceId</h2>
            <p className="text-muted mb-3">
              Every request gets a unique <code>traceId</code> that appears in:
            </p>
            <ul className="list-unstyled mb-3">
              <li className="mb-2">✅ Every log entry for that request</li>
              <li className="mb-2">✅ Error responses</li>
              <li className="mb-2">✅ Response headers (optionally)</li>
            </ul>
            <p className="text-muted mb-3">
              This lets you correlate all logs for a single request, even across services.
            </p>
            <div className="alert alert-secondary" role="alert">
              <pre className="mb-0">{`
[12:34:56] INFO: Request completed
  traceId: "550e8400-e29b-41d4-a716-446655440000"
  method: "POST"
  url: "/items"
  statusCode: 201
  duration: "45ms"
        `}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Code Example: Timing Plugin</h2>
            <p className="mb-3">Location: <code>apps/api/src/plugins/timing.ts</code></p>
            <pre>{`
fastify.addHook('onRequest', async (request) => {
  request.startTime = Date.now();
});

fastify.addHook('onResponse', async (request, reply) => {
  const duration = Date.now() - request.startTime;
  
  fastify.log.info({
    traceId: request.traceId,
    method: request.method,
    url: request.url,
    statusCode: reply.statusCode,
    duration: \`\${duration}ms\`,
  }, 'Request completed');
});
        `}</pre>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Structured Logging</h2>
            <p className="text-muted mb-3">
              Instead of string interpolation, use structured logs (JSON):
            </p>
            <pre>{`
// ❌ Bad: Hard to parse
console.log(\`User \${userId} created item \${itemId}\`);

// ✅ Good: Machine-readable
logger.info({ userId, itemId, traceId }, 'Item created');
        `}</pre>
            <div className="alert alert-success mt-3" role="alert">
              <strong>🎯 Benefit:</strong> Structured logs can be easily ingested by log aggregators (ELK, Splunk, Datadog).
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Try It</h2>
            <p className="text-muted mb-3">
              Start the API and make a request. Watch the logs in your terminal.
              You'll see structured JSON logs with traceId and duration.
            </p>
            <pre>{`curl -X POST http://localhost:3001/items -H "Content-Type: application/json" -d '{"name": "Test"}'`}</pre>
            <p className="text-muted mt-3 mb-2">
              Then trigger an error and notice the traceId in the response:
            </p>
            <pre>{`curl -X POST http://localhost:3001/items -H "Content-Type: application/json" -d '{"name": ""}'`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Next Steps for Production</h2>
            <ul className="list-unstyled">
              <li className="mb-2">☁️ Send logs to a centralized system (CloudWatch, Datadog, Grafana Loki)</li>
              <li className="mb-2">📈 Add metrics (Prometheus, StatsD)</li>
              <li className="mb-2">🔗 Implement distributed tracing (OpenTelemetry, Jaeger)</li>
              <li className="mb-2">🚨 Set up alerting on error rates and latency</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
