export default function ValidationContractsPage() {
  return (
    <main>
      <h1>Validation Strategy & Contract-First Thinking</h1>
      
      <section>
        <h2>The Problem</h2>
        <p>
          In distributed systems, the frontend and backend often have different assumptions
          about data shape. This leads to runtime errors, confusing bugs, and wasted time.
        </p>
      </section>

      <section>
        <h2>The Solution: Shared Contracts</h2>
        <p>
          Define the API "contract" once using Zod schemas in a shared package.
          Both frontend and backend import these contracts.
        </p>
        <pre>{`
  packages/contracts/
    src/
      items.ts        ← ItemDto, CreateItemBody, etc.
      notes.ts        ← NoteDto, CreateNoteBody, etc.
      errors.ts       ← ProblemDetails
        `}</pre>
      </section>

      <section>
        <h2>Code Example: Item Contract</h2>
        <p>Location: <code>packages/contracts/src/items.ts</code></p>
        <pre>{`
export const CreateItemBodySchema = z.object({
  name: z.string().min(1).max(200),
});

export type CreateItemBody = z.infer<typeof CreateItemBodySchema>;
        `}</pre>
      </section>

      <section>
        <h2>Backend Usage</h2>
        <p>Location: <code>apps/api/src/modules/items/routes.ts</code></p>
        <pre>{`
fastify.post('/items', async (request, reply) => {
  // Parse and validate - throws ZodError if invalid
  const body = CreateItemBodySchema.parse(request.body);
  
  const item = await itemsService.createItem(body);
  reply.code(201);
  return item;
});
        `}</pre>
      </section>

      <section>
        <h2>Frontend Usage</h2>
        <p>Location: <code>apps/web/lib/apiClient.ts</code></p>
        <pre>{`
async createItem(body: CreateItemBody): Promise<ItemDto> {
  return this.request<ItemDto>('/items', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
        `}</pre>
        <p>
          TypeScript ensures you can't call <code>createItem</code> with the wrong shape.
          The contract is enforced at compile-time <em>and</em> runtime.
        </p>
      </section>

      <section>
        <h2>Benefits</h2>
        <ul>
          <li><strong>Type Safety:</strong> Catch errors at compile time</li>
          <li><strong>Runtime Validation:</strong> Reject bad input with clear error messages</li>
          <li><strong>Self-Documenting:</strong> Schema is the documentation</li>
          <li><strong>Easy to Version:</strong> Add new schemas without breaking old ones</li>
        </ul>
      </section>

      <section>
        <h2>Try It</h2>
        <pre>{`
# Valid request
curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Item"}'

# Invalid request (empty name)
curl -X POST http://localhost:3001/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": ""}'
        `}</pre>
        <p>The second request returns a 400 with validation details.</p>
      </section>
    </main>
  );
}
