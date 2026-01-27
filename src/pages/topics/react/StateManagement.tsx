import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const stateManagementCode = `// State Management: Redux, Zustand, and modern patterns

// ✅ Redux Toolkit (modern Redux)
import { createSlice, configureStore } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, setError } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// ✅ Zustand (lightweight alternative)
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const user = await response.json();
      set({ user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  logout: () => {
    set({ user: null, error: null });
  },
}));

// ✅ React Query for server state
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: Partial<User>) =>
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then(res => res.json()),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// ✅ Custom state management hook
const useLocalState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((prev: T) => T)) => {
    const newValue = value instanceof Function ? value(state) : value;
    setState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  return [state, setValue] as const;
};

// ✅ Component using multiple state sources
const UserDashboard: React.FC = () => {
  // Global state (Zustand)
  const { user, login, logout } = useUserStore();
  
  // Server state (React Query)
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  
  // Local state
  const [preferences, setPreferences] = useLocalState('userPrefs', {
    theme: 'light',
    notifications: true,
  });
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={() => setPreferences(prev => ({ 
        ...prev, 
        theme: prev.theme === 'light' ? 'dark' : 'light' 
      }))}>
        Toggle Theme
      </button>
      {isLoading ? <div>Loading...</div> : <UserList users={users} />}
    </div>
  );
};`;

const StateManagement = () => {
  return (
    <TopicLayout
      title="State Management"
      route="/react/state-management"
      category="react"
      explanation="Modern state management uses different tools for different needs: Redux Toolkit for complex global state, Zustand for simple global state, React Query for server state, and local state for component-specific data. Choose the right tool for each use case."
      code={stateManagementCode}
      codeFilename="state-management.tsx"
      whyItMatters="State management is crucial for complex applications. Interviewers test understanding of different state types, when to use global vs local state, and modern tools like Redux Toolkit and React Query. Essential for scalable React applications."
      mistakes={[
        "Putting all state in global store - use local state when possible.",
        "Not separating server state from client state - leads to complex caching logic.",
        "Using Redux for simple state - Zustand or Context API might be better.",
        "Not optimizing re-renders - causes performance issues in large apps.",
      ]}
      practiceTask="Build a todo app with Redux Toolkit for todos, React Query for user data, Zustand for UI state, and local storage for preferences. Implement optimistic updates and error handling."
    />
  );
};

export default StateManagement;