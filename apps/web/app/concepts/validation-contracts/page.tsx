export default function ValidationContractsPage() {
  return (
    <main className="container py-5">
      <div className="card border-0 shadow-lg mb-4 overflow-hidden">
        <div className="card-body p-5" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <h1 className="display-5 fw-bold text-white mb-3">✅ Validation Strategy & Contract-First Thinking</h1>
          <p className="lead text-white mb-0 opacity-75">
            Ensuring data integrity across your frontend and backend
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
              <li><strong>JSON:</strong> Format for sending data over HTTP (e.g., <code>{`{"name": "value"}`}</code>)</li>
              <li><strong>Types:</strong> Different kinds of data (string, number, boolean, etc.)</li>
              <li><strong>API requests:</strong> Frontend sends data → Backend processes → Response</li>
            </ul>
            <div className="alert alert-light border mt-3 mb-0">
              <small><strong>New to APIs?</strong> Check out the <a href="/getting-started">Getting Started Guide</a> first!</small>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">
              <i className="bi bi-bug-fill text-danger me-2"></i>
              The Problem: Why We Need Validation
            </h2>
            
            <div className="alert alert-danger mb-4">
              <h5 className="fw-bold">❌ Without Validation:</h5>
              <p className="mb-2">Your API accepts whatever data clients send. This causes:</p>
              <ul className="mb-0">
                <li>Database errors from invalid data formats</li>
                <li>Security vulnerabilities from malicious input</li>
                <li>Confusing bugs because frontend and backend disagree on data shape</li>
                <li>Production crashes from null/undefined values</li>
              </ul>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card bg-light border-danger h-100">
                  <div className="card-header bg-danger text-white fw-bold">
                    <i className="bi bi-x-circle me-2"></i>Bad: No Validation
                  </div>
                  <div className="card-body">
                    <pre className="mb-0 small">{`// Backend just trusts the input
const name = request.body.name;
await db.items.create({ name });

// What if name is:
// - undefined?
// - an empty string?
// - 10,000 characters long?
// - a SQL injection attempt?

// 💥 Runtime crash or security issue`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-light border-success h-100">
                  <div className="card-header bg-success text-white fw-bold">
                    <i className="bi bi-check-circle me-2"></i>Good: With Validation
                  </div>
                  <div className="card-body">
                    <pre className="mb-0 small">{`// Backend validates first
const body = CreateItemBodySchema.parse(
  request.body
);

// Zod guarantees:
// ✓ name exists
// ✓ name is a string
// ✓ name length: 1-200 characters
// ✓ No unexpected fields

await db.items.create(body);`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info">
              <strong>💡 Key Principle:</strong> <em>"Never trust user input."</em> Always validate data 
              at the boundary (when it enters your system), even if you control the frontend.
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">
              <i className="bi bi-lightbulb-fill text-success me-2"></i>
              The Solution: Shared Contracts
            </h2>
            
            <p className="lead mb-4">
              Define the API "contract" ONCE using <strong>Zod schemas</strong> in a shared package.
              Both frontend and backend import these contracts, ensuring they always agree.
            </p>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">
                      <span className="badge bg-warning text-dark me-2">📦</span>
                      Project Structure
                    </h5>
                    <pre className="mb-0">{`monorepo/
├── packages/
│   └── contracts/          ← Shared types
│       └── src/
│           ├── items.ts    ← Item schemas
│           ├── notes.ts    ← Note schemas
│           └── errors.ts   ← Error formats
├── apps/
│   ├── api/                ← Backend
│   │   └── imports from @repo/contracts
│   └── web/                ← Frontend
│       └── imports from @repo/contracts`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">
                      <span className="badge bg-primary me-2">🔄</span>
                      The Flow
                    </h5>
                    <ol className="mb-0">
                      <li className="mb-2">
                        <strong>Define Contract:</strong> Write Zod schema in <code>contracts/</code>
                      </li>
                      <li className="mb-2">
                        <strong>Backend Import:</strong> Use schema to validate requests
                      </li>
                      <li className="mb-2">
                        <strong>Frontend Import:</strong> Use TypeScript types for type safety
                      </li>
                      <li className="mb-0">
                        <strong>Both Stay in Sync:</strong> Change contract once, both apps update
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success">
              <strong>✓ Single Source of Truth:</strong> The contract package is the ONE PLACE where 
              API data structures are defined. No more "frontend expects X but backend sends Y."
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
              Validation in Other Frameworks
            </h2>
            <p className="mb-4">
              Every framework has validation libraries. The concept is universal: define rules, check input, reject if invalid.
            </p>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Framework</th>
                    <th>Validation Library</th>
                    <th>Approach</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Fastify (Node.js)</strong></td>
                    <td><span className="badge bg-info">Zod</span></td>
                    <td>Runtime schema validation with TypeScript inference</td>
                  </tr>
                  <tr>
                    <td><strong>ASP.NET Core</strong></td>
                    <td><span className="badge bg-primary">Data Annotations / FluentValidation</span></td>
                    <td>Attributes on model classes, automatic validation</td>
                  </tr>
                  <tr>
                    <td><strong>Spring Boot</strong></td>
                    <td><span className="badge bg-success">javax.validation (Bean Validation)</span></td>
                    <td>Annotations like <code>@NotNull</code>, <code>@Size</code></td>
                  </tr>
                  <tr>
                    <td><strong>Ruby on Rails</strong></td>
                    <td><span className="badge bg-danger">ActiveModel Validations</span></td>
                    <td>Built into models: <code>validates :name, presence: true</code></td>
                  </tr>
                  <tr>
                    <td><strong>Django</strong></td>
                    <td><span className="badge bg-warning text-dark">Django Forms / Serializers</span></td>
                    <td>Form/serializer classes with field validators</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Zod (This Stack)</h5>
                    <pre className="mb-0 small">{`import { z } from 'zod';

const CreateItemSchema = z.object({
  name: z.string()
    .min(1, "Name required")
    .max(200, "Too long"),
  price: z.number().positive()
});

// Use it
const item = CreateItemSchema.parse(data);`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">FluentValidation (.NET)</h5>
                    <pre className="mb-0 small">{`public class CreateItemValidator 
  : AbstractValidator<CreateItemDto>
{
  public CreateItemValidator()
  {
    RuleFor(x => x.Name)
      .NotEmpty()
      .MaximumLength(200);
    RuleFor(x => x.Price)
      .GreaterThan(0);
  }
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Bean Validation (Spring Boot)</h5>
                    <pre className="mb-0 small">{`public class CreateItemDto {
  @NotBlank(message = "Name required")
  @Size(max = 200, message = "Too long")
  private String name;

  @Positive
  private BigDecimal price;
  
  // getters, setters...
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-light border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">ActiveRecord (Rails)</h5>
                    <pre className="mb-0 small">{`class Item < ApplicationRecord
  validates :name, 
    presence: true,
    length: { maximum: 200 }
  validates :price, 
    numericality: { 
      greater_than: 0 
    }
end`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success mt-4">
              <strong>🎯 Universal Pattern:</strong> Define rules → Validate input → Return errors or continue
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-3">
              <i className="bi bi-code-slash me-2"></i>
              Code Deep Dive: Item Contract
            </h2>
            
            <div className="accordion" id="contractAccordion">
              {/* Step 1: Define Contract */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#defineContract">
                    <span className="badge bg-primary me-2">1</span>
                    Define the Contract (Shared Package)
                  </button>
                </h3>
                <div id="defineContract" className="accordion-collapse collapse show" data-bs-parent="#contractAccordion">
                  <div className="accordion-body">
                    <p className="mb-3">
                      <strong>Location:</strong> <code>packages/contracts/src/items.ts</code>
                    </p>
                    <pre className="bg-dark text-white p-3 rounded">{`import { z } from 'zod';

// Schema for creating a new item
export const CreateItemBodySchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(200, "Name must be 200 characters or less"),
});

// TypeScript type inferred from schema
export type CreateItemBody = z.infer<typeof CreateItemBodySchema>;

// Schema for the item returned by API
export const ItemDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
});

export type ItemDto = z.infer<typeof ItemDtoSchema>;`}</pre>
                    <div className="alert alert-info mt-3">
                      <strong>💡 Why Zod?</strong> It provides both runtime validation AND TypeScript types from a single definition.
                      No need to write types twice!
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Backend Usage */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#backendUsage">
                    <span className="badge bg-success me-2">2</span>
                    Backend Validates with Schema
                  </button>
                </h3>
                <div id="backendUsage" className="accordion-collapse collapse" data-bs-parent="#contractAccordion">
                  <div className="accordion-body">
                    <p className="mb-3">
                      <strong>Location:</strong> <code>apps/api/src/modules/items/routes.ts</code>
                    </p>
                    <pre className="bg-dark text-white p-3 rounded">{`import { CreateItemBodySchema, ItemDto } from '@repo/contracts';

export async function itemRoutes(fastify: FastifyInstance) {
  fastify.post('/items', async (request, reply) => {
    // Parse and validate - throws ZodError if invalid
    const body = CreateItemBodySchema.parse(request.body);
    
    // TypeScript knows body is { name: string }
    // All validation rules passed ✓
    
    const item = await itemsService.createItem(body);
    reply.code(201);
    return item; // Automatically matches ItemDto
  });
}`}</pre>
                    <div className="alert alert-warning mt-3">
                      <strong>What happens on validation failure?</strong>
                      <ul className="mb-0 mt-2">
                        <li><code>.parse()</code> throws a <code>ZodError</code></li>
                        <li>Error handler catches it</li>
                        <li>Returns HTTP 400 with validation details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Frontend Usage */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#frontendUsage">
                    <span className="badge bg-info me-2">3</span>
                    Frontend Uses Types for Safety
                  </button>
                </h3>
                <div id="frontendUsage" className="accordion-collapse collapse" data-bs-parent="#frontendUsage">
                  <div className="accordion-body">
                    <p className="mb-3">
                      <strong>Location:</strong> <code>apps/web/lib/apiClient.ts</code>
                    </p>
                    <pre className="bg-dark text-white p-3 rounded">{`import { CreateItemBody, ItemDto } from '@repo/contracts';

class ApiClient {
  async createItem(body: CreateItemBody): Promise<ItemDto> {
    // TypeScript forces body to match CreateItemBody
    return this.request<ItemDto>('/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }
}

// Usage in React component:
const handleSubmit = async (name: string) => {
  const item = await apiClient.createItem({ name });
  // TypeScript knows item is ItemDto
  console.log(item.id, item.name, item.createdAt);
};`}</pre>
                    <div className="alert alert-success mt-3">
                      <strong>✓ Type Safety:</strong> If you try to call <code>createItem({`{ price: 100 }`})</code>, 
                      TypeScript will error—it expects <code>{`{ name: string }`}</code>.
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
            <h2 className="h3 fw-semibold mb-4">Common Validation Patterns</h2>
            
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card border-primary h-100">
                  <div className="card-header bg-primary text-white fw-bold">
                    String Validation
                  </div>
                  <div className="card-body">
                    <pre className="mb-0 small">{`z.string()
  .min(1, "Required")
  .max(200, "Too long")
  .email("Invalid email")
  .url("Invalid URL")
  .regex(/^[A-Z]+$/, "Uppercase only")`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-success h-100">
                  <div className="card-header bg-success text-white fw-bold">
                    Number Validation
                  </div>
                  <div className="card-body">
                    <pre className="mb-0 small">{`z.number()
  .int("Must be integer")
  .positive("Must be > 0")
  .min(1, "At least 1")
  .max(100, "At most 100")`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-info h-100">
                  <div className="card-header bg-info text-white fw-bold">
                    Optional Fields
                  </div>
                  <div className="card-body">
                    <pre className="mb-0 small">{`z.object({
  name: z.string(),
  description: z.string().optional(),
  age: z.number().nullable(),
  tags: z.array(z.string()).default([])
})`}</pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-warning h-100">
                  <div className="card-header bg-warning text-dark fw-bold">
                    Nested Objects
                  </div>
                  <div className="card-body">
                    <pre className="mb-0 small">{`z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  items: z.array(ItemSchema)
})`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm bg-light">
          <div className="card-body p-4">
            <h2 className="h3 fw-semibold mb-4">
              <i className="bi bi-star-fill text-warning me-2"></i>
              Why This Approach Rocks
            </h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <span className="badge bg-success rounded-circle p-2">✓</span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-bold">Type Safety (Compile-Time)</h5>
                    <p className="mb-0 small text-muted">
                      TypeScript catches errors before you even run the code. Try to pass the wrong data shape? 
                      Red squiggly lines immediately.
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
                    <h5 className="fw-bold">Runtime Validation</h5>
                    <p className="mb-0 small text-muted">
                      Even if malicious users bypass the frontend, the backend validates every request.
                      Invalid data gets rejected with clear error messages.
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
                    <h5 className="fw-bold">Self-Documenting API</h5>
                    <p className="mb-0 small text-muted">
                      The Zod schema IS the documentation. Want to know what fields are required? 
                      Read the schema—it's the single source of truth.
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
                    <h5 className="fw-bold">Easy to Version</h5>
                    <p className="mb-0 small text-muted">
                      Add <code>CreateItemBodyV2Schema</code> without breaking existing clients. 
                      Support multiple API versions easily.
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
                    <h5 className="fw-bold">Refactoring Confidence</h5>
                    <p className="mb-0 small text-muted">
                      Change a field type? TypeScript shows you EVERY place that needs updating. 
                      No more runtime surprises.
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
                    <h5 className="fw-bold">Team Alignment</h5>
                    <p className="mb-0 small text-muted">
                      Frontend and backend developers use the same types. No more "wait, what fields does this endpoint expect?"
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
              Test validation by sending valid and invalid requests to the API:
            </p>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">✅ Valid Request:</h5>
              <pre className="bg-black p-3 rounded text-success">{`curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Item"}'

# Response: 201 Created
# {
#   "id": 1,
#   "name": "My Item",
#   "createdAt": "2024-01-15T10:30:00Z"
# }`}</pre>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">❌ Invalid Request (empty name):</h5>
              <pre className="bg-black p-3 rounded text-danger">{`curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": ""}'

# Response: 400 Bad Request
# {
#   "error": "Validation failed",
#   "issues": [
#     {
#       "path": ["name"],
#       "message": "Name is required"
#     }
#   ]
# }`}</pre>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">❌ Invalid Request (missing field):</h5>
              <pre className="bg-black p-3 rounded text-danger">{`curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{}'

# Response: 400 Bad Request
# {
#   "error": "Validation failed",
#   "issues": [
#     {
#       "path": ["name"],
#       "message": "Required"
#     }
#   ]
# }`}</pre>
            </div>

            <div className="alert alert-info mb-0">
              <strong><i className="bi bi-lightbulb me-2"></i>Notice:</strong> 
              The error response includes exactly which field failed and why. This makes debugging easy!
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm border-start border-4 border-warning">
          <div className="card-body p-4">
            <h2 className="h4 fw-semibold mb-4">
              <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
              Validation Best Practices
            </h2>
            
            <div className="row g-3">
              <div className="col-12">
                <div className="alert alert-success">
                  <strong>DO:</strong> Validate at the boundary (API entry point) before business logic runs
                </div>
              </div>
              <div className="col-12">
                <div className="alert alert-success">
                  <strong>DO:</strong> Use the same validation rules on frontend and backend for better UX
                </div>
              </div>
              <div className="col-12">
                <div className="alert alert-success">
                  <strong>DO:</strong> Return specific error messages that tell users how to fix the problem
                </div>
              </div>
              <div className="col-12">
                <div className="alert alert-danger">
                  <strong>DON'T:</strong> Skip backend validation even if frontend validates—never trust client-side code
                </div>
              </div>
              <div className="col-12">
                <div className="alert alert-danger">
                  <strong>DON'T:</strong> Validate in the database layer—by then it's too late for good error handling
                </div>
              </div>
              <div className="col-12">
                <div className="alert alert-danger">
                  <strong>DON'T:</strong> Return generic "Bad Request" errors—be specific about what's wrong
                </div>
              </div>
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
                      <p className="text-muted small mb-0">What happens when validation fails? Learn error formatting</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="/concepts/data-access" className="text-decoration-none">
                  <div className="card h-100 hover-lift border-primary">
                    <div className="card-body">
                      <h5 className="fw-bold text-dark">Data Access <i className="bi bi-arrow-right"></i></h5>
                      <p className="text-muted small mb-0">After validation passes, how do we save to the database?</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="/concepts/testing" className="text-decoration-none">
                  <div className="card h-100 hover-lift border-success">
                    <div className="card-body">
                      <h5 className="fw-bold text-dark">Testing <i className="bi bi-arrow-right"></i></h5>
                      <p className="text-muted small mb-0">Write tests to ensure validation rules work correctly</p>
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

      </section>
    </main>
  );
}
