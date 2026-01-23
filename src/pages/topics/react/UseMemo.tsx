import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const useMemoCode = `// useMemo & useCallback: Optimize expensive calculations & prevent re-renders
import React, { useMemo, useCallback, useState } from 'react';

// ✅ useMemo: Cache expensive calculations
const ProductList: React.FC<{ products: Product[]; filter: string }> = ({ 
  products, 
  filter 
}) => {
  // Only recalculate when products or filter changes
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);
  
  const totalPrice = useMemo(() => {
    return filteredProducts.reduce((sum, product) => sum + product.price, 0);
  }, [filteredProducts]);
  
  return (
    <div>
     <p>Total: \${totalPrice}</p>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// ✅ useCallback: Prevent child re-renders
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  }, []);
  
  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }, []);
  
  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
};

// ✅ Memoized child component
const TodoList = React.memo<{ todos: Todo[]; onToggle: (id: number) => void }>(
  ({ todos, onToggle }) => {
    return (
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
        ))}
      </ul>
    );
  }
);`;

const UseMemo = () => {
  return (
    <TopicLayout
      title="useMemo & useCallback"
      route="/react/hooks/useMemo"
      category="react"
      explanation="useMemo caches expensive calculations between re-renders. useCallback memoizes functions to prevent child re-renders. Both use dependency arrays to determine when to recalculate. Critical for optimizing React performance in large applications."
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
        title="🎯 Try It: useMemo Performance"
        examples={[
          {
            title: "Expensive Calculation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 36px; font-weight: bold; color: #fbbf24; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
</style>
</head>
<body>
  <div class="card">
    <h2>🚀 useMemo Demo</h2>
    <p>Type to filter - calculation is memoized!</p>
    <input id="filter" placeholder="Filter items..." oninput="updateFilter()" />
    <div class="stats">
      <div class="stat"><div class="stat-value" id="filtered">0</div><div>Filtered Items</div></div>
      <div class="stat"><div class="stat-value" id="calcs">0</div><div>Calculations</div></div>
    </div>
    <button onclick="addItems()">Add 100 Items</button>
  </div>
  
  <script>
    let items = Array.from({length: 100}, (_, i) => \`Item \${i + 1}\`);
    let calcCount = 0;
    let lastFilter = '';
    let cachedResult = null;
    
    function expensiveFilter(items, filter) {
      calcCount++;
      document.getElementById('calcs').textContent = calcCount;
      // Simulate expensive operation
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
    
    function addItems() {
      const start = items.length;
      items = [...items, ...Array.from({length: 100}, (_, i) => \`Item \${start + i + 1}\`)];
      lastFilter = ''; // Invalidate cache
      updateFilter();
    }
    
    updateFilter();
  </script>
</body>
</html>`
          },
          {
            title: "Re-render Optimization",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .counter { background: #1e293b; padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center; }
  .count { font-size: 72px; font-weight: bold; color: #3b82f6; }
  .renders { background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="container">
    <h2>🔄 Re-render Counter</h2>
    <div class="counter">
      <div class="count" id="count">0</div>
      <button onclick="increment()">Increment</button>
      <button onclick="reset()">Reset</button>
    </div>
    <div class="renders">
      <strong>Component Renders:</strong> <span id="renders">1</span>
    </div>
    <p style="opacity: 0.7; font-size: 14px;">✅ With useMemo/useCallback, child components don't re-render unnecessarily</p>
  </div>
  
  <script>
    let count = 0;
    let renderCount = 1;
    
    function increment() {
      count++;
      renderCount++;
      render();
    }
    
    function reset() {
      count = 0;
      renderCount++;
      render();
    }
    
    function render() {
      document.getElementById('count').textContent = count;
      document.getElementById('renders').textContent = renderCount;
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