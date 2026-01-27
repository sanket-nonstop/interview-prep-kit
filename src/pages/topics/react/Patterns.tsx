import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: React Patterns"
        examples={[
          {
            title: "Render Props Pattern",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 0; font-family: system-ui; background: #0f172a; color: #e2e8f0; height: 100vh; overflow: hidden; }
  .tracker { height: 100vh; position: relative; }
  .info { position: fixed; top: 20px; left: 20px; background: rgba(59, 130, 246, 0.9); padding: 20px; border-radius: 12px; font-weight: 600; }
  .cursor { position: absolute; width: 20px; height: 20px; background: #ef4444; border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; box-shadow: 0 0 20px #ef4444; }
</style>
</head>
<body>
  <div class="tracker" onmousemove="updateMouse(event)">
    <div class="info">
      <h3>🖱️ Mouse Tracker (Render Props)</h3>
      <p>X: <span id="x">0</span></p>
      <p>Y: <span id="y">0</span></p>
    </div>
    <div class="cursor" id="cursor"></div>
  </div>
  
  <script>
    function updateMouse(e) {
      const x = e.clientX;
      const y = e.clientY;
      
      document.getElementById('x').textContent = x;
      document.getElementById('y').textContent = y;
      
      const cursor = document.getElementById('cursor');
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Container/Presentational",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .user-list { display: grid; gap: 15px; margin-top: 20px; }
  .user-card { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
  .loading { text-align: center; padding: 40px; font-size: 24px; }
  .delete { background: #ef4444; color: white; }
</style>
</head>
<body>
  <div class="card">
    <h2>👥 User List (Container/Presentational)</h2>
    <button onclick="loadUsers()">Load Users</button>
    <div id="container"></div>
  </div>
  
  <script>
    let users = [];
    
    async function loadUsers() {
      renderLoading();
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
        users = await response.json();
        renderUsers();
      } catch (error) {
        renderError(error.message);
      }
    }
    
    function deleteUser(id) {
      users = users.filter(u => u.id !== id);
      renderUsers();
    }
    
    function renderLoading() {
      document.getElementById('container').innerHTML = '<div class="loading">⏳ Loading...</div>';
    }
    
    function renderError(msg) {
      document.getElementById('container').innerHTML = '<div class="loading">❌ Error: ' + msg + '</div>';
    }
    
    function renderUsers() {
      const html = '<div class="user-list">' + users.map(user => \`
        <div class="user-card">
          <div>
            <strong>\${user.name}</strong><br>
            <small>\${user.email}</small>
          </div>
          <button class="delete" onclick="deleteUser(\${user.id})">Delete</button>
        </div>
      \`).join('') + '</div>';
      document.getElementById('container').innerHTML = html;
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Patterns;