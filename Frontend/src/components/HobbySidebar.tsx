import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HobbySidebar: React.FC = () => {
  const { users } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const allHobbies = Array.from(new Set(users.flatMap(u => u.hobbies))).sort();
  const filteredHobbies = allHobbies.filter(h => h.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h3 className="font-bold mb-4 text-sm">Hobbies</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs mb-3"
      />
      <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
        {filteredHobbies.map(hobby => (
          <span
            key={hobby}
            draggable
            onDragStart={e => e.dataTransfer?.setData('hobby', hobby)}
            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs cursor-move hover:bg-purple-200"
          >
            {hobby}
          </span>
        ))}
      </div>
    </div>
  );
};