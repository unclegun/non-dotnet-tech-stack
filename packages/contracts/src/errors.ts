import { z } from 'zod';

/**
 * Problem Details for HTTP APIs (RFC 7807 inspired)
 * Used for consistent error responses across the API
 */
export const ProblemDetailsSchema = z.object({
  type: z.string().url().optional(),
  title: z.string(),
  status: z.number().int(),
  detail: z.string().optional(),
  instance: z.string().optional(),
  traceId: z.string().optional(),
});

export type ProblemDetails = z.infer<typeof ProblemDetailsSchema>;
