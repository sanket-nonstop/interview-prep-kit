import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default UseMemo;