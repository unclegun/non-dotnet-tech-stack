import { FastifyInstance } from 'fastify';
import {
  CreateItemBodySchema,
  ListItemsQuerySchema,
  ListItemsResponseSchema,
  ItemDtoSchema,
} from '@test-stack/contracts';
import { itemsService } from './service.js';

/**
 * Items Routes
 * 
 * HTTP layer - handles request/response concerns.
 * 
 * Responsibilities:
 * - Parse and validate request (query, body, params)
 * - Call service layer
 * - Set HTTP status codes
 * - Format response
 * 
 * This layer is "thin" - minimal logic, mostly delegation.
 * 
 * Pattern: Similar to Controllers in MVC or REST APIs
 */
export default async function itemsRoutes(fastify: FastifyInstance) {
  /**
   * GET /items
   * 
   * List items with pagination and optional search.
   * Query params: page, pageSize, q
   */
  fastify.get('/items', async (request, reply) => {
    // Validate query params using Zod schema from contracts
    const query = ListItemsQuerySchema.parse(request.query);

    // Delegate to service
    const response = await itemsService.listItems(query);

    // Optionally validate response shape (useful in dev)
    if (process.env.NODE_ENV === 'development') {
      ListItemsResponseSchema.parse(response);
    }

    return response;
  });

  /**
   * POST /items
   * 
   * Create a new item.
   * Body: { name: string }
   */
  fastify.post('/items', async (request, reply) => {
    // Validate request body
    const body = CreateItemBodySchema.parse(request.body);

    // Delegate to service
    const item = await itemsService.createItem(body);

    // Optionally validate response shape
    if (process.env.NODE_ENV === 'development') {
      ItemDtoSchema.parse(item);
    }

    reply.code(201);
    return item;
  });
}
