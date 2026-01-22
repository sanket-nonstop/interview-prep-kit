import { TopicLayout } from '@/components/TopicLayout';

const performanceCode = `// React Performance: Optimization techniques for production apps
import React, { memo, useMemo, useCallback, lazy, Suspense } from 'react';

// ✅ React.memo - Prevent unnecessary re-renders
const ExpensiveComponent = memo<{ data: any[]; onItemClick: (id: string) => void }>(
  ({ data, onItemClick }) => {
    console.log('ExpensiveComponent rendered');
    
    return (
      <div>
        {data.map(item => (
          <div key={item.id} onClick={() => onItemClick(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
    );
  }
);

// ✅ Custom comparison for complex props
const UserCard = memo<{ user: User; settings: Settings }>(
  ({ user, settings }) => {
    return <div>{user.name} - {settings.theme}</div>;
  },
  (prevProps, nextProps) => {
    // Only re-render if user ID or theme changes
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.settings.theme === nextProps.settings.theme
    );
  }
);

// ✅ Code splitting with lazy loading
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
};

// ✅ Virtualization for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedList: React.FC<{ items: any[] }> = ({ items }) => {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
};

// ✅ Optimized event handlers
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Single handler for all todos
  const handleTodoAction = useCallback((action: string, id: string) => {
    setTodos(prev => {
      switch (action) {
        case 'toggle':
          return prev.map(todo => 
            todo.id === id ? { ...todo, done: !todo.done } : todo
          );
        case 'delete':
          return prev.filter(todo => todo.id !== id);
        default:
          return prev;
      }
    });
  }, []);
  
  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onAction={handleTodoAction}
        />
      ))}
    </div>
  );
};

// ✅ Debounced search with useMemo
const SearchResults: React.FC<{ query: string; data: any[] }> = ({ query, data }) => {
  const filteredResults = useMemo(() => {
    if (!query.trim()) return data;
    
    return data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, data]);
  
  const sortedResults = useMemo(() => {
    return filteredResults.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredResults]);
  
  return (
    <div>
      {sortedResults.map(item => (
        <SearchResultItem key={item.id} item={item} />
      ))}
    </div>
  );
};

// ✅ Image optimization
const OptimizedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!loaded && <div className="skeleton-loader" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100' : 'opacity-0'}
      />
    </div>
  );
};`;

const Performance = () => {
  return (
    <TopicLayout
      title="Performance Optimization"
      route="/react/performance"
      category="react"
      explanation="React performance optimization involves preventing unnecessary re-renders with React.memo, memoizing expensive calculations with useMemo, optimizing event handlers with useCallback, code splitting with lazy loading, and virtualizing large lists."
      code={performanceCode}
      codeFilename="performance.tsx"
      whyItMatters="Performance optimization is crucial for user experience and distinguishes senior developers. Interviewers test knowledge of React's rendering behavior, when to optimize, and how to measure performance. Essential for building scalable applications that handle large datasets."
      mistakes={[
        "Premature optimization - measure first, optimize only when needed.",
        "Over-memoizing everything - adds overhead without benefits for simple components.",
        "Not using React DevTools Profiler - optimize based on data, not assumptions.",
        "Ignoring bundle size - code splitting and tree shaking are equally important.",
      ]}
      practiceTask="Build a data table component that handles 10,000+ rows efficiently. Implement virtualization, search/filter with debouncing, sortable columns, and measure performance improvements with React DevTools Profiler."
    />
  );
};

export default Performance;