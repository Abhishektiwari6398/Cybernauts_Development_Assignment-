import { IUser } from '../types';

const API_BASE = process.env.REACT_APP_BASE_URL;

export const apiService = {
  async getAllUsers(): Promise<IUser[]> {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async createUser(data: any): Promise<IUser> {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },

  async updateUser(id: string, data: any): Promise<IUser> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  async deleteUser(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
  },

  async linkUsers(id: string, targetId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/users/${id}/link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetId }),
    });
    if (!res.ok) throw new Error('Failed to link users');
  },

  async unlinkUsers(id: string, targetId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${id}/unlink`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ targetId }),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `Failed to unlink users`);
  }
  
  return res.json();
}
};