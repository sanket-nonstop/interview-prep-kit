import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const reconciliationCode = `// Reconciliation & Virtual DOM: How React updates efficiently

// ✅ React compares Virtual DOM trees to minimize real DOM updates
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Counter</h1> {/* Not re-rendered if unchanged */}
      <p>Count: {count}</p> {/* Only this text node updates */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ✅ Keys help React identify elements across renders
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}> {/* Key helps React match elements */}
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
}

// ✅ Same component type = update, different type = unmount + mount
function ConditionalRender({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return <Dashboard />; // Different component = full remount
  }
  return <Login />; // State is lost when switching
}

// ✅ Same position = update (state preserved)
function BetterConditional({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <Login />}
      {/* Same position in tree = React tries to reuse */}
    </div>
  );
}

// ✅ Force remount with key
function ResetOnChange({ userId }: { userId: string }) {
  return (
    <UserProfile key={userId} userId={userId} />
    {/* New key = React unmounts old, mounts new */}
  );
}

// ✅ Reconciliation algorithm: breadth-first comparison
/*
Old tree:        New tree:
<div>            <div>
  <A />            <A />     ← Same type, update props
  <B />            <C />     ← Different type, unmount B, mount C
</div>           </div>

React assumptions:
1. Different types = different trees (full remount)
2. Keys identify elements across renders
3. Siblings compared by position
*/

// ✅ Efficient list updates with keys
function Messages({ messages }: { messages: Message[] }) {
  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}> {/* Stable key = efficient updates */}
          <span>{msg.text}</span>
          <MessageActions id={msg.id} />
        </div>
      ))}
    </div>
  );
}

// ❌ Bad: Changing component type loses state
function BadToggle({ show }: { show: boolean }) {
  if (show) {
    return <input type="text" />; // State lost on toggle
  }
  return null;
}

// ✅ Good: Keep component, hide with CSS
function GoodToggle({ show }: { show: boolean }) {
  return (
    <input
      type="text"
      style={{ display: show ? 'block' : 'none' }}
      // State preserved
    />
  );
}

// ✅ React Fiber: Incremental rendering
/*
React Fiber allows:
- Pause work and come back later
- Assign priority to different updates
- Reuse previously completed work
- Abort work if no longer needed

This enables:
- Concurrent rendering
- Suspense
- useTransition
- Time slicing
*/

// ✅ Understanding render phases
function Component() {
  console.log('Render phase'); // Pure, can be called multiple times
  
  useEffect(() => {
    console.log('Commit phase'); // Side effects, called once
  });
  
  return <div>Content</div>;
}`;

const Reconciliation = () => {
  return (
    <TopicLayout
      title="Reconciliation & Virtual DOM"
      route="/react/reconciliation"
      category="react"
      explanation="React creates Virtual DOM (JavaScript object tree), compares with previous version (diffing), calculates minimal changes, updates real DOM. Reconciliation algorithm uses keys and component types to efficiently identify what changed. React Fiber enables incremental rendering."
      code={reconciliationCode}
      codeFilename="reconciliation.tsx"
      whyItMatters="Understanding reconciliation explains React's performance and behavior. Interviewers ask: 'How does Virtual DOM work?', 'Why are keys important?', 'What is React Fiber?' Shows deep React knowledge beyond just using hooks."
      mistakes={[
        "Thinking Virtual DOM is always faster: It's about predictable performance, not raw speed.",
        "Changing component types unnecessarily: Causes full remount, loses state.",
        "Wrong keys: Breaks reconciliation, causes bugs and performance issues.",
        "Not understanding render vs commit: Side effects in render phase cause bugs.",
      ]}
      practiceTask="Create a list where items can be reordered. Add local state (input field) to each item. Test with index keys vs ID keys. Observe how state is preserved or lost during reordering. Explain why."
    />
  );
};

export default Reconciliation;