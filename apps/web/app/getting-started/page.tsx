export const metadata = {
  title: 'Getting Started - Complete Beginner Guide',
};

export default function GettingStartedPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-5 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>
          <h1 className="display-4 fw-bold text-white mb-4">
            🚀 Getting Started Guide
          </h1>
          <p className="lead text-white mb-3">
            Complete beginner's guide to understanding this application
          </p>
          <p className="text-white-50 mb-0">
            No prior knowledge assumed. We'll build up from zero to understanding a full-stack application.
          </p>
        </div>
      </div>

      {/* What You'll Learn */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">
            <h2 className="h3 fw-bold mb-4">📖 What You'll Learn</h2>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="text-center p-3 bg-light rounded">
                  <div className="display-6 mb-2">🌐</div>
                  <h5 className="h6 fw-bold">Web Basics</h5>
                  <p className="small text-muted mb-0">How the web works</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 bg-light rounded">
                  <div className="display-6 mb-2">🎨</div>
                  <h5 className="h6 fw-bold">Frontend</h5>
                  <p className="small text-muted mb-0">User interface</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 bg-light rounded">
                  <div className="display-6 mb-2">⚙️</div>
                  <h5 className="h6 fw-bold">Backend</h5>
                  <p className="small text-muted mb-0">Server & logic</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 bg-light rounded">
                  <div className="display-6 mb-2">🗄️</div>
                  <h5 className="h6 fw-bold">Database</h5>
                  <p className="small text-muted mb-0">Data storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 1: How the Web Works */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="h4 mb-0">Chapter 1: How the Web Works (5 minutes)</h3>
          </div>
          <div className="card-body p-4">
            <h4 className="h5 fw-semibold mb-3">The Request-Response Cycle</h4>
            <p>
              Every time you visit a website or use an app, this happens:
            </p>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card border-info h-100">
                  <div className="card-body">
                    <h5 className="card-title h6 fw-bold">
                      <span className="badge bg-info text-dark me-2">1</span>
                      You make a REQUEST
                    </h5>
                    <p className="card-text mb-0">
                      You type a URL, click a button, or submit a form. Your browser sends a <strong>request</strong> to a server.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-success h-100">
                  <div className="card-body">
                    <h5 className="card-title h6 fw-bold">
                      <span className="badge bg-success me-2">2</span>
                      Server sends RESPONSE
                    </h5>
                    <p className="card-text mb-0">
                      The server processes your request and sends back a <strong>response</strong> (HTML, JSON data, an image, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-primary" role="alert">
              <h5 className="alert-heading">🔍 Example: Creating an Item</h5>
              <ol className="mb-0">
                <li><strong>You:</strong> Type "My Item" and click "Create" → <span className="badge bg-primary">REQUEST</span></li>
                <li><strong>Server:</strong> Saves to database → <span className="badge bg-success">RESPONSE</span> "Success!"</li>
                <li><strong>You see:</strong> "Item created successfully!" message</li>
              </ol>
            </div>

            <h4 className="h5 fw-semibold mb-3 mt-4">Three Key Parts of a Web App</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th style={{width: '150px'}}>Part</th>
                    <th>What It Does</th>
                    <th>Analogy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Frontend</strong><br/><small className="text-muted">(Browser)</small></td>
                    <td>What you see and interact with. Buttons, forms, colors, animations.</td>
                    <td>🍽️ The restaurant dining room</td>
                  </tr>
                  <tr>
                    <td><strong>Backend</strong><br/><small className="text-muted">(Server)</small></td>
                    <td>Processes requests, runs business logic, talks to the database.</td>
                    <td>👨‍🍳 The kitchen</td>
                  </tr>
                  <tr>
                    <td><strong>Database</strong><br/><small className="text-muted">(Storage)</small></td>
                    <td>Stores data permanently (users, items, posts, etc.).</td>
                    <td>🧊 The refrigerator/pantry</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Understanding This Application */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-success text-white">
            <h3 className="h4 mb-0">Chapter 2: Understanding This Application</h3>
          </div>
          <div className="card-body p-4">
            <h4 className="h5 fw-semibold mb-3">What Technologies Are Used?</h4>
            
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card h-100 border-primary">
                  <div className="card-header bg-primary text-white">
                    <strong>Frontend Tech</strong>
                  </div>
                  <div className="card-body">
                    <dl className="mb-0">
                      <dt>Next.js</dt>
                      <dd className="mb-3">A framework for building React applications with routing and server features.</dd>
                      
                      <dt>React</dt>
                      <dd className="mb-3">A library for building user interfaces with reusable components.</dd>
                      
                      <dt>TypeScript</dt>
                      <dd className="mb-0">JavaScript with type checking to catch errors before runtime.</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 border-warning">
                  <div className="card-header bg-warning text-dark">
                    <strong>Backend Tech</strong>
                  </div>
                  <div className="card-body">
                    <dl className="mb-0">
                      <dt>Fastify</dt>
                      <dd className="mb-3">A fast web server framework for Node.js (like Express but faster).</dd>
                      
                      <dt>Prisma</dt>
                      <dd className="mb-3">Tool for talking to the database in a type-safe way.</dd>
                      
                <dt>PostgreSQL</dt>
                      <dd className="mb-0">The database that stores all the data permanently.</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info" role="alert">
              <h5 className="alert-heading">💡 Why These Technologies?</h5>
              <ul className="mb-0">
                <li><strong>TypeScript everywhere:</strong> Same language for frontend and backend = easier to learn</li>
                <li><strong>Modern & popular:</strong> These are real tools used by companies</li>
                <li><strong>Good documentation:</strong> Easy to find help online</li>
              </ul>
            </div>

            <h4 className="h5 fw-semibold mb-3 mt-4">Comparing to Other Stacks</h4>
            <p>If you've heard of other technologies, here's how they compare:</p>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead className="table-light">
                  <tr>
                    <th>This Project</th>
                    <th>.NET Core</th>
                    <th>Rails</th>
                    <th>Django</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Next.js</td>
                    <td>Razor Pages</td>
                    <td>ERB Views</td>
                    <td>Django Templates</td>
                  </tr>
                  <tr>
                    <td>Fastify</td>
                    <td>ASP.NET Core</td>
                    <td>Rails Controllers</td>
                    <td>Django Views</td>
                  </tr>
                  <tr>
                    <td>Prisma</td>
                    <td>Entity Framework</td>
                    <td>Active Record</td>
                    <td>Django ORM</td>
                  </tr>
                  <tr>
                    <td>PostgreSQL</td>
                    <td>SQL Server / PostgreSQL</td>
                    <td>PostgreSQL</td>
                    <td>PostgreSQL</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted small mb-0">
              <strong>Key point:</strong> They all do the same things, just with different syntax and conventions!
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: Code Structure */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-warning text-dark">
            <h3 className="h4 mb-0">Chapter 3: Understanding the Code Structure</h3>
          </div>
          <div className="card-body p-4">
            <h4 className="h5 fw-semibold mb-3">The Folder Structure</h4>
            <p>Let's understand what each folder does:</p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <h5 className="card-title h6 fw-bold">
                      <code>apps/web/</code> - Frontend
                    </h5>
                    <p className="small mb-2">This is what runs in your browser</p>
                    <ul className="small">
                      <li><code>app/</code> - Pages and routes</li>
                      <li><code>components/</code> - Reusable UI pieces</li>
                      <li><code>lib/</code> - Helper functions</li>
                    </ul>
                    <div className="alert alert-info alert-sm mb-0" role="alert">
                      <strong>Think of it as:</strong> The storefront that customers see
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <h5 className="card-title h6 fw-bold">
                      <code>apps/api/</code> - Backend
                    </h5>
                    <p className="small mb-2">This runs on a server</p>
                    <ul className="small">
                      <li><code>src/modules/</code> - Business features</li>
                      <li><code>src/plugins/</code> - Middleware (logging, errors)</li>
                      <li><code>prisma/</code> - Database schema</li>
                    </ul>
                    <div className="alert alert-warning alert-sm mb-0" role="alert">
                      <strong>Think of it as:</strong> The kitchen and storage area
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title h6 fw-bold">
                      <code>packages/contracts/</code> - Shared Code
                    </h5>
                    <p className="small mb-2">Code used by both frontend and backend</p>
                    <ul className="small mb-2">
                      <li>Defines what data looks like (Item has name, createdAt, etc.)</li>
                      <li>Validation rules (name must be 1-200 characters)</li>
                    </ul>
                    <div className="alert alert-success alert-sm mb-0" role="alert">
                      <strong>Think of it as:</strong> The menu that both customers and kitchen staff use
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="h5 fw-semibold mb-3 mt-5">The Three-Layer Architecture</h4>
            <p>The backend code is organized into three layers. Here's why:</p>

            <div className="accordion" id="layersAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#layer1">
                    <strong>Layer 1: Routes (HTTP Layer)</strong>
                  </button>
                </h2>
                <div id="layer1" className="accordion-collapse collapse show" data-bs-parent="#layersAccordion">
                  <div className="accordion-body">
                    <p><strong>Purpose:</strong> Handle HTTP requests and responses</p>
                    <p className="mb-3"><strong>Location:</strong> <code>apps/api/src/modules/items/routes.ts</code></p>
                    <pre className="mb-3"><code>{`fastify.get('/items', async (request) => {
  // 1. Validate request (query parameters, headers)
  // 2. Call service layer
  const items = await itemsService.listItems();
  // 3. Return response with status code
  return { data: items };
});`}</code></pre>
                    <p className="mb-0 text-muted small">
                      <strong>Analogy:</strong> The waiter who takes orders and brings food
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#layer2">
                    <strong>Layer 2: Service (Business Logic)</strong>
                  </button>
                </h2>
                <div id="layer2" className="accordion-collapse collapse" data-bs-parent="#layersAccordion">
                  <div className="accordion-body">
                    <p><strong>Purpose:</strong> Contains your application's rules and logic</p>
                    <p className="mb-3"><strong>Location:</strong> <code>apps/api/src/modules/items/service.ts</code></p>
                    <pre className="mb-3"><code>{`async listItems(query) {
  // 1. Apply business rules
  // 2. Call repository to get data
  const items = await itemsRepository.list();
  // 3. Transform data if needed
  return items.map(item => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt
  }));
}`}</code></pre>
                    <p className="mb-0 text-muted small">
                      <strong>Analogy:</strong> The chef who decides how to prepare the food
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#layer3">
                    <strong>Layer 3: Repository (Data Access)</strong>
                  </button>
                </h2>
                <div id="layer3" className="accordion-collapse collapse" data-bs-parent="#layersAccordion">
                  <div className="accordion-body">
                    <p><strong>Purpose:</strong> Talk to the database</p>
                    <p className="mb-3"><strong>Location:</strong> <code>apps/api/src/modules/items/repo.ts</code></p>
                    <pre className="mb-3"><code>{`async list() {
  // Pure database operations
  return await prisma.item.findMany({
    orderBy: { createdAt: 'desc' }
  });
}`}</code></pre>
                    <p className="mb-0 text-muted small">
                      <strong>Analogy:</strong> The person who gets ingredients from the storage room
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success mt-4" role="alert">
              <h5 className="alert-heading">✅ Why Three Layers?</h5>
              <ul className="mb-0">
                <li><strong>Separation of concerns:</strong> Each layer has one job</li>
                <li><strong>Easier to test:</strong> Test each layer independently</li>
                <li><strong>Reusability:</strong> Service layer can be called from routes, background jobs, CLI tools</li>
                <li><strong>Flexibility:</strong> Can swap database without changing business logic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 4: Following a Request */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-info text-dark">
            <h3 className="h4 mb-0">Chapter 4: Following a Request Through the System</h3>
          </div>
          <div className="card-body p-4">
            <h4 className="h5 fw-semibold mb-3">Let's Create an Item - Step by Step</h4>
            <p className="mb-4">
              You type "My First Item" and click "Create". Here's exactly what happens:
            </p>

            <div className="timeline">
              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-primary" style={{fontSize: '1.2rem'}}>1</span>
                </div>
                <div className="col-11">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Browser: FormSubmit Event</h5>
                      <p className="mb-2"><strong>File:</strong> <code>apps/web/components/ItemForm.tsx</code></p>
                      <pre className="mb-2"><code>{`const handleSubmit = async (e) => {
  e.preventDefault(); // Don't reload page
  await apiClient.createItem({ name: "My First Item" });
};`}</code></pre>
                      <p className="mb-0 text-muted small">
                        React captures the form submission and calls the API client
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-primary" style={{fontSize: '1.2rem'}}>2</span>
                </div>
                <div className="col-11">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">API Client: HTTP Request</h5>
                      <p className="mb-2"><strong>File:</strong> <code>apps/web/lib/apiClient.ts</code></p>
                      <pre className="mb-2"><code>{`async createItem(body: CreateItemBody) {
  const response = await fetch('http://localhost:3001/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
}`}</code></pre>
                      <p className="mb-0 text-muted small">
                        Sends HTTP POST request to the backend server
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-warning text-dark" style={{fontSize: '1.2rem'}}>3</span>
                </div>
                <div className="col-11">
                  <div className="card border-warning">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Backend: Plugins Run First</h5>
                      <p className="mb-2"><strong>Files:</strong> <code>apps/api/src/plugins/</code></p>
                      <ul className="mb-0">
                        <li><strong>requestContext.ts:</strong> Adds unique traceId to request</li>
                        <li><strong>timing.ts:</strong> Starts timer to measure duration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-warning text-dark" style={{fontSize: '1.2rem'}}>4</span>
                </div>
                <div className="col-11">
                  <div className="card border-warning">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Route Handler: Validation</h5>
                      <p className="mb-2"><strong>File:</strong> <code>apps/api/src/modules/items/routes.ts</code></p>
                      <pre className="mb-2"><code>{`fastify.post('/items', async (request) => {
  // Validate request body
  const body = CreateItemBodySchema.parse(request.body);
  // body = { name: "My First Item" }
  
  const item = await itemsService.createItem(body);
  return { data: item };
});`}</code></pre>
                      <p className="mb-0 text-muted small">
                        Checks that name exists and is 1-200 characters
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-warning text-dark" style={{fontSize: '1.2rem'}}>5</span>
                </div>
                <div className="col-11">
                  <div className="card border-warning">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Service Layer: Business Logic</h5>
                      <p className="mb-2"><strong>File:</strong> <code>apps/api/src/modules/items/service.ts</code></p>
                      <pre className="mb-2"><code>{`async createItem(body) {
  // Could add business logic here:
  // - Generate a unique code
  // - Send notification
  // - Log audit trail
  
  const item = await itemsRepository.create(body);
  return item;
}`}</code></pre>
                      <p className="mb-0 text-muted small">
                        In this simple app, it just passes through to the repository
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-success" style={{fontSize: '1.2rem'}}>6</span>
                </div>
                <div className="col-11">
                  <div className="card border-success">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Repository: Database Insert</h5>
                      <p className="mb-2"><strong>File:</strong> <code>apps/api/src/modules/items/repo.ts</code></p>
                      <pre className="mb-2"><code>{`async create(data) {
  return await prisma.item.create({
    data: {
      name: data.name,
      // createdAt automatically set by database
    }
  });
}`}</code></pre>
                      <p className="mb-0 text-muted small">
                        Prisma translates this to SQL: <code>INSERT INTO items (name) VALUES ('My First Item')</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-success" style={{fontSize: '1.2rem'}}>7</span>
                </div>
                <div className="col-11">
                  <div className="card border-success">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Response Bubbles Back Up</h5>
                      <p className="mb-2">Database → Repository → Service → Route → HTTP Response</p>
                      <pre className="mb-2"><code>{`{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My First Item",
    "createdAt": "2026-02-16T12:34:56.789Z"
  }
}`}</code></pre>
                      <p className="mb-0 text-muted small">
                        Each layer adds its part until the complete response reaches the browser
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-1 text-end">
                  <span className="badge rounded-pill bg-primary" style={{fontSize: '1.2rem'}}>8</span>
                </div>
                <div className="col-11">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h5 className="card-title h6 fw-bold">Browser: Update UI</h5>
                      <p className="mb-2"><strong>File:</strong> <code>apps/web/components/ItemForm.tsx</code></p>
                      <pre className="mb-2"><code>{`// In the handleSubmit function:
setSuccess('Item created successfully!');
setName(''); // Clear the form
setTimeout(() => {
  window.location.reload(); // Refresh to show new item
}, 500);`}</code></pre>
                      <p className="mb-0 text-muted small">
                        User sees "Item created successfully!" and the form clears
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success mt-4" role="alert">
              <h5 className="alert-heading">🎉 That's It!</h5>
              <p className="mb-0">
                This same pattern happens for EVERY request in EVERY web application. 
                The technologies might be different, but the flow is always: <br/>
                <strong>Frontend → HTTP Request → Validation → Business Logic → Database → Response → Frontend</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-5">
        <div className="card border-0 shadow-lg" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div className="card-body p-5 text-white">
            <h3 className="h4 fw-bold mb-4">🎯 Your Next Steps</h3>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body">
                    <h5 className="card-title">1. Try the Live Demo</h5>
                    <p className="card-text">
                      Go to the <a href="/">homepage</a> and create some items. 
                      Watch what happens in the browser's Network tab (F12 → Network).
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body">
                    <h5 className="card-title">2. Explore the Code</h5>
                    <p className="card-text">
                      Visit the <a href="/code-walkthrough">Code Walkthrough</a> page to see 
                      the actual files and understand each part in detail.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body">
                    <h5 className="card-title">3. Learn Core Concepts</h5>
                    <p className="card-text">
                      Read the <a href="/concepts">Concepts</a> pages to understand 
                      validation, error handling, testing, and more.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body">
                    <h5 className="card-title">4. Compare Tech Stacks</h5>
                    <p className="card-text">
                      Check out <a href="/tech-stacks">Tech Stack Comparison</a> to see 
                      how other frameworks (.NET, Spring, Rails) solve the same problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
              <h5 className="fw-bold mb-2">💪 Remember</h5>
              <p className="mb-0">
                Don't try to learn everything at once. Focus on understanding ONE request flow completely. 
                Once you understand how creating an item works, everything else will make sense because 
                it follows the same pattern!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">❓ Frequently Asked Questions</h3>
          </div>
          <div className="card-body p-4">
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    Do I need to know JavaScript/TypeScript first?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    <p className="mb-0">
                      Yes, basic JavaScript knowledge is recommended. You should understand variables, functions, 
                      objects, arrays, and async/await. TypeScript adds type checking on top of JavaScript, 
                      which you can learn as you go.
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    How is this different from learning .NET or Java?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">
                      The <strong>concepts are the same</strong>—all frameworks have routing, ORMs, validation, etc. 
                      The differences are mainly:
                    </p>
                    <ul className="mb-0">
                      <li>Syntax and language features</li>
                      <li>How things are configured (code vs. annotations vs. files)</li>
                      <li>Default choices and conventions</li>
                    </ul>
                    <p className="mt-2 mb-0">
                      Once you understand one stack well, learning another is much easier because you already 
                      know what problems need to be solved!
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    What should I build to practice?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    <p className="mb-2">Start with simple CRUD applications:</p>
                    <ol className="mb-2">
                      <li><strong>Todo List:</strong> Create, read, update, delete todos</li>
                      <li><strong>Blog:</strong> Posts with titles, content, author</li>
                      <li><strong>Inventory System:</strong> Track items with quantities</li>
                      <li><strong>Recipe Manager:</strong> Store recipes with ingredients</li>
                    </ol>
                    <p className="mb-0">
                      Each project teaches the same concepts but lets you practice them multiple times.
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                    How long does it take to learn this?
                  </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    <p className="mb-2"><strong>Timeline for absolute beginners:</strong></p>
                    <ul className="mb-0">
                      <li><strong>1-2 weeks:</strong> Understand the basic concepts and follow this guide</li>
                      <li><strong>1-2 months:</strong> Build your first CRUD application by following tutorials</li>
                      <li><strong>3-6 months:</strong> Build projects independently with occasional help</li>
                      <li><strong>6-12 months:</strong> Comfortable building full-stack applications</li>
                    </ul>
                    <p className="mt-2 mb-0">
                      <strong>Remember:</strong> Learning to code is a marathon, not a sprint. Focus on understanding 
                      concepts deeply rather than rushing through.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
