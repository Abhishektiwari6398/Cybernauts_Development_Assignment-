import React from 'react';
import { Toast } from './Toast';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();
  
  return (
    <div className="fixed bottom-4 right-4 space-y-3 z-50">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};