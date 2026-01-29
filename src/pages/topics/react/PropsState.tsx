import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Props & State"
        examples={[
          {
            title: "Props: Parent → Child",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; min-height: 100vh; }
  .app { max-width: 600px; margin: 0 auto; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  .user { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin: 10px 0; }
  .flow { text-align: center; font-size: 40px; margin: 20px 0; animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  .parent { background: rgba(255,255,255,0.3); padding: 20px; border-radius: 12px; border: 3px dashed white; }
  .children { margin-top: 20px; }
</style>
</head>
<body>
  <div class="app">
    <div class="card">
      <h2>📤 Props Flow: Parent → Child</h2>
      <div class="parent">
        <strong>👨‍👩‍👧 PARENT COMPONENT</strong>
        <input id="nameInput" placeholder="Enter name..." oninput="updateName()" />
        <input id="ageInput" type="number" placeholder="Enter age..." oninput="updateName()" />
      </div>
      <div class="flow">⬇️</div>
      <div class="children" id="children"></div>
    </div>
  </div>
  
  <script>
    let userName = 'Guest';
    let userAge = 25;
    
    function UserGreeting({ name, age }) {
      return \`<div class="user">👋 Hello, \${name}! (Age: \${age})</div>\`;
    }
    
    function UserProfile({ name, age }) {
      return \`<div class="user">👤 Profile: \${name}, \${age} years old</div>\`;
    }
    
    function updateName() {
      userName = document.getElementById('nameInput').value || 'Guest';
      userAge = document.getElementById('ageInput').value || 25;
      render();
    }
    
    function render() {
      document.getElementById('children').innerHTML = 
        '<strong>👶 CHILD COMPONENTS (receiving props)</strong>' +
        UserGreeting({ name: userName, age: userAge }) + 
        UserProfile({ name: userName, age: userAge });
    }
    
    render();
  </script>
</body>
</html>`
          },
          {
            title: "Child → Parent (Lifting State)",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .app { max-width: 600px; margin: 0 auto; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; }
  .parent { background: rgba(255,255,255,0.3); padding: 20px; border-radius: 12px; border: 3px dashed white; margin-top: 20px; }
  .child { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin: 10px 0; border: 2px solid white; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: bold; }
  .flow { text-align: center; font-size: 40px; margin: 10px 0; animation: bounce 1s infinite; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .total { font-size: 32px; font-weight: bold; margin: 15px 0; }
</style>
</head>
<body>
  <div class="app">
    <div class="card">
      <h2>📥 Child → Parent: Lifting State Up</h2>
      <div class="child">
        <strong>👶 CHILD 1: Product A</strong>
        <div>Price: $50</div>
        <button onclick="addToCart('Product A', 50)">Add to Cart</button>
      </div>
      <div class="child">
        <strong>👶 CHILD 2: Product B</strong>
        <div>Price: $30</div>
        <button onclick="addToCart('Product B', 30)">Add to Cart</button>
      </div>
      <div class="child">
        <strong>👶 CHILD 3: Product C</strong>
        <div>Price: $20</div>
        <button onclick="addToCart('Product C', 20)">Add to Cart</button>
      </div>
      <div class="flow">⬆️</div>
      <div class="parent">
        <strong>👨‍👩‍👧 PARENT: Shopping Cart</strong>
        <div class="total">Total: $<span id="total">0</span></div>
        <div id="items">Cart is empty</div>
        <button onclick="clearCart()" style="background: #ef4444; color: white; margin-top: 10px;">Clear Cart</button>
      </div>
    </div>
  </div>
  
  <script>
    let cart = [];
    let total = 0;
    
    function addToCart(name, price) {
      cart.push({ name, price });
      total += price;
      render();
    }
    
    function clearCart() {
      cart = [];
      total = 0;
      render();
    }
    
    function render() {
      document.getElementById('total').textContent = total;
      document.getElementById('items').innerHTML = cart.length === 0
        ? 'Cart is empty'
        : cart.map((item, i) => \`<div>\${i + 1}. \${item.name} - $\${item.price}</div>\`).join('');
    }
  </script>
</body>
</html>`
          },
          {
            title: "State Management",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 500px; margin: 0 auto; }
  .todo-input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; margin: 10px 0; background: #1e293b; color: white; font-size: 16px; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  .todo { background: #1e293b; padding: 12px; border-radius: 8px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; }
  .delete { background: #ef4444; }
  .stats { background: #1e293b; padding: 15px; border-radius: 8px; margin: 15px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
</style>
</head>
<body>
  <div class="container">
    <h2>📋 State: Todo List</h2>
    <input class="todo-input" id="todoInput" placeholder="Add todo..." onkeypress="if(event.key==='Enter') addTodo()" />
    <button onclick="addTodo()">Add</button>
    <div class="stats">
      <div>Total: <strong id="totalCount">0</strong></div>
      <div>Completed: <strong id="completedCount">0</strong></div>
    </div>
    <div id="todos"></div>
  </div>
  
  <script>
    let todos = [];
    
    function addTodo() {
      const input = document.getElementById('todoInput');
      const text = input.value.trim();
      if (!text) return;
      
      todos = [...todos, { id: Date.now(), text, completed: false }];
      input.value = '';
      render();
    }
    
    function toggleTodo(id) {
      todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t);
      render();
    }
    
    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      render();
    }
    
    function render() {
      const completed = todos.filter(t => t.completed).length;
      document.getElementById('totalCount').textContent = todos.length;
      document.getElementById('completedCount').textContent = completed;
      
      document.getElementById('todos').innerHTML = todos.length === 0
        ? '<p style="opacity:0.6;">No todos yet!</p>'
        : todos.map(todo => \`
          <div class="todo" style="opacity: \${todo.completed ? 0.5 : 1}; text-decoration: \${todo.completed ? 'line-through' : 'none'};">
            <span onclick="toggleTodo(\${todo.id})" style="cursor: pointer;">\${todo.completed ? '✅' : '⭕'} \${todo.text}</span>
            <button class="delete" onclick="deleteTodo(\${todo.id})">Delete</button>
          </div>
        \`).join('');
    }
    
    render();
  </script>
</body>
</html>`
          },
          {
            title: "Counter with Step",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .counter { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px; text-align: center; }
  .count { font-size: 80px; font-weight: bold; margin: 20px 0; }
  button { background: white; color: #667eea; border: none; padding: 15px 30px; border-radius: 10px; font-size: 18px; cursor: pointer; margin: 5px; font-weight: bold; }
  input { width: 80px; padding: 10px; border: none; border-radius: 8px; text-align: center; font-size: 18px; margin: 10px; }
</style>
</head>
<body>
  <div class="counter">
    <h2>🔢 Counter</h2>
    <div class="count" id="count">0</div>
    <div>
      <button onclick="decrement()">-</button>
      <button onclick="increment()">+</button>
    </div>
    <div>
      <label>Step: <input type="number" id="step" value="1" min="1" /></label>
    </div>
    <button onclick="reset()" style="background: #ef4444; color: white; margin-top: 20px;">Reset</button>
  </div>
  
  <script>
    let count = 0;
    
    function getStep() {
      return parseInt(document.getElementById('step').value) || 1;
    }
    
    function increment() {
      count += getStep();
      render();
    }
    
    function decrement() {
      count -= getStep();
      render();
    }
    
    function reset() {
      count = 0;
      render();
    }
    
    function render() {
      document.getElementById('count').textContent = count;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Form State with Preview",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #eee; min-height: 100vh; }
  .form-container { max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); padding: 30px; border-radius: 15px; border: 2px solid rgba(255,255,255,0.1); }
  input, select { width: 100%; padding: 14px; border: 2px solid #0f3460; border-radius: 8px; margin: 8px 0; background: #0f3460; color: white; font-size: 16px; box-sizing: border-box; }
  input:focus, select:focus { outline: none; border-color: #e94560; }
  button { width: 100%; background: linear-gradient(135deg, #e94560 0%, #d63447 100%); color: white; border: none; padding: 16px; border-radius: 8px; font-size: 18px; cursor: pointer; margin-top: 15px; font-weight: bold; }
  button:hover { transform: scale(1.02); }
  .output { background: rgba(15, 52, 96, 0.5); padding: 20px; border-radius: 8px; margin-top: 20px; border: 2px solid #0f3460; min-height: 100px; }
  .label { font-size: 14px; color: #aaa; margin-top: 10px; display: block; }
  h2 { margin-top: 0; }
</style>
</head>
<body>
  <div class="form-container">
    <h2>📝 Form State with Live Preview</h2>
    <label class="label">Name</label>
    <input id="name" placeholder="Enter your name" oninput="updatePreview()" />
    
    <label class="label">Email</label>
    <input id="email" type="email" placeholder="Enter your email" oninput="updatePreview()" />
    
    <label class="label">Role</label>
    <select id="role" onchange="updatePreview()">
      <option value="">Select your role</option>
      <option value="developer">👨‍💻 Developer</option>
      <option value="designer">🎨 Designer</option>
      <option value="manager">👔 Manager</option>
      <option value="student">🎓 Student</option>
    </select>
    
    <button onclick="submit()">Submit Form</button>
    
    <div class="output" id="preview">
      <strong>📋 Live Preview:</strong><br><br>
      Fill the form to see preview...
    </div>
  </div>
  
  <script>
    function updatePreview() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const role = document.getElementById('role').value;
      const roleText = document.getElementById('role').selectedOptions[0]?.text || '(not selected)';
      
      document.getElementById('preview').innerHTML = \`
        <strong>📋 Live Preview:</strong><br><br>
        <strong>Name:</strong> \${name || '<em style="opacity:0.5;">(empty)</em>'}<br>
        <strong>Email:</strong> \${email || '<em style="opacity:0.5;">(empty)</em>'}<br>
        <strong>Role:</strong> \${role ? roleText : '<em style="opacity:0.5;">(not selected)</em>'}
      \`;
    }
    
    function submit() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const role = document.getElementById('role').value;
      
      if (!name || !email || !role) {
        alert('⚠️ Please fill all fields!');
        return;
      }
      
      alert(\`✅ Form Submitted Successfully!\n\nName: \${name}\nEmail: \${email}\nRole: \${document.getElementById('role').selectedOptions[0].text}\`);
      
      // Reset form
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('role').value = '';
      updatePreview();
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

export default PropsState;