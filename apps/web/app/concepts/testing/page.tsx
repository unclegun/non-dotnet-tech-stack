export default function TestingPage() {
  return (
    <main>
      <h1>Testing Strategy</h1>
      
      <section>
        <h2>The Testing Pyramid</h2>
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
        <p>
          Write more unit tests (fast, isolated) and fewer E2E tests (slow, brittle).
        </p>
      </section>

      <section>
        <h2>Test Types in This Repo</h2>
        
        <h3>Integration Tests</h3>
        <p>Location: <code>apps/api/tests/api.test.ts</code></p>
        <p>
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

        <h3>Unit Tests (Not Yet Implemented)</h3>
        <p>
          Would test individual functions in isolation:
        </p>
        <ul>
          <li>Service layer logic</li>
          <li>Validation schemas</li>
          <li>Utility functions</li>
        </ul>
        <p>Example:</p>
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
      </section>

      <section>
        <h2>What to Test</h2>
        <ul>
          <li><strong>Happy Path:</strong> Normal, expected usage</li>
          <li><strong>Edge Cases:</strong> Empty lists, missing data, boundary values</li>
          <li><strong>Error Cases:</strong> Invalid input, database errors, timeouts</li>
          <li><strong>Business Logic:</strong> Complex calculations, state transitions</li>
        </ul>
      </section>

      <section>
        <h2>What NOT to Test</h2>
        <ul>
          <li>Framework internals (Fastify, Prisma)</li>
          <li>Third-party libraries</li>
          <li>Simple getters/setters with no logic</li>
          <li>Configuration files</li>
        </ul>
      </section>

      <section>
        <h2>Running Tests</h2>
        <pre>{`
# Run all tests
npm run test

# Run with coverage
npm run test -- --experimental-test-coverage

# Watch mode (if using Vitest)
npm run test:watch
        `}</pre>
      </section>

      <section>
        <h2>Testing Tools Used</h2>
        <ul>
          <li><strong>Node Test Runner:</strong> Built-in, no dependencies</li>
          <li><strong>Fetch API:</strong> For making HTTP requests in tests</li>
          <li><strong>Node Assert:</strong> Simple assertions</li>
        </ul>
        <p>
          For larger projects, consider:
        </p>
        <ul>
          <li><strong>Vitest:</strong> Fast, modern test runner with great DX</li>
          <li><strong>Supertest:</strong> HTTP assertion library</li>
          <li><strong>TestContainers:</strong> Run databases in Docker for tests</li>
        </ul>
      </section>
    </main>
  );
}
