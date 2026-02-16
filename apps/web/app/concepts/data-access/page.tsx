export default function DataAccessPage() {
  return (
    <main>
      <h1>Data Access Patterns</h1>
      
      <section>
        <h2>The Layer Cake</h2>
        <p>
          This application uses a layered architecture to separate concerns:
        </p>
        <pre>{`
  Routes (HTTP layer)
    ↓ calls
  Service (Business logic)
    ↓ calls
  Repository (Data access)
    ↓ uses
  Prisma (ORM)
    ↓ talks to
  PostgreSQL (Database)
        `}</pre>
      </section>

      <section>
        <h2>Why Three Layers?</h2>
        <ul>
          <li><strong>Routes:</strong> Handle HTTP concerns (parsing, validation, status codes)</li>
          <li><strong>Service:</strong> Business logic, can be called from routes, jobs, CLI</li>
          <li><strong>Repository:</strong> Data access, abstracts the database</li>
        </ul>
      </section>

      <section>
        <h2>Code Example: Items Module</h2>
        
        <h3>Route (apps/api/src/modules/items/routes.ts)</h3>
        <pre>{`
fastify.get('/items', async (request) => {
  const query = ListItemsQuerySchema.parse(request.query);
  return await itemsService.listItems(query);
});
        `}</pre>

        <h3>Service (apps/api/src/modules/items/service.ts)</h3>
        <pre>{`
async listItems(query: ListItemsQuery): Promise<ListItemsResponse> {
  const { items, total } = await itemsRepository.list({
    page: query.page,
    pageSize: query.pageSize,
    searchQuery: query.q,
  });
  
  // Transform to DTOs
  return { items: items.map(toDto), page, pageSize, total };
}
        `}</pre>

        <h3>Repository (apps/api/src/modules/items/repo.ts)</h3>
        <pre>{`
async list(options: ListItemsOptions): Promise<ListItemsResult> {
  const where = options.searchQuery
    ? { name: { contains: options.searchQuery, mode: 'insensitive' } }
    : {};

  const [items, total] = await Promise.all([
    prisma.item.findMany({ where, skip, take }),
    prisma.item.count({ where }),
  ]);

  return { items, total };
}
        `}</pre>
      </section>

      <section>
        <h2>When to Use Raw SQL Instead of Prisma?</h2>
        <p>
          Prisma (ORM) is great for most cases, but consider raw SQL when:
        </p>
        <ul>
          <li>Complex joins with aggregations</li>
          <li>Performance-critical queries that need optimization</li>
          <li>Database-specific features (PostGIS, full-text search)</li>
          <li>Bulk operations on large datasets</li>
        </ul>
        <p>
          Example: <code>prisma.$queryRaw</code> or <code>prisma.$executeRaw</code>
        </p>
      </section>

      <section>
        <h2>Trade-offs</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ORM (Prisma)</th>
              <th>Raw SQL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Type Safety</strong></td>
              <td>✅ Fully typed</td>
              <td>⚠️ Manual typing</td>
            </tr>
            <tr>
              <td><strong>Ease of Use</strong></td>
              <td>✅ Simple API</td>
              <td>⚠️ Manual queries</td>
            </tr>
            <tr>
              <td><strong>Performance</strong></td>
              <td>⚠️ Can be suboptimal</td>
              <td>✅ Full control</td>
            </tr>
            <tr>
              <td><strong>Flexibility</strong></td>
              <td>⚠️ Limited to ORM features</td>
              <td>✅ Full SQL power</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
