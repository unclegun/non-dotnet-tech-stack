export default function ErrorHandlingPage() {
  return (
    <main>
      <h1>Error Handling Patterns</h1>
      
      <section>
        <h2>The Challenge</h2>
        <p>
          Without consistent error handling, your API returns errors in different formats:
          sometimes strings, sometimes objects, sometimes HTML. This makes it hard for
          clients to handle errors gracefully.
        </p>
      </section>

      <section>
        <h2>Problem Details Format (RFC 7807)</h2>
        <p>
          A standardized format for HTTP error responses. Inspired by ASP.NET Core's ProblemDetails.
        </p>
        <pre>{`
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
      </section>

      <section>
        <h2>Code Example: Error Handler Plugin</h2>
        <p>Location: <code>apps/api/src/plugins/errorHandler.ts</code></p>
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
      </section>

      <section>
        <h2>Error Types Handled</h2>
        <ul>
          <li><strong>ZodError:</strong> Validation failures → 400 with field-level errors</li>
          <li><strong>AppError:</strong> Business logic errors → Custom status code</li>
          <li><strong>Unknown:</strong> Unexpected errors → 500 (hide details in production)</li>
        </ul>
      </section>

      <section>
        <h2>Benefits</h2>
        <ul>
          <li><strong>Consistent:</strong> All errors have the same shape</li>
          <li><strong>Traceable:</strong> Include traceId to correlate with logs</li>
          <li><strong>Machine-Readable:</strong> Clients can parse and display errors</li>
          <li><strong>Human-Friendly:</strong> Clear title and detail messages</li>
        </ul>
      </section>

      <section>
        <h2>Try It</h2>
        <pre>{`
# Trigger a validation error
curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": ""}'

# Response includes traceId and detailed errors
        `}</pre>
      </section>
    </main>
  );
}
