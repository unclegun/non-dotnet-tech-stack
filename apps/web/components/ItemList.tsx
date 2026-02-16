import { apiClient } from '@/lib/apiClient';
import { ItemDto } from '@test-stack/contracts';

export default async function ItemList() {
  let items: ItemDto[] = [];
  let error: string | null = null;

  try {
    const response = await apiClient.listItems();
    items = response.items;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load items';
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Items</h5>
        <p className="mb-0">{error}</p>
        <hr />
        <p className="mb-0 small">Make sure the API server is running on port 3001</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-inbox mb-3" viewBox="0 0 16 16">
            <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
          </svg>
          <p className="mb-0">No items yet. Create one above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-group">
      {items.map((item) => (
        <div key={item.id} className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h6 className="mb-0 fw-semibold">{item.name}</h6>
            <small className="text-muted">
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
