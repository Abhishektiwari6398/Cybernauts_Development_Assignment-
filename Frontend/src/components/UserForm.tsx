import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface UserFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(18);
  const [hobbies, setHobbies] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useApp();

  const handleSubmit = async () => {
    if (!username.trim()) {
      addToast('error', 'Username is required');
      return;
    }
    if (age < 0) {
      addToast('error', 'Age must be positive');
      return;
    }
    try {
      setLoading(true);
      const hobbyList = hobbies.split(',').map(h => h.trim()).filter(h => h);
      await onSubmit({ username: username.trim(), age, hobbies: hobbyList });
      setUsername('');
      setAge(18);
      setHobbies('');
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies (comma-separated)</label>
        <input
          type="text"
          value={hobbies}
          onChange={e => setHobbies(e.target.value)}
          placeholder="Reading, Gaming, Coding"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};