import { prisma } from '../../lib/db.js';
import { Item } from '@prisma/client';

/**
 * Items Repository
 * 
 * Data access layer - encapsulates all database operations for Items.
 * 
 * Why a repository layer?
 * - Abstracts data access from business logic
 * - Centralizes query logic
 * - Makes testing easier (can mock the repo)
 * - Similar to Repository pattern in .NET/Java
 * 
 * When to skip this:
 * - Very simple CRUD with no business logic
 * - When Prisma queries are straightforward
 * 
 * When this helps:
 * - Complex queries with joins/aggregations
 * - Need to swap data sources (cache, search index, etc.)
 * - Want to test business logic without DB
 */

export interface ListItemsOptions {
  page: number;
  pageSize: number;
  searchQuery?: string;
}

export interface ListItemsResult {
  items: Item[];
  total: number;
}

export class ItemsRepository {
  async list(options: ListItemsOptions): Promise<ListItemsResult> {
    const { page, pageSize, searchQuery } = options;
    const skip = (page - 1) * pageSize;

    const where = searchQuery
      ? {
          name: {
            contains: searchQuery,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.item.count({ where }),
    ]);

    return { items, total };
  }

  async create(name: string): Promise<Item> {
    return prisma.item.create({
      data: { name },
    });
  }

  async findById(id: string): Promise<Item | null> {
    return prisma.item.findUnique({
      where: { id },
    });
  }
}

// Export a singleton instance
export const itemsRepository = new ItemsRepository();
