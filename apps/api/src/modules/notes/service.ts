import { notesRepository } from './repo.js';
import { CreateNoteBody, NoteDto, ListNotesQuery, ListNotesResponse } from '@test-stack/contracts';

export class NotesService {
  async listNotes(query: ListNotesQuery): Promise<ListNotesResponse> {
    const { page, pageSize, q } = query;

    const { notes, total } = await notesRepository.list({
      page,
      pageSize,
      searchQuery: q,
    });

    const noteDtos: NoteDto[] = notes.map((note) => ({
      id: note.id,
      content: note.content,
      createdAt: note.createdAt,
    }));

    return {
      notes: noteDtos,
      page,
      pageSize,
      total,
    };
  }

  async createNote(body: CreateNoteBody): Promise<NoteDto> {
    const note = await notesRepository.create(body.content);

    return {
      id: note.id,
      content: note.content,
      createdAt: note.createdAt,
    };
  }
}

export const notesService = new NotesService();
