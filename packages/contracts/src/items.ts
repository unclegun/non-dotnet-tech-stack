import { z } from 'zod';

/**
 * Item DTO - matches database model
 */
export const ItemDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
});

export type ItemDto = z.infer<typeof ItemDtoSchema>;

/**
 * Create Item Request Body
 */
export const CreateItemBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
});

export type CreateItemBody = z.infer<typeof CreateItemBodySchema>;

/**
 * List Items Query Parameters
 */
export const ListItemsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
});

export type ListItemsQuery = z.infer<typeof ListItemsQuerySchema>;

/**
 * List Items Response
 */
export const ListItemsResponseSchema = z.object({
  items: z.array(ItemDtoSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});

export type ListItemsResponse = z.infer<typeof ListItemsResponseSchema>;
