
import React, { useState } from 'react';
import { Heart, Users, Plus, Trash2, Link2, Unlink2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiServices';
import { UserForm } from './UserForm';

export const UserPanel: React.FC = () => {
  const { users, selectedUser, setSelectedUser, refreshUsers, addToast } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [linkTargetId, setLinkTargetId] = useState<string>('');

  const handleCreateUser = async (data: any) => {
    try {
      await apiService.createUser(data);
      addToast('success', 'User created successfully');
      await refreshUsers();
      setShowForm(false);
    } catch (err) {
      addToast('error', (err as Error).message);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    if (!window.confirm('Are you sure?')) return;
    try {
      await apiService.deleteUser(selectedUser.id);
      addToast('success', 'User deleted');
      setSelectedUser(null);
      await refreshUsers();
    } catch (err) {
      addToast('error', (err as Error).message);
    }
  };

  const handleLinkUser = async () => {
    if (!selectedUser || !linkTargetId) return;
    try {
      await apiService.linkUsers(selectedUser.id, linkTargetId);
      addToast('success', 'Users linked');
      setLinkTargetId('');
      await refreshUsers();
      const updated = users.find(u => u.id === selectedUser.id);
      if (updated) setSelectedUser(updated);
    } catch (err) {
      addToast('error', (err as Error).message);
    }
  };

  const handleUnlinkUser = async (friendId: string) => {
  if (!selectedUser) return;
  
  try {
    console.log(`Unlinking ${selectedUser.id} from ${friendId}`);
    await apiService.unlinkUsers(selectedUser.id, friendId);
    addToast('success', 'Users unlinked successfully');
    
    await refreshUsers();
    
    const updated = users.find(u => u.id === selectedUser.id);
    if (updated) {
      setSelectedUser(updated);
    }
  } catch (err) {
    console.error('Unlink error:', err);
    addToast('error', (err as Error).message);
  }
};
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2"><Users size={24} /> Users</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 text-sm"
        >
          <Plus size={18} /> New
        </button>
      </div>

      {showForm && <UserForm onSubmit={handleCreateUser} onCancel={() => setShowForm(false)} />}

      {selectedUser ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold">{selectedUser.username}</h3>
            <p className="text-sm text-gray-600">Age: {selectedUser.age}</p>
            <div className="flex items-center gap-2 mt-2 text-orange-600 font-semibold">
              <Heart size={18} /> Score: {selectedUser.popularityScore.toFixed(1)}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm">Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedUser.hobbies.map(h => (
                <span key={h} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm">Friends ({selectedUser.friends.length})</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedUser.friends.map(friendId => {
                const friend = users.find(u => u.id === friendId);
                return friend ? (
                  <div key={friendId} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                    <span className="text-xs">{friend.username}</span>
                    <button
                      onClick={() => handleUnlinkUser(friendId)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      <Unlink2 size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm">Link Friend</h4>
            <select
              value={linkTargetId}
              onChange={e => setLinkTargetId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
            >
              <option value="">Select user...</option>
              {users.map(u => (
                u.id !== selectedUser.id && !selectedUser.friends.includes(u.id) && (
                  <option key={u.id} value={u.id}>{u.username}</option>
                )
              ))}
            </select>
            <button
              onClick={handleLinkUser}
              disabled={!linkTargetId}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              <Link2 size={16} /> Link
            </button>
          </div>

          <button
            onClick={handleDeleteUser}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 text-sm">
          Click a node to select user
        </div>
      )}
    </div>
  );
};