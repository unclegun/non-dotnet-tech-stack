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
      <div className="error-message">
        <strong>Error:</strong> {error}
        <br />
        <small>Make sure the API server is running on port 3001</small>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-muted text-center" style={{ padding: '2rem' }}>
        No notes yet. Create one above!
      </div>
    );
  }

  return (
    <ul className="item-list">
      {notes.map((note) => (
        <li key={note.id}>
          <span className="item-name">{note.content}</span>
          <span className="item-date">
            {new Date(note.createdAt).toLocaleDateString('en-US', {
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
