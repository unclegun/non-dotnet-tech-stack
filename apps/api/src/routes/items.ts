import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/db.js';
import { validate } from '../lib/validate.js';

const CreateItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
});

export default async function itemsRoutes(fastify: FastifyInstance) {
  // GET /items - List all items
  fastify.get('/items', async (request, reply) => {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: items,
      count: items.length,
    };
  });

  // POST /items - Create a new item
  fastify.post('/items', async (request, reply) => {
    const data = validate(CreateItemSchema, request.body);

    const item = await prisma.item.create({
      data: {
        name: data.name,
      },
    });

    reply.code(201);
    return {
      data: item,
      message: 'Item created successfully',
    };
  });
}
