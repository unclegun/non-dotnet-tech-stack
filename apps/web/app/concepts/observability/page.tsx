export default function ObservabilityConceptPage() {
  return (
    <main>
      <h1>Observability Basics</h1>
      
      <section>
        <h2>What is Observability?</h2>
        <p>
          Observability is the ability to understand what's happening inside your system
          by looking at its outputs (logs, metrics, traces). It's essential for debugging
          production issues and understanding system behavior.
        </p>
      </section>

      <section>
        <h2>The Three Pillars</h2>
        <ul>
          <li><strong>Logs:</strong> Timestamped records of events</li>
          <li><strong>Metrics:</strong> Numerical measurements over time (CPU, request rate, errors)</li>
          <li><strong>Traces:</strong> Follow a single request across services</li>
        </ul>
        <p>This app focuses on <strong>logs</strong> and basic <strong>tracing</strong>.</p>
      </section>

      <section>
        <h2>Request Tracing with traceId</h2>
        <p>
          Every request gets a unique <code>traceId</code> that appears in:
        </p>
        <ul>
          <li>Every log entry for that request</li>
          <li>Error responses</li>
          <li>Response headers (optionally)</li>
        </ul>
        <p>
          This lets you correlate all logs for a single request, even across services.
        </p>
        <pre>{`
[12:34:56] INFO: Request completed
  traceId: "550e8400-e29b-41d4-a716-446655440000"
  method: "POST"
  url: "/items"
  statusCode: 201
  duration: "45ms"
        `}</pre>
      </section>

      <section>
        <h2>Code Example: Timing Plugin</h2>
        <p>Location: <code>apps/api/src/plugins/timing.ts</code></p>
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
      </section>

      <section>
        <h2>Structured Logging</h2>
        <p>
          Instead of string interpolation, use structured logs (JSON):
        </p>
        <pre>{`
// ❌ Bad: Hard to parse
console.log(\`User \${userId} created item \${itemId}\`);

// ✅ Good: Machine-readable
logger.info({ userId, itemId, traceId }, 'Item created');
        `}</pre>
        <p>
          Structured logs can be easily ingested by log aggregators (ELK, Splunk, Datadog).
        </p>
      </section>

      <section>
        <h2>Try It</h2>
        <p>
          Start the API and make a request. Watch the logs in your terminal.
          You'll see structured JSON logs with traceId and duration.
        </p>
        <pre>{`curl -X POST http://localhost:3001/items -H "Content-Type: application/json" -d '{"name": "Test"}'`}</pre>
        <p>
          Then trigger an error and notice the traceId in the response:
        </p>
        <pre>{`curl -X POST http://localhost:3001/items -H "Content-Type: application/json" -d '{"name": ""}'`}</pre>
      </section>

      <section>
        <h2>Next Steps for Production</h2>
        <ul>
          <li>Send logs to a centralized system (CloudWatch, Datadog, Grafana Loki)</li>
          <li>Add metrics (Prometheus, StatsD)</li>
          <li>Implement distributed tracing (OpenTelemetry, Jaeger)</li>
          <li>Set up alerting on error rates and latency</li>
        </ul>
      </section>
    </main>
  );
}
