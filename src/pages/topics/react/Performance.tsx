import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Performance"
        examples={[
          {
            title: "React.memo Demo",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: #1e293b; padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 36px; font-weight: bold; color: #3b82f6; }
  .list { background: #1e293b; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .item { padding: 10px; border-bottom: 1px solid #334155; }
</style>
</head>
<body>
  <div class="container">
    <h2>⚡ React.memo Performance</h2>
    <button onclick="increment()">Increment Counter</button>
    <button onclick="addItem()">Add Item</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="counter">0</div><div>Counter</div></div>
      <div class="stat"><div class="stat-value" id="renders">0</div><div>List Renders</div></div>
    </div>
    <div class="list" id="list"></div>
    <p style="opacity: 0.7; font-size: 14px;">✅ With React.memo, list only re-renders when items change, not when counter changes</p>
  </div>
  
  <script>
    let counter = 0;
    let items = ['Item 1', 'Item 2', 'Item 3'];
    let listRenders = 0;
    let lastItems = JSON.stringify(items);
    
    function increment() {
      counter++;
      document.getElementById('counter').textContent = counter;
      // List doesn't re-render (simulating React.memo)
    }
    
    function addItem() {
      items.push('Item ' + (items.length + 1));
      renderList();
    }
    
    function renderList() {
      const currentItems = JSON.stringify(items);
      if (currentItems !== lastItems) {
        listRenders++;
        lastItems = currentItems;
      }
      document.getElementById('list').innerHTML = items.map(item => 
        '<div class="item">' + item + '</div>'
      ).join('');
      document.getElementById('renders').textContent = listRenders;
    }
    
    renderList();
  </script>
</body>
</html>`
          },
          {
            title: "useMemo Optimization",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 28px; font-weight: bold; color: #fbbf24; }
</style>
</head>
<body>
  <div class="card">
    <h2>🚀 useMemo Demo</h2>
    <input id="filter" placeholder="Filter items..." oninput="updateFilter()" />
    <div class="stats">
      <div class="stat"><div class="stat-value" id="total">1000</div><div>Total Items</div></div>
      <div class="stat"><div class="stat-value" id="filtered">1000</div><div>Filtered</div></div>
      <div class="stat"><div class="stat-value" id="calcs">1</div><div>Calculations</div></div>
    </div>
    <p style="font-size: 14px; opacity: 0.8;">✅ useMemo caches expensive calculations - only recalculates when dependencies change</p>
  </div>
  
  <script>
    const items = Array.from({length: 1000}, (_, i) => 'Item ' + (i + 1));
    let calcCount = 1;
    let lastFilter = '';
    let cachedResult = items;
    
    function expensiveFilter(items, filter) {
      calcCount++;
      document.getElementById('calcs').textContent = calcCount;
      return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
    }
    
    function updateFilter() {
      const filter = document.getElementById('filter').value;
      // Memoization: only recalculate if filter changed
      if (filter !== lastFilter) {
        cachedResult = expensiveFilter(items, filter);
        lastFilter = filter;
      }
      document.getElementById('filtered').textContent = cachedResult.length;
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

export default Performance;