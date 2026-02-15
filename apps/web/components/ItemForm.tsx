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
      const response = await apiClient.post('/items', { name });
      setSuccess(response.message || 'Item created successfully!');
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
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            id="itemName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name..."
            disabled={loading}
            required
            minLength={1}
            maxLength={200}
          />
        </div>
        
        <button type="submit" disabled={loading || !name.trim()}>
          {loading ? (
            <>
              <span className="loading"></span> Creating...
            </>
          ) : (
            'Create Item'
          )}
        </button>
      </form>
    </div>
  );
}
