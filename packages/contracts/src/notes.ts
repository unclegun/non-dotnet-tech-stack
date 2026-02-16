import { z } from 'zod';

/**
 * Note DTO - matches database model
 */
export const NoteDtoSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
});

export type NoteDto = z.infer<typeof NoteDtoSchema>;

/**
 * Create Note Request Body
 */
export const CreateNoteBodySchema = z.object({
  content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
});

export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>;

/**
 * List Notes Query Parameters
 */
export const ListNotesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
});

export type ListNotesQuery = z.infer<typeof ListNotesQuerySchema>;

/**
 * List Notes Response
 */
export const ListNotesResponseSchema = z.object({
  notes: z.array(NoteDtoSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});

export type ListNotesResponse = z.infer<typeof ListNotesResponseSchema>;
