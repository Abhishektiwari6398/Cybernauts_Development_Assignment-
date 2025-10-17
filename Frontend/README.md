# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Social Network Graph Frontend 🌐

A modern React + TypeScript frontend for visualizing and managing social networks with real-time popularity scoring and dynamic relationship management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Components Documentation](#components-documentation)
- [State Management](#state-management)
- [Performance Optimizations](#performance-optimizations)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

---

## ✨ Features

### Core Features

1. **Graph Visualization**
   - Canvas-based node and edge rendering
   - Circular layout with 360° distribution
   - Dynamic node sizing based on popularity score
   - Color-coded nodes:
     - 🟢 Green: High popularity (> 5)
     - 🔵 Blue: Medium popularity (2-5)
     - 🔴 Red: Low popularity (≤ 2)
   - Yellow highlight for selected nodes
   - Real-time edge updates for friendships

2. **User Management Panel**
   - Create new users with validation
   - Edit user details (username, age, hobbies)
   - Delete users with confirmation modal
   - View detailed user information
   - Popularity score display with live updates
   - Friend list management

3. **Hobby Sidebar**
   - Display all hobbies from system
   - Search/filter hobbies in real-time
   - Draggable hobby tags
   - Unique hobby aggregation
   - Scrollable interface for large datasets

4. **Drag & Drop Functionality**
   - Drag hobbies from sidebar onto graph nodes
   - Auto-detect drop zone (80px radius from center)
   - Immediate popularity score recalculation
   - Real-time UI updates
   - Duplicate prevention

5. **Relationship Management**
   - Link users (create friendships)
   - Unlink users (remove friendships)
   - Bidirectional relationship handling
   - Validation to prevent self-linking
   - Prevention of duplicate links

6. **Notifications System**
   - Toast notifications for all actions
   - Success messages (green)
   - Error messages (red)
   - Info messages (blue)
   - Auto-dismiss after 3 seconds
   - Manual dismiss option

7. **State Management**
   - React Context API for global state
   - Centralized user data management
   - Real-time synchronization with backend
   - Toast notification system
   - Selected user tracking

---

## 🛠 Tech Stack

```
Frontend:
- React 18.2+
- TypeScript 5.2+
- Vite (Build Tool)
- Tailwind CSS 3.3+ (Styling)
- Lucide React (Icons)

Backend Integration:
- REST API with Fetch API
- CORS-enabled communication

Development:
- Node.js 18+
- npm or yarn
```

---

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Backend server running on http://localhost:5000

### Step 1: Create React Project

```bash
npx create-vite@latest social-graph-frontend -- --template react-ts
cd social-graph-frontend
```

### Step 2: Install Dependencies

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

### Step 3: Create Folder Structure

```bash
mkdir -p src/{types,services,context,components}
```

### Step 4: Copy Files

Copy all files from the project structure (detailed below) into respective folders.

### Step 5: Install Production Dependencies

```bash
npm install
```

### Step 6: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

---

## 📁 Project Structure

```
social-graph-frontend/
│
├── src/
│   │
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces and types
│   │
│   ├── services/
│   │   └── apiService.ts               # API communication layer
│   │
│   ├── context/
│   │   └── AppContext.tsx              # Global state management (Context API)
│   │
│   ├── components/
│   │   ├── Toast.tsx                   # Individual toast notification
│   │   ├── ToastContainer.tsx          # Toast notification container
│   │   ├── UserForm.tsx                # User creation/edit form
│   │   ├── UserPanel.tsx               # User management panel
│   │   ├── HobbySidebar.tsx            # Hobby display and search
│   │   └── GraphVisualization.tsx      # Canvas graph rendering
│   │
│   ├── App.tsx                         # Main application component
│   ├── App.css                         # App-level styles
│   ├── index.css                       # Global styles + Tailwind imports
│   └── main.tsx                        # Entry point
│
├── public/                             # Static assets
│
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Project dependencies
├── index.html                          # HTML template
│
└── README.md                           # This file
```

---

## ⚙️ Configuration

### Backend URL Configuration

Edit `src/services/apiService.ts`:

```typescript
// Default (change if backend port is different)
const API_BASE = 'http://localhost:5000/api';

// Example for different port:
// const API_BASE = 'http://localhost:8000/api';
```

### CORS Configuration

Ensure your backend has CORS enabled for `http://localhost:3000`:

Backend (Node.js example):
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
```

### Environment Variables (Optional)

Create `.env` file in root:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

Then update `apiService.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

---

## 🚀 Usage

### Starting the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Creating a User

1. Click **"+ New"** button in User Panel
2. Fill in:
   - Username
   - Age
   - Hobbies (comma-separated, e.g., "Gaming, Reading, Coding")
3. Click **"Save"**
4. New user appears as a node on the graph

### Viewing User Details

1. Click any **node** on the graph canvas
2. User details appear in the **User Panel** on the right
3. Panel shows:
   - Username and age
   - Popularity score
   - List of hobbies
   - Connected friends

### Adding Hobbies to Users

1. Select a user (click on graph node)
2. From **Hobby Sidebar**, drag a hobby tag
3. Drop it onto the selected user's node (yellow highlight)
4. Hobby is added and popularity score updates immediately

### Searching Hobbies

1. In **Hobby Sidebar**, type in the search box
2. Hobbies filter in real-time
3. Clear search to show all hobbies

### Linking Users (Creating Friendships)

1. Select a user from the graph
2. In **User Panel**, go to **"Link Friend"** section
3. Select another user from dropdown
4. Click **"Link"** button
5. Friendship is created and graph updates

### Unlinking Users (Removing Friendships)

1. Select a user from the graph
2. In **User Panel**, find friend in **"Friends"** list
3. Click **"Unlink"** button next to friend
4. Friendship is removed

### Deleting a User

1. Select user from graph
2. Click **"Delete"** button at bottom of User Panel
3. Confirm deletion
4. User is removed from system

---

## 🔌 API Integration

### Supported Endpoints

All endpoints communicate with backend at `http://localhost:5000/api`

#### Get All Users
```
GET /users
Response: IUser[]
```

#### Create User
```
POST /users
Body: { username, age, hobbies }
Response: IUser
```

#### Update User
```
PUT /users/:id
Body: { username?, age?, hobbies? }
Response: IUser
```

#### Delete User
```
DELETE /users/:id
Response: { success: boolean, message: string }
```

#### Link Users
```
POST /users/:id/link
Body: { targetId }
Response: { success: boolean, message: string }
```

#### Unlink Users
```
DELETE /users/:id/unlink
Body: { targetId }
Response: { success: boolean, message: string }
```

### Error Handling

All API errors are caught and displayed as red toast notifications.

```typescript
try {
  await apiService.createUser(data);
  addToast('success', 'User created successfully');
} catch (err) {
  addToast('error', (err as Error).message);
}
```

---

## 📦 Components Documentation

### Toast Component
**File:** `src/components/Toast.tsx`

Displays individual notification.

**Props:**
```typescript
{
  toast: Toast,        // { id, type, message }
  onRemove: () => void // Callback to remove toast
}
```

### ToastContainer Component
**File:** `src/components/ToastContainer.tsx`

Container for all toast notifications. Auto-positions at bottom-right.

### UserForm Component
**File:** `src/components/UserForm.tsx`

Form for creating new users.

**Props:**
```typescript
{
  onSubmit: (data) => Promise<void>,
  onCancel: () => void
}
```

**Validation:**
- Username: Required, non-empty
- Age: Must be positive number
- Hobbies: Comma-separated values

### HobbySidebar Component
**File:** `src/components/HobbySidebar.tsx`

Displays all hobbies with search functionality.

**Features:**
- Real-time search
- Draggable tags
- Auto-deduplication
- Scrollable list

### GraphVisualization Component
**File:** `src/components/GraphVisualization.tsx`

Canvas-based graph rendering.

**Features:**
- Node click detection
- Drag-drop hobby support
- Dynamic sizing
- Color coding
- Edge rendering

### UserPanel Component
**File:** `src/components/UserPanel.tsx`

Main user management interface.

**Sections:**
- User details (when selected)
- Hobbies display
- Friends list
- Link/unlink controls
- Delete button

---

## 🏛 State Management

### Architecture

```
AppProvider (Context)
├── users: IUser[]
├── loading: boolean
├── toasts: Toast[]
├── selectedUser: IUser | null
├── refreshUsers: () => Promise<void>
├── addToast: (type, message) => void
└── removeToast: (id) => void
```

### Usage

```typescript
import { useApp } from '../context/AppContext';

function MyComponent() {
  const { users, selectedUser, addToast, refreshUsers } = useApp();
  
  // Use state and functions
}
```

### Data Flow

```
1. AppProvider initializes on mount
2. Fetches all users from backend
3. Stores in global state
4. Components access via useApp hook
5. Actions (create/update/delete) trigger refreshUsers()
6. State updates across all components
```

---

## ⚡ Performance Optimizations

### Implemented

1. **Canvas Rendering**
   - Efficient canvas drawing instead of SVG
   - Single render per state change
   - Optimized circle drawing

2. **Deduplication**
   - Set-based hobby deduplication
   - Prevents duplicate entries

3. **Memoization**
   - useCallback for function stability
   - useEffect dependencies properly managed

4. **Lazy Loading**
   - Hobbies only computed when needed
   - Friends list rendered on demand

### Recommended Future Optimizations

```typescript
// 1. Debounce search input
const debouncedSearch = useCallback(
  debounce((term) => setSearchTerm(term), 300),
  []
);

// 2. Virtual scrolling for large lists
import { FixedSizeList } from 'react-window';

// 3. Memoize components
const UserPanel = React.memo(UserPanelComponent);

// 4. Code splitting
const GraphVisualization = lazy(() => 
  import('./components/GraphVisualization')
);
```

---

## 🐛 Troubleshooting

### Problem: Blank Page on Startup

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: API Connection Errors

**Check:**
1. Backend running on `http://localhost:5000`
2. CORS enabled on backend
3. Correct API_BASE in `apiService.ts`

**Debug:**
```typescript
// Add console logs in apiService.ts
console.log('Fetching:', `${API_BASE}/users`);
```

### Problem: Tailwind Styles Not Applying

**Solution:**
```bash
# Reinstall Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Restart dev server
npm run dev
```

### Problem: TypeScript Errors

**Solution:**
```bash
npm install @types/react @types/react-dom
npm run dev
```

### Problem: Nodes Not Appearing on Graph

**Check:**
1. Are users loaded? (Check browser console)
2. Is canvas width/height set? (Check in GraphVisualization)
3. Backend returning users? (Check Network tab)

### Problem: Drag & Drop Not Working

**Solution:**
1. Ensure hobby is dragged from sidebar
2. Drop must be within 80px of center
3. User must be selected (yellow highlight)
4. Check browser console for errors

### Problem: Popularity Score Not Updating

**Solution:**
```bash
# Clear localStorage and refresh
localStorage.clear()
npm run dev
```

---

## 🔧 Development

### Adding New Features

1. **New Component:**
```typescript
// src/components/NewComponent.tsx
import React from 'react';
import { useApp } from '../context/AppContext';

export const NewComponent: React.FC = () => {
  const { users, addToast } = useApp();
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

2. **New API Endpoint:**
```typescript
// src/services/apiService.ts
async newFunction(): Promise<any> {
  const res = await fetch(`${API_BASE}/endpoint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to call endpoint');
  return res.json();
}
```

### Build for Production

```bash
npm run build
```

Output in `dist/` folder. Deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting

### Code Quality

```bash
# Add ESLint (optional)
npm install -D eslint @typescript-eslint/parser

# Add Prettier (optional)
npm install -D prettier
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

## 📝 API Response Examples

### Get All Users
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "age": 28,
    "hobbies": ["Gaming", "Reading"],
    "friends": ["user-id-2"],
    "createdAt": "2024-01-15T10:30:00Z",
    "popularityScore": 3.5
  }
]
```

### Create User
```json
{
  "username": "john_doe",
  "age": 28,
  "hobbies": ["Gaming", "Reading"]
}
```

Response:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "age": 28,
  "hobbies": ["Gaming", "Reading"],
  "friends": [],
  "createdAt": "2024-01-15T10:30:00Z",
  "popularityScore": 0
}
```

---

## 🎯 Key Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Graph Visualization | ✅ | Canvas-based, real-time |
| User Management | ✅ | CRUD operations |
| Hobby Management | ✅ | Drag & drop support |
| Relationship Management | ✅ | Link/unlink users |
| Real-time Updates | ✅ | Instant UI refresh |
| Toast Notifications | ✅ | Auto-dismiss |
| Search/Filter | ✅ | Real-time hobby search |
| Responsive Design | ✅ | Mobile & desktop |
| Type Safety | ✅ | Full TypeScript |
| Error Handling | ✅ | User-friendly messages |

---

## 📄 License

This project is part of a social network demonstration.

---

## 👥 Support

For issues or questions:
1. Check troubleshooting section
2. Review console logs
3. Verify backend is running
4. Check network requests in DevTools

---

**Last Updated:** January 2025

**Frontend Version:** 1.0.0

**Backend Compatibility:** Node.js Express API with MongoDB