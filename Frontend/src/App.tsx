import React from 'react';
import { Heart } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { GraphVisualization } from './components/GraphVisualization';
import { UserPanel } from './components/UserPanel';
import { HobbySidebar } from './components/HobbySidebar';
import { ToastContainer } from './components/ToastContainer';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Heart className="text-red-500" size={40} />
              Social Network
            </h1>
            <p className="text-gray-600 mt-1 text-sm">Manage users, friendships, and hobbies</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ minHeight: '600px' }}>
            <div className="lg:col-span-1">
              <HobbySidebar />
            </div>
            <div className="lg:col-span-2">
              <GraphVisualization />
            </div>
            <div className="lg:col-span-1">
              <UserPanel />
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </AppProvider>
  );
}

export default App;