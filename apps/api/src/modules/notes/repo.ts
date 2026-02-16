import { prisma } from '../../lib/db.js';
import { Note } from '@prisma/client';

export interface ListNotesOptions {
  page: number;
  pageSize: number;
  searchQuery?: string;
}

export interface ListNotesResult {
  notes: Note[];
  total: number;
}

export class NotesRepository {
  async list(options: ListNotesOptions): Promise<ListNotesResult> {
    const { page, pageSize, searchQuery } = options;
    const skip = (page - 1) * pageSize;

    const where = searchQuery
      ? {
          content: {
            contains: searchQuery,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const [notes, total] = await Promise.all([
      prisma.note.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.note.count({ where }),
    ]);

    return { notes, total };
  }

  async create(content: string): Promise<Note> {
    return prisma.note.create({
      data: { content },
    });
  }

  async findById(id: string): Promise<Note | null> {
    return prisma.note.findUnique({
      where: { id },
    });
  }
}

export const notesRepository = new NotesRepository();
