'use client';

import { useState, FormEvent } from 'react';
import { apiClient } from '@/lib/apiClient';

export default function ItemForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await apiClient.createItem({ name });
      setSuccess('Item created successfully!');
      setName('');
      
      // Refresh the page to show new item
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
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
          <label htmlFor="itemName" className="form-label fw-semibold">Item Name</label>
          <input
            id="itemName"
            type="text"
            className="form-control form-control-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name..."
            disabled={loading}
            required
            minLength={1}
            maxLength={200}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary btn-lg w-100" 
          disabled={loading || !name.trim()}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creating...
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>
              Create Item
            </>
          )}
        </button>
      </form>
    </div>
  );
}
