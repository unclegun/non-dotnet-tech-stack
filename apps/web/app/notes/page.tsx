import { Suspense } from 'react';
import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';

export default function NotesPage() {
  return (
    <main className="container py-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg mb-5" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
        <div className="card-body text-white p-5">
          <h1 className="display-4 fw-bold mb-3">📝 Notes</h1>
          <p className="lead mb-0">
            This page demonstrates the same CRUD pattern as Items, but for a different entity.
            Notice how the modular architecture (routes → service → repository) makes it easy
            to add new features without duplicating code.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Create Note Section */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="card-title h3 mb-3">
                <span className="badge bg-success rounded-pill me-2">✍️</span>
                Create Note
              </h2>
              <p className="text-muted mb-4">Add a new note to the database</p>
              <NoteForm />
            </div>
          </div>
        </div>

        {/* All Notes Section */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="card-title h3 mb-3">
                <span className="badge bg-primary rounded-pill me-2">📋</span>
                All Notes
              </h2>
              <p className="text-muted mb-4">View all notes stored in PostgreSQL</p>
              <Suspense fallback={
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading notes...</span>
                  </div>
                  <p className="text-muted mt-2">Loading notes...</p>
                </div>
              }>
                <NoteList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-5">
        <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
          <div className="card-body p-4">
            <div className="d-flex align-items-start">
              <span className="badge bg-white text-dark rounded-circle me-3 mt-1" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>💡</span>
              <div>
                <h3 className="h5 mb-2">Modular Architecture Benefits</h3>
                <p className="mb-0">
                  The Notes feature follows the exact same pattern as Items: <code className="bg-white px-2 py-1 rounded">routes → service → repository</code>.
                  This consistency makes the codebase easier to understand, test, and maintain. Adding new features becomes
                  straightforward because you're following a proven pattern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
