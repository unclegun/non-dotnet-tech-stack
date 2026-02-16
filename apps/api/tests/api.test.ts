import { test, describe } from 'node:test';
import assert from 'node:assert';

/**
 * API Integration Tests
 * 
 * These tests boot the actual server and make real HTTP requests.
 * They validate:
 * - API contract compliance
 * - End-to-end request flow
 * - Error handling
 * - Middleware pipeline
 * 
 * Why integration tests?
 * - Catch issues that unit tests miss (routing, serialization, etc.)
 * - Validate the full stack works together
 * - Test from consumer perspective
 * 
 * Trade-offs:
 * - Slower than unit tests
 * - Need database (could use test DB or in-memory)
 * - More brittle
 * 
 * When to use:
 * - Critical user flows
 * - After refactoring
 * - Before deployment
 */

const API_URL = process.env.TEST_API_URL || 'http://localhost:3001';

describe('API Integration Tests', () => {
  test('GET /health returns 200', async () => {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.status, 'ok');
    assert.ok(data.timestamp);
  });

  test('POST /items creates item and GET /items returns it', async () => {
    const testItemName = `Test Item ${Date.now()}`;

    // Create item
    const createResponse = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: testItemName }),
    });

    assert.strictEqual(createResponse.status, 201);
    const createdItem = await createResponse.json();
    assert.ok(createdItem.id);
    assert.strictEqual(createdItem.name, testItemName);
    assert.ok(createdItem.createdAt);

    // List items and verify it exists
    const listResponse = await fetch(`${API_URL}/items`);
    assert.strictEqual(listResponse.status, 200);
    
    const listData = await listResponse.json();
    assert.ok(Array.isArray(listData.items));
    assert.ok(listData.items.length > 0);
    assert.ok(typeof listData.total === 'number');
    
    // Find our created item
    const foundItem = listData.items.find((item: any) => item.id === createdItem.id);
    assert.ok(foundItem, 'Created item should appear in list');
    assert.strictEqual(foundItem.name, testItemName);
  });

  test('POST /items with invalid data returns 400', async () => {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }), // Empty name should fail
    });

    assert.strictEqual(response.status, 400);
    const error = await response.json();
    assert.strictEqual(error.status, 400);
    assert.ok(error.traceId, 'Error should include traceId');
  });

  test('GET /items supports pagination', async () => {
    const response = await fetch(`${API_URL}/items?page=1&pageSize=2`);
    assert.strictEqual(response.status, 200);
    
    const data = await response.json();
    assert.ok(data.items.length <= 2, 'Should respect pageSize');
    assert.strictEqual(data.page, 1);
    assert.strictEqual(data.pageSize, 2);
  });

  test('GET /items supports search', async () => {
    // Create a uniquely named item
    const uniqueName = `Searchable-${Date.now()}`;
    await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: uniqueName }),
    });

    // Search for it
    const response = await fetch(`${API_URL}/items?q=${uniqueName}`);
    const data = await response.json();
    
    assert.ok(data.items.some((item: any) => item.name === uniqueName));
  });
});
