import { TopicLayout } from '@/components/TopicLayout';

const propsStateCode = `// React Props & State: Data flow and component communication

// ✅ Props - Data passed from parent to child
interface UserProps {
  name: string;
  age: number;
  email?: string; // Optional prop
  isActive?: boolean;
  onUserClick?: (userId: string) => void; // Function prop
}

const UserProfile: React.FC<UserProps> = ({ 
  name, 
  age, 
  email, 
  isActive = true, // Default value
  onUserClick 
}) => {
  const handleClick = () => {
    if (onUserClick) {
      onUserClick(\`user-\${name.toLowerCase()}\`);
    }
  };
  
  return (
    <div 
      className={\`user-profile \${isActive ? 'active' : 'inactive'}\`}
      onClick={handleClick}
    >
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
      <span className="status">
        {isActive ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

// ✅ State - Component's internal data
const Counter: React.FC = () => {
  // State with initial value
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  // State with object
  const [user, setUser] = useState({
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });
  
  // Updating state
  const increment = () => {
    setCount(prevCount => prevCount + step); // Functional update
  };
  
  const decrement = () => {
    setCount(count - step); // Direct update (less preferred)
  };
  
  // Updating object state
  const updateUserName = (newName: string) => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName
    }));
  };
  
  // Updating nested object state
  const toggleTheme = () => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        theme: prevUser.preferences.theme === 'light' ? 'dark' : 'light'
      }
    }));
  };
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <p>Step: {step}</p>
      
      <div>
        <button onClick={decrement}>-{step}</button>
        <button onClick={increment}>+{step}</button>
      </div>
      
      <div>
        <label>
          Step size:
          <input 
            type="number" 
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
      </div>
      
      <div>
        <p>User: {user.name}</p>
        <p>Theme: {user.preferences.theme}</p>
        <button onClick={() => updateUserName('Alice')}>Set Name</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
};

// ✅ Props drilling and lifting state up
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  };
  
  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      {/* Pass functions as props */}
      <AddTodoForm onAddTodo={addTodo} />
      
      <FilterButtons 
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      
      <TodoList 
        todos={filteredTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
      
      <TodoStats todos={todos} />
    </div>
  );
};

// Child components receiving props
const AddTodoForm: React.FC<{ onAddTodo: (text: string) => void }> = ({ 
  onAddTodo 
}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

const FilterButtons: React.FC<{
  currentFilter: string;
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ] as const;
  
  return (
    <div className="filter-buttons">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={currentFilter === key ? 'active' : ''}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// ✅ Derived state (computed from props/state)
const TodoStats: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  // These are derived values, not state
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage = totalTodos > 0 
    ? Math.round((completedTodos / totalTodos) * 100) 
    : 0;
  
  return (
    <div className="todo-stats">
      <p>Total: {totalTodos}</p>
      <p>Active: {activeTodos}</p>
      <p>Completed: {completedTodos}</p>
      <p>Progress: {completionPercentage}%</p>
    </div>
  );
};

// ✅ Controlled vs Uncontrolled components
const ControlledInput: React.FC = () => {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value} // Controlled by React state
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const UncontrolledInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current?.value); // Access DOM directly
  };
  
  return (
    <div>
      <input ref={inputRef} defaultValue="Initial value" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// ✅ Props validation with TypeScript
interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant, 
  size = 'medium', 
  disabled = false, 
  onClick 
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`;

const PropsState = () => {
  return (
    <TopicLayout
      title="Props & State"
      route="/react/props-state"
      category="react"
      explanation="Props are read-only data passed from parent to child components. State is mutable data managed within a component. Props enable component communication, while state enables interactivity. Understanding data flow is crucial for React architecture."
      code={propsStateCode}
      codeFilename="props-state.tsx"
      whyItMatters="Props and state are fundamental to React's data flow. Interviewers test understanding of component communication, state updates, lifting state up, and when to use props vs state. Essential for building interactive React applications."
      mistakes={[
        "Mutating props - props should never be modified directly.",
        "Not using functional updates for state - can cause stale state issues.",
        "Putting derived data in state - calculate from existing props/state instead.",
        "Not lifting state up when multiple components need the same data.",
      ]}
      practiceTask="Build a multi-step form where each step is a separate component. Manage form data in parent component and pass down as props. Include validation and the ability to go back/forward between steps."
    />
  );
};

export default PropsState;