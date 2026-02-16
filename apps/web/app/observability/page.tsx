export default function ObservabilityPage() {
  return (
    <main className="container py-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg mb-5" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
        <div className="card-body text-white p-5">
          <h1 className="display-4 fw-bold mb-3">👁️ Observability Demo</h1>
          <p className="lead mb-0">
            This page demonstrates how observability features work in the API.
            Check the API server logs while interacting with the app.
          </p>
        </div>
      </div>

      {/* What to Look For in Logs */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">📊 What to Look For in Logs</h2>
            <p className="text-muted mb-0">Understanding structured logging and trace correlation</p>
          </div>
          <div className="card-body">
            {/* Request Tracing */}
            <div className="mb-4">
              <h3 className="h5 mb-3">
                <span className="badge bg-info me-2">🔍</span>
                Request Tracing
              </h3>
              <p className="mb-2">Every request gets a unique <code>traceId</code>:</p>
              <div className="bg-dark text-light rounded p-3">
                <pre className="mb-0" style={{ fontSize: '0.85rem', color: '#98c379' }}>{`{
  "level": "info",
  "time": "12:34:56",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "method": "POST",
  "url": "/items",
  "statusCode": 201,
  "duration": "45ms",
  "msg": "Request completed"
}`}</pre>
              </div>
            </div>

            {/* Error Tracing */}
            <div className="mb-4">
              <h3 className="h5 mb-3">
                <span className="badge bg-warning text-dark me-2">⚠️</span>
                Error Tracing
              </h3>
              <p className="mb-2">Errors include the same <code>traceId</code>:</p>
              <div className="bg-dark text-light rounded p-3 mb-3">
                <pre className="mb-0" style={{ fontSize: '0.85rem', color: '#e5c07b' }}>{`{
  "level": "warn",
  "time": "12:35:00",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "error": "Validation error",
  "msg": "Validation Failed"
}`}</pre>
              </div>
              <p className="mb-2">The response also includes the traceId:</p>
              <div className="bg-dark text-light rounded p-3">
                <pre className="mb-0" style={{ fontSize: '0.85rem', color: '#e06c75' }}>{`{
  "type": "https://...",
  "title": "Validation Failed",
  "status": 400,
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "errors": [...]
}`}</pre>
              </div>
            </div>

            {/* Background Jobs */}
            <div>
              <h3 className="h5 mb-3">
                <span className="badge bg-secondary me-2">⚙️</span>
                Background Jobs
              </h3>
              <p className="mb-2">Jobs log with their own trace ID pattern:</p>
              <div className="bg-dark text-light rounded p-3">
                <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`[job-heartbeat-1234567890] Running heartbeat job...
[job-heartbeat-1234567890] Heartbeat created successfully`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Yourself */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🧪 Try It Yourself</h2>
            <p className="text-muted mb-0">Interactive exercises to explore observability features</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-primary rounded-circle me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                      <h3 className="h5 mb-0">Watch the Logs</h3>
                    </div>
                    <p className="mb-0">In your terminal where the API is running, you'll see structured JSON logs.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-primary rounded-circle me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                      <h3 className="h5 mb-0">Make a Request</h3>
                    </div>
                    <p className="mb-0">Go to the <a href="/" className="fw-bold">homepage</a> and create an item. Watch the logs.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-primary rounded-circle me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                      <h3 className="h5 mb-0">Trigger an Error</h3>
                    </div>
                    <p className="mb-2">Try creating an item with an empty name (submit form without typing).</p>
                    <p className="mb-0 text-muted small">See how the error response includes a traceId that matches the log entry.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-primary rounded-circle me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
                      <h3 className="h5 mb-0">Search Logs by traceId</h3>
                    </div>
                    <p className="mb-2">Copy a traceId from an error response and search your logs:</p>
                    <div className="bg-dark text-light rounded p-2">
                      <code style={{ fontSize: '0.8rem' }}>grep "550e8400-e29b-41d4-a716-446655440000" api-logs.txt</code>
                    </div>
                    <p className="mb-0 mt-2 text-muted small">You'll see all log entries for that specific request.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Observability */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🚀 Production Observability</h2>
            <p className="text-muted mb-0">Best practices for production environments</p>
          </div>
          <div className="card-body">
            <div className="alert alert-info border-0 mb-0" role="alert">
              <h4 className="alert-heading h6 mb-3">💡 In a production environment, you would:</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent">
                  <strong>Centralize Logs:</strong> Send to CloudWatch, Datadog, Splunk, or Grafana Loki
                </li>
                <li className="list-group-item bg-transparent">
                  <strong>Add Metrics:</strong> Track request rate, error rate, latency (Prometheus, StatsD)
                </li>
                <li className="list-group-item bg-transparent">
                  <strong>Distributed Tracing:</strong> Use OpenTelemetry to trace across microservices
                </li>
                <li className="list-group-item bg-transparent">
                  <strong>Alerting:</strong> Set up alerts for high error rates or slow responses
                </li>
                <li className="list-group-item bg-transparent">
                  <strong>Dashboards:</strong> Visualize metrics in Grafana or similar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example: Finding Slow Requests */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h2 className="h3 mb-2">🔎 Example: Finding Slow Requests</h2>
            <p className="text-muted mb-0">Query structured logs with jq for insights</p>
          </div>
          <div className="card-body">
            <p className="mb-3">With structured logs, you can query for slow requests:</p>
            <div className="bg-dark text-light rounded p-3">
              <pre className="mb-0" style={{ fontSize: '0.85rem' }}>{`# Find requests taking longer than 100ms
jq 'select(.duration != null) | select(.duration | tonumber > 100)' logs.json

# Average duration by endpoint
jq -s 'group_by(.url) | map({url: .[0].url, avg: (map(.duration | tonumber) | add / length)})' logs.json`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="card-body text-white text-center p-4">
            <h2 className="h4 mb-3">📚 Learn More</h2>
            <p className="mb-3">
              Read the Observability concept page for more details about monitoring,
              logging, and tracing in distributed systems.
            </p>
            <a href="/concepts/observability" className="btn btn-light btn-lg">View Concept Page →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
