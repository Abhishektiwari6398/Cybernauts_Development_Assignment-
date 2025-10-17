import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiServices';

export const GraphVisualization: React.FC = () => {
  const { users, selectedUser, setSelectedUser, refreshUsers, addToast } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getNodeColor = (score: number): string => {
    if (score > 5) return '#10b981';
    if (score > 2) return '#3b82f6';
    return '#ef4444';
  };

  const getNodeSize = (score: number): number => {
    return 30 + Math.min(score * 5, 50);
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

  
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    for (const user of users) {
      const angle1 = (users.indexOf(user) / users.length) * Math.PI * 2;
      const x1 = centerX + Math.cos(angle1) * 120;
      const y1 = centerY + Math.sin(angle1) * 120;

      for (const friendId of user.friends) {
        const friend = users.find(u => u.id === friendId);
        if (!friend) continue;
        const angle2 = (users.indexOf(friend) / users.length) * Math.PI * 2;
        const x2 = centerX + Math.cos(angle2) * 120;
        const y2 = centerY + Math.sin(angle2) * 120;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

  
    for (const user of users) {
      const angle = (users.indexOf(user) / users.length) * Math.PI * 2;
      const nodeX = centerX + Math.cos(angle) * 120;
      const nodeY = centerY + Math.sin(angle) * 120;
      const nodeSize = getNodeSize(user.popularityScore);
      const color = getNodeColor(user.popularityScore);

      ctx.fillStyle = selectedUser?.id === user.id ? '#fbbf24' : color;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(user.username.substring(0, 5), nodeX, nodeY - 5);
      ctx.font = '10px sans-serif';
      ctx.fillText(`${user.age}y`, nodeX, nodeY + 8);
    }
  };

  useEffect(() => {
    drawGraph();
  }, [users, selectedUser]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    for (const user of users) {
      const angle = (users.indexOf(user) / users.length) * Math.PI * 2;
      const nodeX = centerX + Math.cos(angle) * 120;
      const nodeY = centerY + Math.sin(angle) * 120;
      const nodeSize = getNodeSize(user.popularityScore);
      if (Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2) < nodeSize) {
        setSelectedUser(user);
        return;
      }
    }
  };

  const handleCanvasDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const hobby = e.dataTransfer.getData('hobby');
    if (!hobby || !canvasRef.current || !selectedUser) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    if (distance < 80) {
      if (!selectedUser.hobbies.includes(hobby)) {
        try {
          const newHobbies = [...selectedUser.hobbies, hobby];
          await apiService.updateUser(selectedUser.id, { hobbies: newHobbies });
          addToast('success', `Added: ${hobby}`);
          await refreshUsers();
          const updated = users.find(u => u.id === selectedUser.id);
          if (updated) setSelectedUser(updated);
        } catch (err) {
          addToast('error', (err as Error).message);
        }
      } else {
        addToast('info', 'Already has hobby');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h3 className="font-bold mb-4 text-sm">Social Graph</h3>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onClick={handleCanvasClick}
        onDrop={handleCanvasDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer flex-1"
      />
      <p className="text-xs text-gray-600 mt-2">Click nodes • Drag hobbies onto selected user</p>
    </div>
  );
};