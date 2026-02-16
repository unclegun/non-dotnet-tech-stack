export default function RequestLifecyclePage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-4 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <h1 className="display-5 fw-bold text-white mb-3">🔄 Request Lifecycle & Middleware Pipeline</h1>
          <p className="lead text-white mb-0 opacity-75">
            Understanding the journey of a request through your web application
          </p>
        </div>
      </div>

      {/* Prerequisites */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm border-start border-4 border-info">
          <div className="card-body p-4">
            <h2 className="h4 fw-semibold mb-3">
              <i className="bi bi-info-circle-fill text-info me-2"></i>
              What You Should Know First
            </h2>
            <p className="mb-3">
              This page assumes you understand:
            </p>
            <ul className="mb-0">
              <li><strong>HTTP basics:</strong> Requests have URLs, methods (GET, POST), headers, and bodies</li>
              <li><strong>Client-server model:</strong> Browser sends request → Server processes → Response sent back</li>
              <li><strong>Functions:</strong> Code that runs when called, can pass data to next function</li>
            </ul>
            <div className="alert alert-light border mt-3 mb-0">
              <small><strong>New to these concepts?</strong> Start with our <a href="/getting-started">Getting Started Guide</a> first!</small>
            </div>
          </div>
        </div>
      </section>

      {/* What is Middleware/Plugins */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">What is Middleware? (Or "Plugins" in Fastify)</h2>
            <p className="lead text-muted mb-4">
              Think of middleware like a series of checkpoints a request must pass through before reaching its destination.
            </p>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card h-100 bg-light border-0">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">🏢 Real-World Analogy</h5>
                    <p className="mb-2">Imagine entering a secure office building:</p>
                    <ol className="mb-0 small">
                      <li><strong>Front Door:</strong> Check if building is open</li>
                      <li><strong>Security Desk:</strong> Show ID badge (authentication)</li>
                      <li><strong>Metal Detector:</strong> Security scan (validation)</li>
                      <li><strong>Visitor Log:</strong> Sign in (logging/tracing)</li>
                      <li><strong>Elevator:</strong> Go to your floor (routing)</li>
                      <li><strong>Office:</strong> Meet the person you came to see (handler)</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 bg-light border-0">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">💻 Web Request Flow</h5>
                    <p className="mb-2">Similarly, an HTTP request goes through:</p>
                    <ol className="mb-0 small">
                      <li><strong>Server:</strong> Accept the connection</li>
                      <li><strong>CORS Plugin:</strong> Check allowed origins</li>
                      <li><strong>Auth Plugin:</strong> Verify user credentials</li>
                      <li><strong>Logger Plugin:</strong> Add traceId for tracking</li>
                      <li><strong>Router:</strong> Match URL to handler</li>
                      <li><strong>Handler:</strong> Execute business logic</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success" role="alert">
              <strong>💡 Key Insight:</strong> Each middleware/plugin is a function that runs in sequence. It can:
              <ul className="mb-0 mt-2">
                <li>Inspect or modify the request</li>
                <li>Add data (like <code>traceId</code>)</li>
                <li>Stop the request (return error)</li>
                <li>Pass control to the next middleware</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Why Understanding the Request Lifecycle Matters</h2>
            <p className="mb-4">
              Whether you're building in Node.js, .NET, Java, or any web framework, understanding the request
              lifecycle is fundamental to:
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">🐛 Debugging Issues</div>
                  <p className="mb-0 text-muted small">Trace where a request fails in the pipeline</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">⚡ Performance Optimization</div>
                  <p className="mb-0 text-muted small">Measure how long each stage takes</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">🔒 Security</div>
                  <p className="mb-0 text-muted small">Add authentication checks early, before hitting database</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">🔧 Cross-cutting Concerns</div>
                  <p className="mb-0 text-muted small">Logging, caching, rate limiting—once, for all routes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Request Flow in This Stack (Node.js + Fastify)</h2>
            <p className="mb-4">
              Here's the exact journey a request takes when you call <code>POST /items</code>:
            </p>
            <div className="card bg-dark text-white mb-4">
              <div className="card-body">
                <pre className="text-white mb-0">{`
  ┌─────────────────────────────────────────────────────────────┐
  │  1. Client (Browser/Fetch)                                  │
  │     Example: fetch('http://localhost:3001/items', {...})   │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  2. Fastify HTTP Server                                     │
  │     ✓ Accept TCP connection                                 │
  │     ✓ Parse HTTP headers and body                           │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  3. CORS Plugin (apps/api/src/server.ts)                    │
  │     ✓ Check if origin is allowed                            │
  │     ✓ Add CORS headers to response                          │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  4. Request Context Plugin (plugins/requestContext.ts)      │
  │     ✓ Generate unique traceId: "a7c3..."                    │
  │     ✓ Attach to request object                              │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  5. Timing Plugin (plugins/timing.ts)                       │
  │     ✓ Record start time                                     │
  │     ✓ Set up response hook to log duration                  │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  6. Route Handler (routes/items.ts)                         │
  │     ✓ Parse request body                                    │
  │     ✓ Validate with Zod schema                              │
  │     ✓ Call ItemService.create()                             │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  7. Service Layer (modules/items/service.ts)                │
  │     ✓ Execute business logic                                │
  │     ✓ Call ItemRepository.create()                          │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  8. Repository Layer (modules/items/repo.ts)                │
  │     ✓ Use Prisma client                                     │
  │     ✓ Execute SQL: INSERT INTO items...                     │
  │     ✓ Return created item                                   │
  └─────────────────────────────────────────────────────────────┘
                           ↓
  ┌─────────────────────────────────────────────────────────────┐
  │  9. Response (Back Through Plugins)                         │
  │     ✓ Timing plugin logs: "Duration: 45ms"                  │
  │     ✓ Fastify serializes JSON response                      │
  │     ✓ Send HTTP 201 Created                                 │
  └─────────────────────────────────────────────────────────────┘
                           ↓
                     Client Receives:
                     { id: 1, name: "Test" }

  ┌─────────────────────────────────────────────────────────────┐
  │  If Error Occurs at Any Step:                               │
  │     → Error Handler Plugin (plugins/errorHandler.ts)        │
  │     → Logs error with traceId                               │
  │     → Returns formatted error response                      │
  └─────────────────────────────────────────────────────────────┘
              `}</pre>
              </div>
            </div>

            <div className="alert alert-info" role="alert">
              <strong><i className="bi bi-lightbulb-fill me-2"></i>Notice:</strong> Plugins/middleware run in the ORDER they're registered. 
              This is why we add the <code>traceId</code> early—so it's available to all downstream code.
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Stack Comparison */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">
              <span className="badge bg-primary me-2">Compare</span>
              Middleware/Pipeline in Other Frameworks
            </h2>
            <p className="mb-4">
              Every web framework has this concept—the names and syntax differ, but the idea is identical:
            </p>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Framework</th>
                    <th>Term Used</th>
                    <th>How to Add</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Fastify (Node.js)</strong></td>
                    <td><span className="badge bg-info">Plugins / Hooks</span></td>
                    <td><code>fastify.addHook()</code></td>
                    <td><code>onRequest, preHandler</code></td>
                  </tr>
                  <tr>
                    <td><strong>ASP.NET Core</strong></td>
                    <td><span className="badge bg-primary">Middleware</span></td>
                    <td><code>app.Use()</code></td>
                    <td><code>UseAuthentication(), UseAuthorization()</code></td>
                  </tr>
                  <tr>
                    <td><strong>Spring Boot</strong></td>
                    <td><span className="badge bg-success">Interceptors / Filters</span></td>
                    <td><code>@Component HandlerInterceptor</code></td>
                    <td><code>preHandle(), postHandle()</code></td>
                  </tr>
                  <tr>
                    <td><strong>Ruby on Rails</strong></td>
                    <td><span className="badge bg-danger">Middleware / Callbacks</span></td>
                    <td><code>before_action</code></td>
                    <td><code>before_action :authenticate_user</code></td>
                  </tr>
                  <tr>
                    <td><strong>Django</strong></td>
                    <td><span className="badge bg-warning text-dark">Middleware</span></td>
                    <td><code>MIDDLEWARE</code> setting</td>
                    <td><code>SessionMiddleware, AuthenticationMiddleware</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Fastify (This Stack)</h5>
                    <pre className="mb-0 small">{`fastify.addHook('onRequest', async (req) => {
  req.traceId = randomUUID();
  req.log.info({ traceId: req.traceId }, 'Request started');
});`}</pre>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">ASP.NET Core</h5>
                    <pre className="mb-0 small">{`app.Use(async (context, next) => {
  var traceId = Guid.NewGuid();
  context.Items["TraceId"] = traceId;
  logger.LogInformation("Request started: {TraceId}", traceId);
  await next();
});`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success mt-4" role="alert">
              <strong>🎯 Universal Pattern:</strong> All frameworks follow the same sequence:
              <code className="d-block mt-2 bg-white p-2 rounded">Request → Middleware Chain → Route Handler → Response</code>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">
              <i className="bi bi-code-slash me-2"></i>
              Code Deep Dive: Our Plugins
            </h2>
            
            <div className="accordion" id="pluginAccordion">
              {/* Request Context Plugin */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#requestContext">
                    <span className="badge bg-primary me-2">1</span>
                    Request Context Plugin (adds traceId)
                  </button>
                </h3>
                <div id="requestContext" className="accordion-collapse collapse show" data-bs-parent="#pluginAccordion">
                  <div className="accordion-body">
                    <p className="mb-3">
                      <strong>Location:</strong> <code>apps/api/src/plugins/requestContext.ts</code>
                    </p>
                    <pre className="bg-dark text-white p-3 rounded">{`import { randomUUID } from 'crypto';
import fp from 'fastify-plugin';

export const requestContextPlugin = fp(async (fastify) => {
  fastify.addHook('onRequest', async (request) => {
    // Generate a unique ID for this request
    request.traceId = randomUUID();
    
    // Now available in: request.log, service methods, error handler
    request.log.info({ traceId: request.traceId }, 'Request received');
  });
});`}</pre>
                    <div className="alert alert-info mt-3">
                      <strong>Why this matters:</strong> Every log message from this request will include the same 
                      <code>traceId</code>, making it easy to filter logs and track a single request end-to-end.
                    </div>
                  </div>
                </div>
              </div>

              {/* Timing Plugin */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#timing">
                    <span className="badge bg-primary me-2">2</span>
                    Timing Plugin (measures performance)
                  </button>
                </h3>
                <div id="timing" className="accordion-collapse collapse" data-bs-parent="#pluginAccordion">
                  <div className="accordion-body">
                    <p className="mb-3">
                      <strong>Location:</strong> <code>apps/api/src/plugins/timing.ts</code>
                    </p>
                    <pre className="bg-dark text-white p-3 rounded">{`import fp from 'fastify-plugin';

export const timingPlugin = fp(async (fastify) => {
  fastify.addHook('onRequest', async (request) => {
    request.startTime = Date.now();
  });

  fastify.addHook('onResponse', async (request, reply) => {
    const duration = Date.now() - request.startTime;
    request.log.info({
      traceId: request.traceId,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      duration
    }, 'Request completed');
  });
});`}</pre>
                    <div className="alert alert-success mt-3">
                      <strong>Performance monitoring:</strong> This plugin records how long every request takes, 
                      helping identify slow endpoints.
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Handler */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#errorHandler">
                    <span className="badge bg-danger me-2">3</span>
                    Error Handler Plugin (catches exceptions)
                  </button>
                </h3>
                <div id="errorHandler" className="accordion-collapse collapse" data-bs-parent="#pluginAccordion">
                  <div className="accordion-body">
                    <p className="mb-3">
                      <strong>Location:</strong> <code>apps/api/src/plugins/errorHandler.ts</code>
                    </p>
                    <pre className="bg-dark text-white p-3 rounded">{`import fp from 'fastify-plugin';
import { AppError } from '../lib/appError';

export const errorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    // Log with traceId for debugging
    request.log.error({
      traceId: request.traceId,
      error: error.message,
      stack: error.stack
    }, 'Request error');

    // Format error response
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.message,
        traceId: request.traceId
      });
    }

    // Unexpected error
    return reply.status(500).send({
      error: 'Internal Server Error',
      traceId: request.traceId
    });
  });
});`}</pre>
                    <div className="alert alert-warning mt-3">
                      <strong>Centralized error handling:</strong> Any error thrown in ANY route handler or service 
                      will be caught here and formatted consistently.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Common Middleware Patterns</h2>
            <p className="mb-4">Here are typical use cases you'll see in production apps:</p>
            
            <div className="row g-3">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-primary">
                  <div className="card-header bg-primary text-white fw-bold">
                    <i className="bi bi-shield-check me-2"></i>Authentication
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Verify user identity before allowing access</p>
                    <code className="small">Check JWT token → Add user to request</code>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-success">
                  <div className="card-header bg-success text-white fw-bold">
                    <i className="bi bi-lock me-2"></i>Authorization
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Check if user has permission for action</p>
                    <code className="small">Verify role/permissions → Allow or deny</code>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-info">
                  <div className="card-header bg-info text-white fw-bold">
                    <i className="bi bi-speedometer2 me-2"></i>Rate Limiting
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Prevent abuse by limiting requests per IP</p>
                    <code className="small">Count requests → Reject if over limit</code>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-warning">
                  <div className="card-header bg-warning text-dark fw-bold">
                    <i className="bi bi-file-earmark-text me-2"></i>Logging
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Record what's happening for debugging</p>
                    <code className="small">Log request details → Continue</code>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-danger">
                  <div className="card-header bg-danger text-white fw-bold">
                    <i className="bi bi-database me-2"></i>Caching
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Return cached response if available</p>
                    <code className="small">Check cache → Return or continue</code>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-secondary">
                  <div className="card-header bg-secondary text-white fw-bold">
                    <i className="bi bi-file-zip me-2"></i>Compression
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Compress response to reduce bandwidth</p>
                    <code className="small">Gzip response body → Send</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm bg-light">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">
              <i className="bi bi-star-fill text-warning me-2"></i>
              Best Practices
            </h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <span className="badge bg-success rounded-circle p-2">✓</span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-bold">Order Matters</h5>
                    <p className="mb-0 small text-muted">
                      Register middleware in logical order: logging first, then auth, then business logic. 
                      Earlier middleware can't access data added by later middleware.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <span className="badge bg-success rounded-circle p-2">✓</span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-bold">Keep It Light</h5>
                    <p className="mb-0 small text-muted">
                      Middleware runs on EVERY request. Avoid heavy operations like database queries unless necessary.
                      Use specific route handlers for expensive operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <span className="badge bg-success rounded-circle p-2">✓</span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-bold">Fail Fast</h5>
                    <p className="mb-0 small text-muted">
                      If authentication fails, stop immediately. Don't waste time parsing request body or 
                      querying database for unauthorized requests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <span className="badge bg-success rounded-circle p-2">✓</span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-bold">Single Responsibility</h5>
                    <p className="mb-0 small text-muted">
                      Each plugin should do ONE thing. Don't create a "god middleware" that does auth, logging, 
                      caching, and validation. Split into separate plugins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Section */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm bg-dark text-white">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">
              <i className="bi bi-terminal me-2"></i>
              Try It Yourself
            </h2>
            <p className="mb-4 text-white-50">
              See the request lifecycle in action by making API calls and examining the server logs.
            </p>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">1. Make a request to create an item:</h5>
              <pre className="bg-black p-3 rounded text-info">{`curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Test Item"}'`}</pre>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">2. Check the server logs—you should see:</h5>
              <ul className="text-white-50">
                <li><code>traceId</code>: Unique ID for this request (e.g., <code>a7c3-4e2f-...</code>)</li>
                <li><code>Request received</code>: From RequestContext plugin</li>
                <li><code>Request completed</code>: From Timing plugin with duration</li>
                <li>All logs for this request share the same <code>traceId</code></li>
              </ul>
            </div>

            <div className="alert alert-info mb-0">
              <strong><i className="bi bi-lightbulb me-2"></i>Pro Tip:</strong> 
              In production, use tools like <strong>DataDog</strong>, <strong>Splunk</strong>, or <strong>ELK Stack</strong> 
              to filter logs by <code>traceId</code> and visualize the request flow across microservices.
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <div className="card border-0 shadow-sm border-start border-4 border-success">
          <div className="card-body p-4">
            <h2 className="h4 fw-semibold mb-3">
              <i className="bi bi-arrow-right-circle-fill text-success me-2"></i>
              What to Learn Next
            </h2>
            <div className="row g-3">
              <div className="col-md-4">
                <a href="/concepts/error-handling" className="text-decoration-none">
                  <div className="card h-100 hover-lift border-danger">
                    <div className="card-body">
                      <h5 className="fw-bold text-dark">Error Handling <i className="bi bi-arrow-right"></i></h5>
                      <p className="text-muted small mb-0">Learn how errors are caught and formatted in the pipeline</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="/concepts/validation-contracts" className="text-decoration-none">
                  <div className="card h-100 hover-lift border-primary">
                    <div className="card-body">
                      <h5 className="fw-bold text-dark">Validation <i className="bi bi-arrow-right"></i></h5>
                      <p className="text-muted small mb-0">How request data is validated before reaching handlers</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="/concepts/observability" className="text-decoration-none">
                  <div className="card h-100 hover-lift border-info">
                    <div className="card-body">
                      <h5 className="fw-bold text-dark">Observability <i className="bi bi-arrow-right"></i></h5>
                      <p className="text-muted small mb-0">Deep dive into logging, tracing, and monitoring</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
