import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { IUser, Toast, AppContextType } from '../types';
import { apiService } from '../services/apiServices';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const refreshUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (err) {
      addToast('error', (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToast = (type: Toast['type'], message: string) => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return (
    <AppContext.Provider value={{ users, loading, toasts, selectedUser, setSelectedUser, refreshUsers, addToast, removeToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};