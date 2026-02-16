export default function RequestLifecyclePage() {
  return (
    <main>
      <h1>Request Lifecycle & Middleware Pipeline</h1>
      
      <section>
        <h2>Overview</h2>
        <p>
          Understanding how a request flows through your application is fundamental to debugging,
          performance optimization, and adding cross-cutting concerns like logging and authentication.
        </p>
      </section>

      <section>
        <h2>Request Flow in This Stack</h2>
        <pre>{`
  1. Client (Browser/Fetch)
     ↓
  2. Fastify HTTP Server
     ↓
  3. CORS Plugin (validate origin)
     ↓
  4. Request Context Plugin (add traceId)
     ↓
  5. Timing Plugin (start timer)
     ↓
  6. Route Handler (parse & validate)
     ↓
  7. Service Layer (business logic)
     ↓
  8. Repository Layer (database access)
     ↓
  9. Response (with timing logged)
     ↓
 10. Error Handler (if exception thrown)
        `}</pre>
      </section>

      <section>
        <h2>Code Example: Request Context Plugin</h2>
        <p>Location: <code>apps/api/src/plugins/requestContext.ts</code></p>
        <pre>{`
fastify.addHook('onRequest', async (request) => {
  // Generate unique ID for this request
  request.traceId = randomUUID();
});
        `}</pre>
        <p>
          This plugin runs <strong>before every route handler</strong>, adding a unique
          <code>traceId</code> that follows the request through logs and errors.
        </p>
      </section>

      <section>
        <h2>Why This Matters</h2>
        <ul>
          <li><strong>Debugging:</strong> Trace a single request across multiple log entries</li>
          <li><strong>Performance:</strong> Measure duration at different stages</li>
          <li><strong>Security:</strong> Add authentication checks early in the pipeline</li>
          <li><strong>Cross-cutting concerns:</strong> Logging, caching, rate limiting</li>
        </ul>
      </section>

      <section>
        <h2>Try It</h2>
        <pre>{`curl -v http://localhost:3001/items`}</pre>
        <p>Check the server logs to see the traceId and timing information.</p>
      </section>
    </main>
  );
}
