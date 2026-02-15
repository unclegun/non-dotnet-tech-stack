import { apiClient } from '@/lib/apiClient';
import { Item } from '@/lib/types';

export default async function ItemList() {
  let items: Item[] = [];
  let error: string | null = null;

  try {
    const response = await apiClient.get<Item[]>('/items');
    items = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load items';
  }

  if (error) {
    return (
      <div className="error-message">
        <strong>Error:</strong> {error}
        <br />
        <small>Make sure the API server is running on port 3001</small>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-muted text-center" style={{ padding: '2rem' }}>
        No items yet. Create one above!
      </div>
    );
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id}>
          <span className="item-name">{item.name}</span>
          <span className="item-date">
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </li>
      ))}
    </ul>
  );
}
