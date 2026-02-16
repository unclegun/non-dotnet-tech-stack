export const metadata = {
  title: 'Tech Stack Comparison - Study Guide',
};

export default function TechStacksPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-5 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <h1 className="display-4 fw-bold text-white mb-4">
            🌐 Tech Stack Comparison Guide
          </h1>
          <p className="lead text-white mb-3">
            Understanding how different technology stacks solve the same problems
          </p>
          <p className="text-white-50 mb-0">
            This guide helps you understand concepts across JavaScript/TypeScript, .NET, Java Spring, 
            Ruby on Rails, Python Django, and more. Learn once, apply everywhere.
          </p>
        </div>
      </div>

      {/* Core Concepts Section */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">
            <h2 className="h3 fw-bold mb-4">🎯 Core Concepts Across Stacks</h2>
            <p className="lead text-muted mb-4">
              All modern web frameworks solve the same fundamental problems. Here's how different ecosystems approach them:
            </p>

            <div className="alert alert-info" role="alert">
              <strong>💡 Key Insight:</strong> Regardless of the language or framework, full-stack applications have the same core layers:
              <strong> Presentation → API → Business Logic → Data Access → Database</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Server Framework Comparison */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">⚡ Web Server Framework</h3>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-4">
              The web server handles HTTP requests, routing, and middleware. It's the entry point for all API calls.
            </p>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Stack</th>
                    <th>Framework</th>
                    <th>Key Characteristics</th>
                    <th>Common Use Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge bg-warning text-dark">This Project</span></td>
                    <td><strong>Fastify (Node.js)</strong></td>
                    <td>
                      <ul className="mb-0 small">
                        <li>Fast, low overhead</li>
                        <li>Plugin-based architecture</li>
                        <li>JSON schema validation</li>
                        <li>Async/await native</li>
                      </ul>
                    </td>
                    <td>APIs, microservices, real-time apps</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-primary">.NET</span></td>
                    <td><strong>ASP.NET Core</strong></td>
                    <td>
                      <ul className="mb-0 small">
                        <li>Strongly typed, compiled</li>
                        <li>Middleware pipeline</li>
                        <li>Built-in DI container</li>
                        <li>Great performance</li>
                      </ul>
                    </td>
                    <td>Enterprise apps, APIs, web apps</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-success">Java</span></td>
                    <td><strong>Spring Boot</strong></td>
                    <td>
                      <ul className="mb-0 small">
                        <li>Convention over configuration</li>
                        <li>Comprehensive DI</li>
                        <li>Annotation-based</li>
                        <li>Massive ecosystem</li>
                      </ul>
                    </td>
                    <td>Enterprise apps, large systems</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-danger">Ruby</span></td>
                    <td><strong>Ruby on Rails</strong></td>
                    <td>
                      <ul className="mb-0 small">
                        <li>"Convention over configuration"</li>
                        <li>Full-stack framework</li>
                        <li>Active Record ORM</li>
                        <li>Rapid development</li>
                      </ul>
                    </td>
                    <td>MVPs, startups, content sites</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-info text-dark">Python</span></td>
                    <td><strong>Django / FastAPI</strong></td>
                    <td>
                      <ul className="mb-0 small">
                        <li>Django: batteries included</li>
                        <li>FastAPI: modern, fast APIs</li>
                        <li>Great for data science integration</li>
                        <li>Strong security features</li>
                      </ul>
                    </td>
                    <td>APIs, data apps, ML integration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert alert-secondary mt-4" role="alert">
              <h5 className="alert-heading">🤔 When to Choose What?</h5>
              <ul className="mb-0">
                <li><strong>Node.js/Fastify:</strong> Real-time features, JavaScript everywhere, fast iteration</li>
                <li><strong>.NET Core:</strong> Enterprise apps, strong typing needs, Windows ecosystem</li>
                <li><strong>Spring Boot:</strong> Large teams, complex business logic, Java ecosystem</li>
                <li><strong>Rails:</strong> Fast prototyping, content-heavy sites, convention over configuration</li>
                <li><strong>Django/FastAPI:</strong> Data science integration, Python developers, API-first</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Routing Comparison */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">🛣️ Routing & Controllers</h3>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-4">
              How different frameworks define API endpoints and handle HTTP requests.
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-2" style={{borderColor: '#ffc107'}}>
                  <div className="card-header bg-warning bg-opacity-10">
                    <strong>This Project: Fastify Routes</strong>
                  </div>
                  <div className="card-body">
                    <pre className="mb-0"><code>{`// routes.ts
fastify.get('/items', async (request) => {
  const items = await service.listItems();
  return { data: items };
});

fastify.post('/items', async (request) => {
  const body = validate(schema, request.body);
  const item = await service.createItem(body);
  return { data: item };
});`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-2" style={{borderColor: '#0d6efd'}}>
                  <div className="card-header" style={{backgroundColor: '#e7f1ff'}}>
                    <strong>.NET Core: Controllers</strong>
                  </div>
                  <div className="card-body">
                    <pre className="mb-0"><code>{`// ItemsController.cs
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase {
  
  [HttpGet]
  public async Task<ActionResult<ItemDto[]>> GetItems() {
    var items = await _service.ListItems();
    return Ok(items);
  }

  [HttpPost]
  public async Task<ActionResult<ItemDto>> CreateItem(
    [FromBody] CreateItemRequest request) {
    var item = await _service.CreateItem(request);
    return CreatedAtAction(nameof(GetItems), item);
  }
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-2" style={{borderColor: '#198754'}}>
                  <div className="card-header bg-success bg-opacity-10">
                    <strong>Spring Boot: Controllers</strong>
                  </div>
                  <div className="card-body">
                    <pre className="mb-0"><code>{`// ItemsController.java
@RestController
@RequestMapping("/api/items")
public class ItemsController {
  
  @Autowired
  private ItemsService service;

  @GetMapping
  public ResponseEntity<List<ItemDto>> getItems() {
    List<ItemDto> items = service.listItems();
    return ResponseEntity.ok(items);
  }

  @PostMapping
  public ResponseEntity<ItemDto> createItem(
    @RequestBody @Valid CreateItemRequest request) {
    ItemDto item = service.createItem(request);
    return ResponseEntity.status(201).body(item);
  }
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-2" style={{borderColor: '#dc3545'}}>
                  <div className="card-header bg-danger bg-opacity-10">
                    <strong>Ruby on Rails: Controllers</strong>
                  </div>
                  <div className="card-body">
                    <pre className="mb-0"><code>{`# items_controller.rb
class ItemsController < ApplicationController
  
  def index
    @items = Item.all
    render json: @items
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      render json: @item, status: :created
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  private
  def item_params
    params.require(:item).permit(:name)
  end
end`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-light rounded">
              <h5 className="fw-bold mb-3">🎓 Learning Insight</h5>
              <p className="mb-2">All frameworks follow the same pattern:</p>
              <ol className="mb-0">
                <li><strong>Define the route/endpoint:</strong> What URL pattern to match</li>
                <li><strong>Extract parameters:</strong> From URL, query string, or request body</li>
                <li><strong>Validate input:</strong> Ensure data meets requirements</li>
                <li><strong>Call business logic:</strong> Delegate to service layer</li>
                <li><strong>Return response:</strong> With appropriate status code</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ORM Comparison */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">🗄️ ORM / Data Access</h3>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-4">
              ORMs (Object-Relational Mappers) translate between your code and database tables.
            </p>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Stack</th>
                    <th>ORM/Data Layer</th>
                    <th>Example Query</th>
                    <th>Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge bg-warning text-dark">This Project</span></td>
                    <td><strong>Prisma</strong></td>
                    <td><code>prisma.item.findMany()</code></td>
                    <td>Type-safe, schema-first, migrations, great DX</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-primary">.NET</span></td>
                    <td><strong>Entity Framework Core</strong></td>
                    <td><code>_context.Items.ToListAsync()</code></td>
                    <td>LINQ queries, migrations, tracking, mature</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-success">Java</span></td>
                    <td><strong>JPA/Hibernate</strong></td>
                    <td><code>repository.findAll()</code></td>
                    <td>Standard API, extensive features, caching</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-danger">Ruby</span></td>
                    <td><strong>Active Record</strong></td>
                    <td><code>Item.all</code></td>
                    <td>Models = tables, convention-based, simple</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-info text-dark">Python</span></td>
                    <td><strong>Django ORM / SQLAlchemy</strong></td>
                    <td><code>Item.objects.all()</code></td>
                    <td>QuerySet API, admin integration, flexible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h6 className="fw-bold">📘 When to use ORM</h6>
                    <ul className="mb-0 small">
                      <li>Standard CRUD operations</li>
                      <li>Simple queries</li>
                      <li>Type safety needed</li>
                      <li>Quick development</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h6 className="fw-bold">📗 When to use Raw SQL</h6>
                    <ul className="mb-0 small">
                      <li>Complex joins</li>
                      <li>Performance critical</li>
                      <li>Database-specific features</li>
                      <li>Reporting queries</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h6 className="fw-bold">📙 Mix Both</h6>
                    <ul className="mb-0 small">
                      <li>Use ORM for 80% of queries</li>
                      <li>Drop to SQL for complex cases</li>
                      <li>Best of both worlds</li>
                      <li>All frameworks support this</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Comparison */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">✓ Input Validation</h3>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-4">
              Ensuring data meets requirements before processing. Critical for security and data integrity.
            </p>

            <div className="row g-4">
              <div className="col-lg-6">
                <h5 className="fw-semibold mb-3">Validation Approaches</h5>
                <div className="list-group">
                  <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1"><span className="badge bg-warning text-dark">Node.js</span> Zod</h6>
                    </div>
                    <p className="mb-1 small">Schema-based, TypeScript-first, runtime validation</p>
                    <code className="small">z.object({'{ name: z.string().min(1) }'})</code>
                  </div>
                  <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1"><span className="badge bg-primary">.NET</span> Data Annotations</h6>
                    </div>
                    <p className="mb-1 small">Attribute-based validation on model properties</p>
                    <code className="small">[Required, MaxLength(200)]</code>
                  </div>
                  <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1"><span className="badge bg-success">Java</span> JSR-303/Bean Validation</h6>
                    </div>
                    <p className="mb-1 small">Annotation-based, standard API</p>
                    <code className="small">@NotNull @Size(min=1, max=200)</code>
                  </div>
                  <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1"><span className="badge bg-danger">Rails</span> Active Record Validations</h6>
                    </div>
                    <p className="mb-1 small">Model-level validation rules</p>
                    <code className="small">validates :name, presence: true, length: {'{ maximum: 200 }'}</code>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <h5 className="fw-semibold mb-3">Common Validation Rules (All Stacks)</h5>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Rule</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>Required</code></td>
                        <td>Field must have a value</td>
                      </tr>
                      <tr>
                        <td><code>MinLength/MaxLength</code></td>
                        <td>String length constraints</td>
                      </tr>
                      <tr>
                        <td><code>Email</code></td>
                        <td>Valid email format</td>
                      </tr>
                      <tr>
                        <td><code>Range</code></td>
                        <td>Number within bounds</td>
                      </tr>
                      <tr>
                        <td><code>Regex</code></td>
                        <td>Match pattern</td>
                      </tr>
                      <tr>
                        <td><code>Custom</code></td>
                        <td>Business-specific rules</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dependency Injection */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">💉 Dependency Injection (DI)</h3>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-4">
              How frameworks manage object creation and dependencies between components.
            </p>

            <div className="alert alert-info mb-4" role="alert">
              <h5 className="alert-heading">🎓 What is DI?</h5>
              <p className="mb-2">Instead of creating dependencies inside a class:</p>
              <code>class ItemsService {'{ repo = new ItemsRepository() }'}</code>
              <p className="mt-2 mb-2">Dependencies are <strong>"injected"</strong> from outside:</p>
              <code>class ItemsService {'{ constructor(repo: ItemsRepository) }'}</code>
              <p className="mb-0 mt-2"><strong>Benefits:</strong> Easier testing, loose coupling, flexibility</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-primary">
                  <div className="card-header bg-primary text-white">
                    <strong>.NET Core DI (Built-in)</strong>
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Register services in <code>Program.cs</code>:</p>
                    <pre className="mb-3"><code>{`// Register services
builder.Services.AddScoped<IItemsService, ItemsService>();
builder.Services.AddScoped<IItemsRepository, ItemsRepository>();`}</code></pre>
                    <p className="small mb-2">Use in controllers:</p>
                    <pre className="mb-0"><code>{`public class ItemsController : ControllerBase {
  private readonly IItemsService _service;
  
  public ItemsController(IItemsService service) {
    _service = service; // Automatically injected
  }
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-success">
                  <div className="card-header bg-success text-white">
                    <strong>Spring Boot DI (Built-in)</strong>
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Use <code>@Autowired</code> or constructor injection:</p>
                    <pre className="mb-3"><code>{`@RestController
public class ItemsController {
  
  private final ItemsService service;
  
  @Autowired
  public ItemsController(ItemsService service) {
    this.service = service; // Auto-injected
  }
}`}</code></pre>
                    <p className="small mb-2">Service marked with <code>@Service</code>:</p>
                    <pre className="mb-0"><code>{`@Service
public class ItemsService {
  // Spring manages lifecycle
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-warning">
                  <div className="card-header bg-warning text-dark">
                    <strong>This Project (Manual/Fastify)</strong>
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Simple export pattern:</p>
                    <pre className="mb-3"><code>{`// repo.ts
export const itemsRepository = {
  list: async () => { /* ... */ }
};

// service.ts
import { itemsRepository } from './repo';

export const itemsService = {
  listItems: async () => {
    return itemsRepository.list();
  }
};`}</code></pre>
                    <p className="small mb-0 text-muted">
                      For larger apps, consider using a DI container like <code>awilix</code> or <code>inversify</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-danger">
                  <div className="card-header bg-danger text-white">
                    <strong>Ruby on Rails (Convention)</strong>
                  </div>
                  <div className="card-body">
                    <p className="small mb-2">Rails doesn't enforce DI, but uses conventions:</p>
                    <pre className="mb-3"><code>{`class ItemsController < ApplicationController
  def index
    # Models are globally available
    @items = Item.all
  end
end

# For services, manual injection:
class ItemsController < ApplicationController
  def initialize
    @service = ItemsService.new
  end
end`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">⚠️ Error Handling</h3>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-4">
              How different stacks handle and report errors to API clients.
            </p>

            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th>Stack</th>
                    <th>Error Handling Approach</th>
                    <th>Response Format</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge bg-warning text-dark">This Project</span></td>
                    <td>
                      <strong>Fastify Error Handler</strong><br/>
                      <small>Centralized error handler plugin maps errors to Problem Details</small>
                    </td>
                    <td>
                      <pre className="mb-0 small"><code>{`{
  "type": "...",
  "title": "Validation Failed",
  "status": 400,
  "traceId": "...",
  "errors": [...]
}`}</code></pre>
                    </td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-primary">.NET</span></td>
                    <td>
                      <strong>ProblemDetails (Built-in)</strong><br/>
                      <small>RFC 7807 standard, exception middleware</small>
                    </td>
                    <td>
                      <pre className="mb-0 small"><code>{`{
  "type": "...",
  "title": "One or more validation errors",
  "status": 400,
  "errors": {
    "Name": ["Required"]
  }
}`}</code></pre>
                    </td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-success">Java Spring</span></td>
                    <td>
                      <strong>@ControllerAdvice</strong><br/>
                      <small>Global exception handler with @ExceptionHandler</small>
                    </td>
                    <td>
                      <pre className="mb-0 small"><code>{`{
  "timestamp": "...",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/items"
}`}</code></pre>
                    </td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-danger">Rails</span></td>
                    <td>
                      <strong>rescue_from</strong><br/>
                      <small>Controller-level or application-level error handling</small>
                    </td>
                    <td>
                      <pre className="mb-0 small"><code>{`{
  "error": "Validation failed",
  "details": {
    "name": ["can't be blank"]
  }
}`}</code></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert alert-success mt-4" role="alert">
              <h5 className="alert-heading">✅ Best Practices (All Stacks)</h5>
              <ol className="mb-0">
                <li><strong>Consistent format:</strong> All errors have the same shape</li>
                <li><strong>Include trace IDs:</strong> Correlate errors with logs</li>
                <li><strong>Appropriate status codes:</strong> 400 for validation, 404 for not found, 500 for server errors</li>
                <li><strong>Clear messages:</strong> Help developers understand what went wrong</li>
                <li><strong>Hide sensitive details:</strong> Don't leak stack traces in production</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Comparison */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">🧪 Testing Frameworks</h3>
          </div>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Stack</th>
                    <th>Unit Testing</th>
                    <th>Integration Testing</th>
                    <th>Mocking</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge bg-warning text-dark">Node.js</span></td>
                    <td>Jest, Vitest, Node:test</td>
                    <td>Supertest, Playwright</td>
                    <td>Jest mocks, Sinon</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-primary">.NET</span></td>
                    <td>xUnit, NUnit, MSTest</td>
                    <td>WebApplicationFactory</td>
                    <td>Moq, NSubstitute</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-success">Java</span></td>
                    <td>JUnit 5, TestNG</td>
                    <td>Spring Test, RestAssured</td>
                    <td>Mockito, EasyMock</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-danger">Ruby</span></td>
                    <td>RSpec, Minitest</td>
                    <td>RSpec, Capybara</td>
                    <td>RSpec mocks, WebMock</td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-info text-dark">Python</span></td>
                    <td>pytest, unittest</td>
                    <td>Django TestCase, pytest</td>
                    <td>unittest.mock, responses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="mb-5">
        <div className="card border-0 shadow-lg" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div className="card-body p-5 text-white">
            <h3 className="h4 fw-bold mb-4">🎓 Your Learning Path</h3>
            
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card bg-white bg-opacity-10 border-0 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">1️⃣ Start Here</h5>
                    <p className="card-text small">
                      Pick ONE stack and build a simple CRUD app. Don't try to learn everything at once.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-white bg-opacity-10 border-0 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">2️⃣ Understand Concepts</h5>
                    <p className="card-text small">
                      Learn the WHY behind routing, ORMs, validation, etc. These concepts transfer across all stacks.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-white bg-opacity-10 border-0 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">3️⃣ Compare & Contrast</h5>
                    <p className="card-text small">
                      Use this guide to see how other stacks solve the same problems. You'll learn faster!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
              <p className="mb-2"><strong>💡 Pro Tip:</strong></p>
              <p className="mb-0">
                When learning a new framework, ask yourself: "How does this handle routing? How does it access the database? 
                How does it validate input?" You already know the concepts—you're just learning new syntax!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section>
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 pt-4 px-4">
            <h3 className="h4 mb-0">📚 Quick Reference: Architecture Terminology</h3>
          </div>
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <h5 className="fw-semibold mb-3">Frontend Terms</h5>
                <dl className="row small">
                  <dt className="col-sm-4">SPA</dt>
                  <dd className="col-sm-8">Single Page Application (React, Vue, Angular)</dd>
                  
                  <dt className="col-sm-4">SSR</dt>
                  <dd className="col-sm-8">Server-Side Rendering (Next.js, Nuxt)</dd>
                  
                  <dt className="col-sm-4">Component</dt>
                  <dd className="col-sm-8">Reusable UI piece</dd>
                  
                  <dt className="col-sm-4">State</dt>
                  <dd className="col-sm-8">Data that changes over time in UI</dd>
                </dl>
              </div>

              <div className="col-md-6">
                <h5 className="fw-semibold mb-3">Backend Terms</h5>
                <dl className="row small">
                  <dt className="col-sm-4">API</dt>
                  <dd className="col-sm-8">Application Programming Interface</dd>
                  
                  <dt className="col-sm-4">REST</dt>
                  <dd className="col-sm-8">Representational State Transfer (HTTP-based)</dd>
                  
                  <dt className="col-sm-4">Middleware</dt>
                  <dd className="col-sm-8">Code that runs before/after route handlers</dd>
                  
                  <dt className="col-sm-4">ORM</dt>
                  <dd className="col-sm-8">Object-Relational Mapper (database abstraction)</dd>
                </dl>
              </div>

              <div className="col-md-6">
                <h5 className="fw-semibold mb-3">Architecture Patterns</h5>
                <dl className="row small">
                  <dt className="col-sm-4">MVC</dt>
                  <dd className="col-sm-8">Model-View-Controller</dd>
                  
                  <dt className="col-sm-4">Repository</dt>
                  <dd className="col-sm-8">Data access abstraction layer</dd>
                  
                  <dt className="col-sm-4">Service Layer</dt>
                  <dd className="col-sm-8">Business logic layer</dd>
                  
                  <dt className="col-sm-4">DTO</dt>
                  <dd className="col-sm-8">Data Transfer Object (API contracts)</dd>
                </dl>
              </div>

              <div className="col-md-6">
                <h5 className="fw-semibold mb-3">Common Concepts</h5>
                <dl className="row small">
                  <dt className="col-sm-4">DI</dt>
                  <dd className="col-sm-8">Dependency Injection</dd>
                  
                  <dt className="col-sm-4">IoC</dt>
                  <dd className="col-sm-8">Inversion of Control</dd>
                  
                  <dt className="col-sm-4">CRUD</dt>
                  <dd className="col-sm-8">Create, Read, Update, Delete</dd>
                  
                  <dt className="col-sm-4">JWT</dt>
                  <dd className="col-sm-8">JSON Web Token (authentication)</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
