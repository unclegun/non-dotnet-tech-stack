import Link from 'next/link';

export default function ConceptsPage() {
  return (
    <main>
      <h1>Learning Concepts</h1>
      <p>
        This section covers key architectural patterns and practices used in modern web applications.
        Each concept is backed by real code examples in this repository.
      </p>

      <section>
        <h2>Core Concepts</h2>
        <ul className="concept-list">
          <li>
            <Link href="/concepts/request-lifecycle">
              <strong>Request Lifecycle & Middleware Pipeline</strong>
              <p>How requests flow through the system from HTTP to business logic</p>
            </Link>
          </li>
          <li>
            <Link href="/concepts/validation-contracts">
              <strong>Validation Strategy & Contract-First Thinking</strong>
              <p>Using Zod for type-safe validation and shared contracts</p>
            </Link>
          </li>
          <li>
            <Link href="/concepts/error-handling">
              <strong>Error Handling Patterns</strong>
              <p>Problem Details format and centralized error handling</p>
            </Link>
          </li>
          <li>
            <Link href="/concepts/data-access">
              <strong>Data Access Patterns</strong>
              <p>Service and repository layers, when to use ORM vs raw SQL</p>
            </Link>
          </li>
          <li>
            <Link href="/concepts/observability">
              <strong>Observability Basics</strong>
              <p>Structured logging, request IDs, and performance timing</p>
            </Link>
          </li>
          <li>
            <Link href="/concepts/testing">
              <strong>Testing Strategy</strong>
              <p>Unit tests vs integration tests, what to test and when</p>
            </Link>
          </li>
        </ul>
      </section>

      <style jsx>{`
        .concept-list {
          list-style: none;
          padding: 0;
        }
        .concept-list li {
          margin: 1rem 0;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .concept-list li:hover {
          background: #f9f9f9;
        }
        .concept-list strong {
          display: block;
          margin-bottom: 0.5rem;
          color: #0070f3;
        }
        .concept-list p {
          margin: 0;
          color: #666;
        }
      `}</style>
    </main>
  );
}
