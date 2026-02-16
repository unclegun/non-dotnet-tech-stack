export default function DataAccessPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-4 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
          <h1 className="display-5 fw-bold text-white mb-0">🗄️ Data Access Patterns</h1>
        </div>
      </div>
      
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">The Layer Cake</h2>
            <p className="text-muted mb-3">
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
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Why Three Layers?</h2>
            <div className="list-group">
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">🌐 Routes</h5>
                  <span className="badge bg-primary">HTTP Layer</span>
                </div>
                <p className="mb-0 text-muted small">Handle HTTP concerns (parsing, validation, status codes)</p>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">⚙️ Service</h5>
                  <span className="badge bg-success">Business Logic</span>
                </div>
                <p className="mb-0 text-muted small">Business logic, can be called from routes, jobs, CLI</p>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">📊 Repository</h5>
                  <span className="badge bg-info">Data Access</span>
                </div>
                <p className="mb-0 text-muted small">Data access, abstracts the database</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Code Example: Items Module</h2>
            
            <h3 className="h5 fw-semibold mb-3">Route <span className="badge bg-primary">apps/api/src/modules/items/routes.ts</span></h3>
            <pre>{`
fastify.get('/items', async (request) => {
  const query = ListItemsQuerySchema.parse(request.query);
  return await itemsService.listItems(query);
});
        `}</pre>

            <h3 className="h5 fw-semibold mb-3 mt-4">Service <span className="badge bg-success">apps/api/src/modules/items/service.ts</span></h3>
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

            <h3 className="h5 fw-semibold mb-3 mt-4">Repository <span className="badge bg-info">apps/api/src/modules/items/repo.ts</span></h3>
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
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">When to Use Raw SQL Instead of Prisma?</h2>
            <p className="text-muted mb-3">
              Prisma (ORM) is great for most cases, but consider raw SQL when:
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">✅ Complex joins with aggregations</li>
              <li className="mb-2">⚡ Performance-critical queries that need optimization</li>
              <li className="mb-2">🎯 Database-specific features (PostGIS, full-text search)</li>
              <li className="mb-2">📦 Bulk operations on large datasets</li>
            </ul>
            <div className="alert alert-info mt-3" role="alert">
              <strong>💡 Example:</strong> Use <code>prisma.$queryRaw</code> or <code>prisma.$executeRaw</code> for raw SQL queries.
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">Trade-offs</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th></th>
                    <th>ORM (Prisma)</th>
                    <th>Raw SQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Type Safety</strong></td>
                    <td><span className="badge bg-success">✅ Fully typed</span></td>
                    <td><span className="badge bg-warning text-dark">⚠️ Manual typing</span></td>
                  </tr>
                  <tr>
                    <td><strong>Ease of Use</strong></td>
                    <td><span className="badge bg-success">✅ Simple API</span></td>
                    <td><span className="badge bg-warning text-dark">⚠️ Manual queries</span></td>
                  </tr>
                  <tr>
                    <td><strong>Performance</strong></td>
                    <td><span className="badge bg-warning text-dark">⚠️ Can be suboptimal</span></td>
                    <td><span className="badge bg-success">✅ Full control</span></td>
                  </tr>
                  <tr>
                    <td><strong>Flexibility</strong></td>
                    <td><span className="badge bg-warning text-dark">⚠️ Limited to ORM features</span></td>
                    <td><span className="badge bg-success">✅ Full SQL power</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
