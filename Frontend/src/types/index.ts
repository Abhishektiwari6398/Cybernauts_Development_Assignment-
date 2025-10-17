export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  createdAt: string;
  popularityScore: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AppContextType {
  users: IUser[];
  loading: boolean;
  toasts: Toast[];
  selectedUser: IUser | null;
  setSelectedUser: (user: IUser | null) => void;
  refreshUsers: () => Promise<void>;
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
}