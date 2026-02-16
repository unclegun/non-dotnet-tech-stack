import { itemsRepository } from './repo.js';
import { CreateItemBody, ItemDto, ListItemsQuery, ListItemsResponse } from '@test-stack/contracts';

/**
 * Items Service
 * 
 * Business logic layer - contains application-specific logic.
 * 
 * Responsibilities:
 * - Validate business rules
 * - Coordinate between multiple repos if needed
 * - Transform data models to DTOs
 * - Handle transactions
 * 
 * Why separate from routes?
 * - Routes handle HTTP concerns (parsing, validation, status codes)
 * - Services handle business logic
 * - Services can be called from multiple places (routes, jobs, CLI)
 * - Easier to test business logic in isolation
 * 
 * Pattern: Similar to Service Layer in DDD or Clean Architecture
 */

export class ItemsService {
  async listItems(query: ListItemsQuery): Promise<ListItemsResponse> {
    const { page, pageSize, q } = query;

    const { items, total } = await itemsRepository.list({
      page,
      pageSize,
      searchQuery: q,
    });

    // Transform to DTOs
    const itemDtos: ItemDto[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
    }));

    return {
      items: itemDtos,
      page,
      pageSize,
      total,
    };
  }

  async createItem(body: CreateItemBody): Promise<ItemDto> {
    const item = await itemsRepository.create(body.name);

    return {
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
    };
  }
}

// Export a singleton instance
export const itemsService = new ItemsService();
