import { FastifyInstance } from 'fastify';
import {
  CreateNoteBodySchema,
  ListNotesQuerySchema,
  ListNotesResponseSchema,
  NoteDtoSchema,
} from '@test-stack/contracts';
import { notesService } from './service.js';

export default async function notesRoutes(fastify: FastifyInstance) {
  /**
   * GET /notes
   * 
   * List notes with pagination and optional search.
   */
  fastify.get('/notes', async (request, reply) => {
    const query = ListNotesQuerySchema.parse(request.query);
    const response = await notesService.listNotes(query);

    if (process.env.NODE_ENV === 'development') {
      ListNotesResponseSchema.parse(response);
    }

    return response;
  });

  /**
   * POST /notes
   * 
   * Create a new note.
   */
  fastify.post('/notes', async (request, reply) => {
    const body = CreateNoteBodySchema.parse(request.body);
    const note = await notesService.createNote(body);

    if (process.env.NODE_ENV === 'development') {
      NoteDtoSchema.parse(note);
    }

    reply.code(201);
    return note;
  });
}
