import { TopicLayout } from '@/components/TopicLayout';

const reactMemoCode = `// React.memo: Prevent unnecessary re-renders

// ✅ Basic React.memo usage
const ExpensiveComponent = React.memo(function ExpensiveComponent({ 
  data 
}: { 
  data: string 
}) {
  console.log('ExpensiveComponent rendered');
  return <div>{data}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data] = useState('static data');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} />
      {/* Only re-renders if data changes */}
    </div>
  );
}

// ✅ Custom comparison function
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
    return prevProps.user.id === nextProps.user.id;
  }
);

// ❌ React.memo doesn't help with object/array props
function BadExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={{ value: 'static' }} />
      {/* Re-renders every time! New object reference */}
    </div>
  );
}

// ✅ Combine React.memo with useMemo for object props
function GoodExample() {
  const [count, setCount] = useState(0);
  const data = useMemo(() => ({ value: 'static' }), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={data} />
      {/* Doesn't re-render! Same object reference */}
    </div>
  );
}

// ✅ React.memo with useCallback for function props
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

function Toolbar() {
  const [count, setCount] = useState(0);

  // ❌ New function every render
  const handleClick = () => console.log('clicked');

  // ✅ Stable function reference
  const handleClickMemo = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Button onClick={handleClickMemo} label="Save" />
      {/* Only renders once */}
    </div>
  );
}

// ✅ When to use React.memo
const ListItem = React.memo(function ListItem({ item }: { item: Item }) {
  // Use when:
  // 1. Component renders often with same props
  // 2. Rendering is expensive
  // 3. Props are primitive or stable references
  
  return <div>{item.name}</div>;
});

// ❌ Don't overuse React.memo
function SimpleComponent({ text }: { text: string }) {
  // Don't memo if:
  // 1. Component is cheap to render
  // 2. Props change frequently
  // 3. No performance issue
  
  return <span>{text}</span>;
}

// ✅ Memoizing list items
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        <MemoizedTodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

const MemoizedTodoItem = React.memo(function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <li>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </li>
  );
});`;

const ReactMemoComponent = () => {
  return (
    <TopicLayout
      title="React.memo"
      route="/react/react-memo"
      category="react"
      explanation="React.memo is HOC that memoizes component, skipping re-render if props haven't changed. Does shallow comparison by default. Combine with useMemo/useCallback for object/function props. Use for expensive components that render often with same props."
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
    />
  );
};

export default ReactMemoComponent;