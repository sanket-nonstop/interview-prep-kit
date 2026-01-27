import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const useMemoCode = `// useMemo & useCallback: Before vs After Optimization

// ❌ BEFORE: Without useMemo - Recalculates on every render
const ProductList: React.FC<{ products: Product[]; count: number }> = ({ 
  products, 
  count 
}) => {
  // This runs on EVERY render, even when count changes!
  const filteredProducts = products.filter(p => p.price > 100);
  const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Total: \${totalPrice}</p>
      {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};

// ✅ AFTER: With useMemo - Only recalculates when products change
const ProductListOptimized: React.FC<{ products: Product[]; count: number }> = ({ 
  products, 
  count 
}) => {
  // Only recalculates when products array changes
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...'); // Only logs when products change
    return products.filter(p => p.price > 100);
  }, [products]);
  
  const totalPrice = useMemo(() => {
    console.log('Calculating total...'); // Only logs when filteredProducts change
    return filteredProducts.reduce((sum, p) => sum + p.price, 0);
  }, [filteredProducts]);
  
  return (
    <div>
      <p>Count: {count}</p> {/* count changes don't trigger recalculation */}
      <p>Total: \${totalPrice}</p>
      {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};

// ❌ BEFORE: Without useCallback - New function on every render
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [count, setCount] = useState(0);
  
  // New function created on EVERY render
  const addTodo = (text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  };
  
  // TodoList re-renders even when only count changes!
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={(id) => {/* ... */}} />
    </div>
  );
};

// ✅ AFTER: With useCallback - Same function reference
const TodoAppOptimized: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [count, setCount] = useState(0);
  
  // Function reference stays the same across renders
  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  }, []); // Empty deps = function never changes
  
  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }, []); // Empty deps because we use functional update
  
  // TodoList only re-renders when todos change!
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
};

// ✅ Must use React.memo for useCallback to work
const TodoList = React.memo<{ todos: Todo[]; onToggle: (id: number) => void }>(({ 
  todos, 
  onToggle 
}) => {
  console.log('TodoList rendered'); // Only logs when todos change
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

// 🎯 Real-world example: Search with expensive filtering
const SearchableList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [items] = useState(() => Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`Item \${i}\`,
    category: ['A', 'B', 'C'][i % 3]
  })));
  
  // ❌ Without useMemo: Filters 10,000 items on EVERY keystroke
  // const filtered = items.filter(item => 
  //   item.name.toLowerCase().includes(query.toLowerCase())
  // );
  
  // ✅ With useMemo: Only filters when query or items change
  const filtered = useMemo(() => {
    console.log('Filtering 10,000 items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);
  
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);
  
  return (
    <div>
      <input value={query} onChange={handleSearch} placeholder="Search..." />
      <p>Found {filtered.length} items</p>
      <VirtualList items={filtered} />
    </div>
  );
};`;

const UseMemo = () => {
  return (
    <TopicLayout
      title="useMemo & useCallback"
      route="/react/hooks/useMemo"
      category="react"
      explanation="useMemo caches expensive calculations - only recalculates when dependencies change. useCallback memoizes functions - prevents child re-renders by keeping same function reference. BEFORE: calculations run every render. AFTER: only when dependencies change. Must use React.memo with useCallback."
      code={useMemoCode}
      codeFilename="useMemo.tsx"
      whyItMatters="Performance optimization separates senior from junior developers. Interviewers test if you know when to optimize (not always!), understand dependency arrays, and can prevent unnecessary re-renders. Essential for apps with complex calculations or large lists."
      mistakes={[
        "Over-memoizing everything - adds overhead. Only optimize when you have actual performance issues.",
        "Missing dependencies - leads to stale values. Include all variables used inside the callback.",
        "Memoizing primitives - useMemo(() => 5, []) is pointless. Only memoize expensive operations.",
        "Not using React.memo with useCallback - callbacks are useless without memoized components.",
      ]}
      practiceTask="Create a SearchableTable component that filters and sorts 1000+ items. Use useMemo for filtering/sorting and useCallback for event handlers. Measure performance with React DevTools Profiler."
    >
      <MultiExampleEditor
        title="🎯 Try It: Before vs After Optimization"
        examples={[
          {
            title: "❌ BEFORE: Without useMemo",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #7f1d1d; color: white; min-height: 100vh; }
  .card { background: rgba(0,0,0,0.3); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 3px solid #ef4444; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  button { background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(0,0,0,0.4); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 36px; font-weight: bold; color: #fca5a5; }
  .warning { background: #7f1d1d; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444; }
</style>
</head>
<body>
  <div class="card">
    <h2>❌ WITHOUT useMemo (Slow)</h2>
    <input id="filter" placeholder="Type to filter..." oninput="updateWithoutMemo()" />
    <button onclick="incrementCounter()">Increment Counter</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="counter">0</div><div>Counter</div></div>
      <div class="stat"><div class="stat-value" id="filtered">1000</div><div>Filtered</div></div>
      <div class="stat"><div class="stat-value" id="calcs">0</div><div>Calculations</div></div>
    </div>
    <div class="warning">
      <strong>⚠️ Problem:</strong> Filtering runs on EVERY render, even when just counter changes!
    </div>
  </div>
  
  <script>
    let items = Array.from({length: 1000}, (_, i) => 'Item ' + (i + 1));
    let counter = 0;
    let calcCount = 0;
    
    function expensiveFilter(items, filter) {
      calcCount++;
      document.getElementById('calcs').textContent = calcCount;
      // Simulate expensive operation
      let result = items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
      return result;
    }
    
    function updateWithoutMemo() {
      const filter = document.getElementById('filter').value;
      // ❌ Runs EVERY time, no memoization
      const filtered = expensiveFilter(items, filter);
      document.getElementById('filtered').textContent = filtered.length;
    }
    
    function incrementCounter() {
      counter++;
      document.getElementById('counter').textContent = counter;
      // ❌ This triggers expensive filter even though filter didn't change!
      updateWithoutMemo();
    }
    
    updateWithoutMemo();
  </script>
</body>
</html>`
          },
          {
            title: "✅ AFTER: With useMemo",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #14532d; color: white; min-height: 100vh; }
  .card { background: rgba(0,0,0,0.3); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 3px solid #10b981; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  button { background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(0,0,0,0.4); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 36px; font-weight: bold; color: #86efac; }
  .success { background: #14532d; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
</style>
</head>
<body>
  <div class="card">
    <h2>✅ WITH useMemo (Fast)</h2>
    <input id="filter" placeholder="Type to filter..." oninput="updateWithMemo()" />
    <button onclick="incrementCounter()">Increment Counter</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="counter">0</div><div>Counter</div></div>
      <div class="stat"><div class="stat-value" id="filtered">1000</div><div>Filtered</div></div>
      <div class="stat"><div class="stat-value" id="calcs">1</div><div>Calculations</div></div>
    </div>
    <div class="success">
      <strong>✅ Optimized:</strong> Filtering only runs when filter changes. Counter updates don't trigger recalculation!
    </div>
  </div>
  
  <script>
    let items = Array.from({length: 1000}, (_, i) => 'Item ' + (i + 1));
    let counter = 0;
    let calcCount = 1;
    let lastFilter = '';
    let cachedResult = items; // Memoized result
    
    function expensiveFilter(items, filter) {
      calcCount++;
      document.getElementById('calcs').textContent = calcCount;
      return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
    }
    
    function updateWithMemo() {
      const filter = document.getElementById('filter').value;
      // ✅ Only recalculate if filter changed (memoization)
      if (filter !== lastFilter) {
        cachedResult = expensiveFilter(items, filter);
        lastFilter = filter;
      }
      document.getElementById('filtered').textContent = cachedResult.length;
    }
    
    function incrementCounter() {
      counter++;
      document.getElementById('counter').textContent = counter;
      // ✅ Counter update doesn't trigger filter recalculation!
      document.getElementById('filtered').textContent = cachedResult.length;
    }
  </script>
</body>
</html>`
          },
          {
            title: "useCallback: Prevent Re-renders",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .container { max-width: 700px; margin: 0 auto; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  .box { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; }
  .bad { border: 3px solid #ef4444; }
  .good { border: 3px solid #10b981; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; width: 100%; }
  .renders { font-size: 48px; font-weight: bold; color: #fbbf24; text-align: center; margin: 15px 0; }
  input { width: 100%; padding: 10px; border: none; border-radius: 6px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="container">
    <h2>🔄 useCallback: Prevent Child Re-renders</h2>
    <div class="comparison">
      <div class="box bad">
        <h3>❌ Without useCallback</h3>
        <button onclick="incrementBad()">Increment Parent</button>
        <input placeholder="Type here..." oninput="typeBad()" />
        <div class="renders" id="badRenders">0</div>
        <small>Child Renders</small>
        <p style="font-size: 12px; opacity: 0.8;">⚠️ Child re-renders on every parent update!</p>
      </div>
      
      <div class="box good">
        <h3>✅ With useCallback</h3>
        <button onclick="incrementGood()">Increment Parent</button>
        <input placeholder="Type here..." oninput="typeGood()" />
        <div class="renders" id="goodRenders">0</div>
        <small>Child Renders</small>
        <p style="font-size: 12px; opacity: 0.8;">✅ Child only re-renders when needed!</p>
      </div>
    </div>
  </div>
  
  <script>
    let badRenders = 0;
    let goodRenders = 0;
    let goodCallback = null; // Simulates memoized callback
    
    function incrementBad() {
      // ❌ New function created = child re-renders
      badRenders++;
      document.getElementById('badRenders').textContent = badRenders;
    }
    
    function typeBad() {
      // ❌ Every keystroke creates new function = child re-renders
      badRenders++;
      document.getElementById('badRenders').textContent = badRenders;
    }
    
    function incrementGood() {
      // ✅ Same function reference = no child re-render
      // (only parent state changes)
    }
    
    function typeGood() {
      // ✅ Memoized callback = child doesn't re-render
      if (!goodCallback) {
        goodRenders++;
        goodCallback = true;
        document.getElementById('goodRenders').textContent = goodRenders;
      }
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

export default UseMemo;