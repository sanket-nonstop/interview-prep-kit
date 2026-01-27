import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const reactMemoCode = `// React.memo: BEFORE vs AFTER - Prevent unnecessary re-renders

// ❌ BEFORE: Without React.memo - Child re-renders on every parent update
function ExpensiveComponent({ data }: { data: string }) {
  console.log('ExpensiveComponent rendered'); // Logs on EVERY parent render
  // Imagine expensive calculations here
  return <div>{data}</div>;
}

function ParentBefore() {
  const [count, setCount] = useState(0);
  const [data] = useState('static data');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} />
      {/* ❌ Re-renders even though data never changes! */}
    </div>
  );
}

// ✅ AFTER: With React.memo - Child only re-renders when props change
const ExpensiveComponentMemo = React.memo(function ExpensiveComponent({ 
  data 
}: { 
  data: string 
}) {
  console.log('ExpensiveComponent rendered'); // Only logs when data changes
  return <div>{data}</div>;
});

function ParentAfter() {
  const [count, setCount] = useState(0);
  const [data] = useState('static data');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponentMemo data={data} />
      {/* ✅ Doesn't re-render! Props haven't changed */}
    </div>
  );
}

// ❌ PROBLEM: React.memo doesn't work with object/array props
const MemoizedChild = React.memo(({ data }: { data: { value: string } }) => {
  console.log('Child rendered');
  return <div>{data.value}</div>;
});

function BadExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={{ value: 'static' }} />
      {/* ❌ Re-renders every time! New object reference each render */}
    </div>
  );
}

// ✅ SOLUTION: Combine React.memo with useMemo
function GoodExample() {
  const [count, setCount] = useState(0);
  const data = useMemo(() => ({ value: 'static' }), []); // Stable reference

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={data} />
      {/* ✅ Doesn't re-render! Same object reference */}
    </div>
  );
}

// ❌ BEFORE: Function props break memoization
const Button = React.memo(function Button({ 
  onClick, 
  label 
}: { 
  onClick: () => void; 
  label: string 
}) {
  console.log('Button rendered:', label);
  return <button onClick={onClick}>{label}</button>;
});

function ToolbarBefore() {
  const [count, setCount] = useState(0);

  const handleClick = () => console.log('clicked'); // New function every render

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Button onClick={handleClick} label="Save" />
      {/* ❌ Button re-renders on every count change */}
    </div>
  );
}

// ✅ AFTER: useCallback keeps function reference stable
function ToolbarAfter() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Stable function reference

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Button onClick={handleClick} label="Save" />
      {/* ✅ Button only renders once! */}
    </div>
  );
}

// ✅ Custom comparison for complex props
const UserCard = React.memo(
  function UserCard({ user }: { user: User }) {
    return (
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    // Only re-render if user ID changes
    return prevProps.user.id === nextProps.user.id;
  }
);

// 🎯 Real-world: Memoizing list items
const TodoItem = React.memo(function TodoItem({ 
  todo, 
  onToggle 
}: { 
  todo: Todo; 
  onToggle: (id: string) => void 
}) {
  console.log('TodoItem rendered:', todo.id);
  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.done} 
        onChange={() => onToggle(todo.id)} 
      />
      {todo.text}
    </li>
  );
});

function TodoList({ todos }: { todos: Todo[] }) {
  const handleToggle = useCallback((id: string) => {
    // Update logic
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
        {/* Only re-renders when that specific todo changes */}
      ))}
    </ul>
  );
}`;

const ReactMemoComponent = () => {
  return (
    <TopicLayout
      title="React.memo"
      route="/react/react-memo"
      category="react"
      explanation="React.memo prevents re-renders when props haven't changed. BEFORE: child re-renders on every parent update. AFTER: child only re-renders when props change. Must combine with useMemo for objects and useCallback for functions. Use for expensive components that render often."
      code={reactMemoCode}
      codeFilename="react-memo.tsx"
      whyItMatters="Prevents unnecessary re-renders, improves performance. Interviewers ask: 'How to optimize React performance?', 'When to use React.memo?', 'Why memo doesn't work with objects?' Shows understanding of React rendering and optimization."
      mistakes={[
        "Memoizing everything: Adds overhead. Only memo expensive or frequently rendered components.",
        "Forgetting object/function references: New objects/functions break memoization.",
        "Not using with useMemo/useCallback: Memo alone doesn't help with non-primitive props.",
        "Custom comparison bugs: Wrong comparison logic causes stale UI or unnecessary renders.",
      ]}
      practiceTask="Create a list of 100 items where each item has a counter. Clicking parent button increments parent counter. Without memo, all items re-render. Add React.memo to items and verify only parent re-renders using React DevTools Profiler."
    >
      <MultiExampleEditor
        title="🎯 Try It: React.memo Before vs After"
        examples={[
          {
            title: "❌ WITHOUT React.memo",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #7f1d1d; color: white; min-height: 100vh; }
  .card { background: rgba(0,0,0,0.3); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 3px solid #ef4444; }
  button { background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px 5px; font-weight: 600; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(0,0,0,0.4); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 48px; font-weight: bold; color: #fca5a5; }
  .warning { background: #7f1d1d; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444; }
  .items { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0; max-height: 200px; overflow-y: auto; }
  .item { padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); }
</style>
</head>
<body>
  <div class="card">
    <h2>❌ WITHOUT React.memo (Slow)</h2>
    <button onclick="incrementParent()">Increment Parent Counter</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="parent">0</div><div>Parent Counter</div></div>
      <div class="stat"><div class="stat-value" id="childRenders">0</div><div>Child Renders</div></div>
    </div>
    <div class="warning">
      <strong>⚠️ Problem:</strong> All 10 children re-render when parent counter changes!
    </div>
    <div class="items" id="items"></div>
  </div>
  
  <script>
    let parentCount = 0;
    let childRenders = 0;
    
    function renderItems() {
      // ❌ Every child re-renders on parent update
      childRenders += 10;
      document.getElementById('childRenders').textContent = childRenders;
      
      let html = '';
      for (let i = 0; i < 10; i++) {
        html += '<div class="item">Child ' + (i + 1) + ' - Rendered ' + (childRenders / 10) + ' times</div>';
      }
      document.getElementById('items').innerHTML = html;
    }
    
    function incrementParent() {
      parentCount++;
      document.getElementById('parent').textContent = parentCount;
      // ❌ All children re-render even though their props didn't change
      renderItems();
    }
    
    renderItems();
  </script>
</body>
</html>`
          },
          {
            title: "✅ WITH React.memo",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #14532d; color: white; min-height: 100vh; }
  .card { background: rgba(0,0,0,0.3); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 3px solid #10b981; }
  button { background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px 5px; font-weight: 600; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(0,0,0,0.4); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 48px; font-weight: bold; color: #86efac; }
  .success { background: #14532d; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
  .items { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0; max-height: 200px; overflow-y: auto; }
  .item { padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); }
</style>
</head>
<body>
  <div class="card">
    <h2>✅ WITH React.memo (Fast)</h2>
    <button onclick="incrementParent()">Increment Parent Counter</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="parent">0</div><div>Parent Counter</div></div>
      <div class="stat"><div class="stat-value" id="childRenders">10</div><div>Child Renders</div></div>
    </div>
    <div class="success">
      <strong>✅ Optimized:</strong> Children don't re-render when parent counter changes!
    </div>
    <div class="items" id="items"></div>
  </div>
  
  <script>
    let parentCount = 0;
    let childRenders = 10; // Initial render only
    let itemsRendered = false;
    
    function renderItems() {
      if (itemsRendered) return; // ✅ Memoized - don't re-render
      
      let html = '';
      for (let i = 0; i < 10; i++) {
        html += '<div class="item">Child ' + (i + 1) + ' - Rendered only once!</div>';
      }
      document.getElementById('items').innerHTML = html;
      itemsRendered = true;
    }
    
    function incrementParent() {
      parentCount++;
      document.getElementById('parent').textContent = parentCount;
      // ✅ Children don't re-render! Props haven't changed
      // childRenders stays at 10
    }
    
    renderItems();
  </script>
</body>
</html>`
          },
          {
            title: "Object Props Problem",
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
</style>
</head>
<body>
  <div class="container">
    <h2>📦 Object Props: Problem & Solution</h2>
    <div class="comparison">
      <div class="box bad">
        <h3>❌ New Object Each Render</h3>
        <button onclick="incrementBad()">Increment</button>
        <div class="renders" id="badRenders">0</div>
        <small>Child Renders</small>
        <p style="font-size: 12px; opacity: 0.8;">⚠️ data={{ value: 'static' }} creates new object reference</p>
      </div>
      
      <div class="box good">
        <h3>✅ useMemo for Objects</h3>
        <button onclick="incrementGood()">Increment</button>
        <div class="renders" id="goodRenders">1</div>
        <small>Child Renders</small>
        <p style="font-size: 12px; opacity: 0.8;">✅ useMemo keeps same object reference</p>
      </div>
    </div>
  </div>
  
  <script>
    let badRenders = 0;
    let goodRenders = 1;
    
    function incrementBad() {
      // ❌ New object = child re-renders
      badRenders++;
      document.getElementById('badRenders').textContent = badRenders;
    }
    
    function incrementGood() {
      // ✅ Same object reference = no re-render
      // goodRenders stays at 1
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

export default ReactMemoComponent;