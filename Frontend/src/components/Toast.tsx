import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType;
  onRemove: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const bgColor = toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = toast.type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
      <Icon size={20} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={onRemove}><X size={18} /></button>
    </div>
  );
};