import { TopicLayout } from '@/components/TopicLayout';

const patternsCode = `// React Patterns: Advanced component composition and design patterns

// ✅ Compound Components Pattern
const Tabs = ({ children, defaultTab = 0 }: {
  children: React.ReactNode;
  defaultTab?: number;
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab, index });
        }
        return child;
      })}
    </div>
  );
};

const TabList = ({ children, activeTab, setActiveTab }: any) => (
  <div className="tab-list">
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, { 
        isActive: index === activeTab,
        onClick: () => setActiveTab(index)
      })
    )}
  </div>
);

const Tab = ({ children, isActive, onClick }: any) => (
  <button 
    className={\`tab \${isActive ? 'active' : ''}\`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabPanels = ({ children, activeTab }: any) => (
  <div className="tab-panels">
    {React.Children.toArray(children)[activeTab]}
  </div>
);

// Usage
<Tabs defaultTab={0}>
  <TabList>
    <Tab>Profile</Tab>
    <Tab>Settings</Tab>
    <Tab>Billing</Tab>
  </TabList>
  <TabPanels>
    <div>Profile Content</div>
    <div>Settings Content</div>
    <div>Billing Content</div>
  </TabPanels>
</Tabs>

// ✅ Render Props Pattern
interface MouseTrackerProps {
  children: (mouse: { x: number; y: number }) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ children }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh' }}>
      {children(mouse)}
    </div>
  );
};

// Usage
<MouseTracker>
  {({ x, y }) => (
    <div>
      <h2>Mouse position: ({x}, {y})</h2>
      <div 
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 10,
          height: 10,
          background: 'red'
        }}
      />
    </div>
  )}
</MouseTracker>

// ✅ Higher-Order Component (HOC) Pattern
function withLoading<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithLoadingComponent(props: T & { isLoading?: boolean }) {
    const { isLoading, ...restProps } = props;
    
    if (isLoading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    
    return <WrappedComponent {...(restProps as T)} />;
  };
}

// Usage
const UserProfile = ({ user }: { user: User }) => (
  <div>{user.name}</div>
);

const UserProfileWithLoading = withLoading(UserProfile);

// ✅ Provider Pattern
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={\`app theme-\${theme}\`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// ✅ Container/Presentational Pattern
// Container (logic)
const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  const handleUserDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };
  
  return (
    <UserListPresentation
      users={users}
      loading={loading}
      error={error}
      onUserDelete={handleUserDelete}
    />
  );
};

// Presentational (UI only)
const UserListPresentation: React.FC<{
  users: User[];
  loading: boolean;
  error: string | null;
  onUserDelete: (id: string) => void;
}> = ({ users, loading, error, onUserDelete }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onDelete={() => onUserDelete(user.id)}
        />
      ))}
    </div>
  );
};

// ✅ Custom Hook Pattern
const useApi = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return { data, loading, error, refetch };
};`;

const Patterns = () => {
  return (
    <TopicLayout
      title="React Patterns"
      route="/react/patterns"
      category="react"
      explanation="React patterns are reusable solutions for common component design problems. Compound components enable flexible APIs, render props share logic, HOCs add functionality, and custom hooks extract stateful logic. These patterns create maintainable, reusable code."
      code={patternsCode}
      codeFilename="patterns.tsx"
      whyItMatters="React patterns demonstrate advanced component architecture skills. Interviewers test understanding of composition, reusability, and API design. These patterns are essential for building scalable React applications and component libraries."
      mistakes={[
        "Overusing HOCs - can create wrapper hell and make debugging difficult.",
        "Not considering performance implications of render props - can cause unnecessary re-renders.",
        "Making compound components too complex - simple props are often better.",
        "Not providing proper TypeScript types for pattern implementations.",
      ]}
      practiceTask="Build a flexible Modal component using compound components pattern, create a data fetching hook with error handling and caching, and implement a form validation HOC with TypeScript generics."
    />
  );
};

export default Patterns;