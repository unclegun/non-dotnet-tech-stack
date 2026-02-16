export default function ObservabilityPage() {
  return (
    <main>
      <h1>Observability Demo</h1>
      <p>
        This page demonstrates how observability features work in the API.
        Check the API server logs while interacting with the app.
      </p>

      <section>
        <h2>What to Look For in Logs</h2>
        
        <h3>Request Tracing</h3>
        <p>Every request gets a unique <code>traceId</code>:</p>
        <pre>{`
{
  "level": "info",
  "time": "12:34:56",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "method": "POST",
  "url": "/items",
  "statusCode": 201,
  "duration": "45ms",
  "msg": "Request completed"
}
        `}</pre>

        <h3>Error Tracing</h3>
        <p>Errors include the same <code>traceId</code>:</p>
        <pre>{`
{
  "level": "warn",
  "time": "12:35:00",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "error": "Validation error",
  "msg": "Validation Failed"
}
        `}</pre>
        <p>The response also includes the traceId:</p>
        <pre>{`
{
  "type": "https://...",
  "title": "Validation Failed",
  "status": 400,
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "errors": [...]
}
        `}</pre>

        <h3>Background Jobs</h3>
        <p>Jobs log with their own trace ID pattern:</p>
        <pre>{`
[job-heartbeat-1234567890] Running heartbeat job...
[job-heartbeat-1234567890] Heartbeat created successfully
        `}</pre>
      </section>

      <section>
        <h2>Try It Yourself</h2>
        
        <h3>1. Watch the Logs</h3>
        <p>In your terminal where the API is running, you'll see structured JSON logs.</p>

        <h3>2. Make a Request</h3>
        <p>Go to the <a href="/">homepage</a> and create an item. Watch the logs.</p>

        <h3>3. Trigger an Error</h3>
        <p>Try creating an item with an empty name (submit form without typing).</p>
        <p>See how the error response includes a traceId that matches the log entry.</p>

        <h3>4. Search Logs by traceId</h3>
        <p>Copy a traceId from an error response and search your logs:</p>
        <pre>{`grep "550e8400-e29b-41d4-a716-446655440000" api-logs.txt`}</pre>
        <p>You'll see all log entries for that specific request.</p>
      </section>

      <section>
        <h2>Production Observability</h2>
        <p>In a production environment, you would:</p>
        <ul>
          <li><strong>Centralize Logs:</strong> Send to CloudWatch, Datadog, Splunk, or Grafana Loki</li>
          <li><strong>Add Metrics:</strong> Track request rate, error rate, latency (Prometheus, StatsD)</li>
          <li><strong>Distributed Tracing:</strong> Use OpenTelemetry to trace across microservices</li>
          <li><strong>Alerting:</strong> Set up alerts for high error rates or slow responses</li>
          <li><strong>Dashboards:</strong> Visualize metrics in Grafana or similar</li>
        </ul>
      </section>

      <section>
        <h2>Example: Finding Slow Requests</h2>
        <p>With structured logs, you can query for slow requests:</p>
        <pre>{`
# Find requests taking longer than 100ms
jq 'select(.duration != null) | select(.duration | tonumber > 100)' logs.json

# Average duration by endpoint
jq -s 'group_by(.url) | map({url: .[0].url, avg: (map(.duration | tonumber) | add / length)})' logs.json
        `}</pre>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          Read the <a href="/concepts/observability">Observability concept page</a> for more details.
        </p>
      </section>
    </main>
  );
}
