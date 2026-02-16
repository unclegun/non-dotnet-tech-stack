import {
  ItemDto,
  CreateItemBody,
  ListItemsQuery,
  ListItemsResponse,
  NoteDto,
  CreateNoteBody,
  ListNotesQuery,
  ListNotesResponse,
  ProblemDetails,
} from '@test-stack/contracts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const problem = data as ProblemDetails;
        throw new Error(problem.detail || problem.title || 'API request failed');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Items
  async listItems(query?: Partial<ListItemsQuery>): Promise<ListItemsResponse> {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.pageSize) params.append('pageSize', query.pageSize.toString());
    if (query?.q) params.append('q', query.q);

    const endpoint = `/items${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<ListItemsResponse>(endpoint);
  }

  async createItem(body: CreateItemBody): Promise<ItemDto> {
    return this.request<ItemDto>('/items', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Notes
  async listNotes(query?: Partial<ListNotesQuery>): Promise<ListNotesResponse> {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.pageSize) params.append('pageSize', query.pageSize.toString());
    if (query?.q) params.append('q', query.q);

    const endpoint = `/notes${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<ListNotesResponse>(endpoint);
  }

  async createNote(body: CreateNoteBody): Promise<NoteDto> {
    return this.request<NoteDto>('/notes', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Health check
  async health(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
