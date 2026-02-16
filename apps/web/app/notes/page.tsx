import { Suspense } from 'react';
import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';

export default function NotesPage() {
  return (
    <main>
      <h1>Notes</h1>
      <p>
        This page demonstrates the same CRUD pattern as Items, but for a different entity.
        Notice how the modular architecture (routes → service → repository) makes it easy
        to add new features without duplicating code.
      </p>

      <section>
        <h2>Create Note</h2>
        <NoteForm />
      </section>

      <section>
        <h2>All Notes</h2>
        <Suspense fallback={<div>Loading notes...</div>}>
          <NoteList />
        </Suspense>
      </section>
    </main>
  );
}
