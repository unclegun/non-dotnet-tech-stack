import { apiClient } from '@/lib/apiClient';
import { NoteDto } from '@test-stack/contracts';

export default async function NoteList() {
  let notes: NoteDto[] = [];
  let error: string | null = null;

  try {
    const response = await apiClient.listNotes();
    notes = response.notes;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load notes';
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Notes</h5>
        <p className="mb-0">{error}</p>
        <hr />
        <p className="mb-0 small">Make sure the API server is running on port 3001</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-journal-text mb-3" viewBox="0 0 16 16">
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
          </svg>
          <p className="mb-0">No notes yet. Create one above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-group">
      {notes.map((note) => (
        <div key={note.id} className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between align-items-start mb-2">
            <p className="mb-1">{note.content}</p>
          </div>
          <small className="text-muted">
            {new Date(note.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </small>
        </div>
      ))}
    </div>
  );
}
