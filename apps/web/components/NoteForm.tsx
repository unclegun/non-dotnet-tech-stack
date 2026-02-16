'use client';

import { useState, FormEvent } from 'react';
import { apiClient } from '@/lib/apiClient';

export default function NoteForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await apiClient.createNote({ content });
      setSuccess('Note created successfully!');
      setContent('');
      
      // Refresh the page to show new note
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
        </div>
      )}
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')} aria-label="Close"></button>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="noteContent" className="form-label fw-semibold">Note Content</label>
          <textarea
            id="noteContent"
            className="form-control form-control-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your note..."
            disabled={loading}
            required
            minLength={1}
            maxLength={1000}
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary btn-lg w-100" 
          disabled={loading || !content.trim()}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creating...
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>
              Create Note
            </>
          )}
        </button>
      </form>
    </div>
  );
}
