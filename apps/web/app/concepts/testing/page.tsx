export default function TestingPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-4 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'}}>
          <h1 className="display-5 fw-bold text-white mb-0">🧪 Testing Strategy</h1>
        </div>
      </div>
      
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">The Testing Pyramid</h2>
            <pre>{`
           /\\
          /  \\  E2E Tests (few)
         /____\\
        /      \\
       / Integ. \\ Integration Tests (some)
      /__________\\
     /            \\
    /    Unit      \\ Unit Tests (many)
   /________________\\
        `}</pre>
            <div className="alert alert-info mt-3" role="alert">
              <strong>💡 Principle:</strong> Write more unit tests (fast, isolated) and fewer E2E tests (slow, brittle).
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Test Types in This Repo</h2>
            
            <h3 className="h5 fw-semibold mb-3">✅ Integration Tests</h3>
            <p className="mb-2">Location: <code>apps/api/tests/api.test.ts</code></p>
            <p className="text-muted mb-3">
              Tests the full stack: HTTP request → routes → service → repository → database.
            </p>
            <pre>{`
test('POST /items creates item and GET /items returns it', async () => {
  const response = await fetch('http://localhost:3001/items', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test Item' }),
  });
  
  const item = await response.json();
  assert.ok(item.id);
  
  // Verify it appears in the list
  const listResponse = await fetch('http://localhost:3001/items');
  const data = await listResponse.json();
  assert.ok(data.items.find(i => i.id === item.id));
});
        `}</pre>

            <h3 className="h5 fw-semibold mb-3 mt-4">⏳ Unit Tests (Not Yet Implemented)</h3>
            <p className="text-muted mb-3">
              Would test individual functions in isolation:
            </p>
            <ul className="list-unstyled mb-3">
              <li className="mb-1">• Service layer logic</li>
              <li className="mb-1">• Validation schemas</li>
              <li className="mb-1">• Utility functions</li>
            </ul>
            <p className="mb-2">Example:</p>
            <pre>{`
test('ItemsService.listItems filters by search query', async () => {
  const mockRepo = {
    list: vi.fn().mockResolvedValue({
      items: [{ id: '1', name: 'Test' }],
      total: 1,
    }),
  };
  
  const service = new ItemsService(mockRepo);
  const result = await service.listItems({ page: 1, pageSize: 20, q: 'test' });
  
  expect(mockRepo.list).toHaveBeenCalledWith({
    page: 1,
    pageSize: 20,
    searchQuery: 'test',
  });
});
        `}</pre>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">What to Test</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">✅ Happy Path</div>
                  <p className="mb-0 text-muted small">Normal, expected usage</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">🔍 Edge Cases</div>
                  <p className="mb-0 text-muted small">Empty lists, missing data, boundary values</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">❌ Error Cases</div>
                  <p className="mb-0 text-muted small">Invalid input, database errors, timeouts</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="fw-bold mb-2">⚙️ Business Logic</div>
                  <p className="mb-0 text-muted small">Complex calculations, state transitions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">What NOT to Test</h2>
            <div className="alert alert-warning" role="alert">
              <ul className="mb-0">
                <li>Framework internals (Fastify, Prisma)</li>
                <li>Third-party libraries</li>
                <li>Simple getters/setters with no logic</li>
                <li>Configuration files</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">Running Tests</h2>
            <pre>{`
# Run all tests
npm run test

# Run with coverage
npm run test -- --experimental-test-coverage

# Watch mode (if using Vitest)
npm run test:watch
        `}</pre>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Testing Tools Used</h2>
            <div className="list-group mb-4">
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Node Test Runner</h5>
                  <span className="badge bg-primary">Current</span>
                </div>
                <p className="mb-0 text-muted small">Built-in, no dependencies</p>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Fetch API</h5>
                  <span className="badge bg-primary">Current</span>
                </div>
                <p className="mb-0 text-muted small">For making HTTP requests in tests</p>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Node Assert</h5>
                  <span className="badge bg-primary">Current</span>
                </div>
                <p className="mb-0 text-muted small">Simple assertions</p>
              </div>
            </div>
            <p className="text-muted mb-2">For larger projects, consider:</p>
            <ul className="list-unstyled">
              <li className="mb-2">⚡ <strong>Vitest:</strong> Fast, modern test runner with great DX</li>
              <li className="mb-2">🌐 <strong>Supertest:</strong> HTTP assertion library</li>
              <li className="mb-2">🐳 <strong>TestContainers:</strong> Run databases in Docker for tests</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
