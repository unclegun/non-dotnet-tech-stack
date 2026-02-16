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
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="noteContent">Note Content</label>
          <textarea
            id="noteContent"
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
        
        <button type="submit" disabled={loading || !content.trim()}>
          {loading ? (
            <>
              <span className="loading"></span> Creating...
            </>
          ) : (
            'Create Note'
          )}
        </button>
      </form>
    </div>
  );
}
