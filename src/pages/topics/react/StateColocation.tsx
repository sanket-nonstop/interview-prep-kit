import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const stateColocationCode = `// State Colocation vs Lifting State: Design decisions

// ✅ Colocation: Keep state close to where it's used
function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  // State only used here, keep it local
  
  return (
    <div>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </div>
  );
}

// ✅ Lifting state: Share state between siblings
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // Lifted to parent because both children need it
  
  return (
    <div>
      <TodoInput onAdd={(text) => setTodos([...todos, { id: Date.now(), text }])} />
      <TodoList todos={todos} onDelete={(id) => setTodos(todos.filter(t => t.id !== id))} />
    </div>
  );
}

// ❌ Bad: Lifting state unnecessarily
function BadParent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  // These states are independent, should be colocated
  
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Tooltip isOpen={isTooltipOpen} onClose={() => setIsTooltipOpen(false)} />
    </div>
  );
}

// ✅ Good: Colocate independent state
function GoodParent() {
  return (
    <div>
      <ModalWithState />
      <TooltipWithState />
    </div>
  );
}

function ModalWithState() {
  const [isOpen, setIsOpen] = useState(false);
  return <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}

// ✅ Lift state when siblings need to communicate
function SearchPage() {
  const [query, setQuery] = useState('');
  // Lifted because both SearchInput and SearchResults need it
  
  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <SearchResults query={query} />
    </div>
  );
}

// ✅ Colocation prevents unnecessary re-renders
function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function ExpensiveItem({ item }: { item: Item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Colocated: Only this item re-renders on toggle
  
  return (
    <div>
      <h3 onClick={() => setIsExpanded(!isExpanded)}>{item.title}</h3>
      {isExpanded && <div>{item.details}</div>}
    </div>
  );
}

// ✅ Lifting state to common ancestor
function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  // Lifted to common ancestor of Header and Sidebar
  
  return (
    <div>
      <Header user={user} />
      <Sidebar user={user} />
      <Content />
    </div>
  );
}

// ✅ Use Context when lifting gets too deep
const UserContext = createContext<User | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
      {/* No need to pass user through every level */}
    </UserContext.Provider>
  );
}

// ✅ Decision tree
/*
Keep state local if:
- Only one component uses it
- No siblings need to share it
- Performance matters (avoid parent re-renders)

Lift state if:
- Multiple siblings need it
- Parent needs to coordinate children
- State represents shared data

Use Context if:
- Many components at different levels need it
- Prop drilling becomes painful
- State is truly global (theme, auth, etc.)
*/`;

const StateColocation = () => {
  return (
    <TopicLayout
      title="State Colocation vs Lifting State"
      route="/react/state-colocation"
      category="react"
      explanation="Colocation: Keep state as close as possible to where it's used. Lifting: Move state up to common ancestor when siblings need to share. Colocation improves performance (fewer re-renders) and maintainability. Lift only when necessary for data sharing."
      code={stateColocationCode}
      codeFilename="state-colocation.tsx"
      whyItMatters="State placement affects performance and code organization. Interviewers ask: 'Where should state live?', 'When to lift state?', 'How to avoid prop drilling?' Shows understanding of React architecture and performance optimization."
      mistakes={[
        "Lifting everything to top: Causes unnecessary re-renders and prop drilling.",
        "Not lifting when needed: Duplicated state gets out of sync.",
        "Using Context too early: Context is for truly global state, not convenience.",
        "Ignoring performance: Lifted state causes all children to re-render.",
      ]}
      practiceTask="Create a form with multiple sections where each section has expand/collapse state. Keep expand state colocated. Lift form field values to parent for submission. Measure re-renders with React DevTools."
    />
  );
};

export default StateColocation;