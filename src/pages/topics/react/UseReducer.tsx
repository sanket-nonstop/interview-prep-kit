import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const useReducerCode = `// useReducer: Complex state logic with actions

// ✅ Basic counter with useReducer
type CounterAction = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
    default: return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

// ✅ Complex form state management
type FormState = {
  name: string;
  email: string;
  errors: Record<string, string>;
  isSubmitting: boolean;
};

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { name: '', email: '', errors: {}, isSubmitting: false };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, errors: { form: action.error } };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    errors: {},
    isSubmitting: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });
    
    try {
      await submitForm(state);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
      />
      <button disabled={state.isSubmitting}>Submit</button>
    </form>
  );
}

// ✅ Todo app with useReducer
type Todo = { id: number; text: string; completed: boolean };
type TodoAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'DELETE'; id: number };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    dispatch({ type: 'ADD', text: input });
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE', id: todo.id })}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ useReducer with context for global state
const TodoContext = createContext<{
  state: Todo[];
  dispatch: React.Dispatch<TodoAction>;
} | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}`;

const UseReducer = () => {
  return (
    <TopicLayout
      title="useReducer Hook"
      route="/react/hooks/useReducer"
      category="react"
      explanation="useReducer manages complex state logic with actions. Better than useState when: multiple related state values, complex updates, or need to track state changes. Reducer is pure function: (state, action) => newState. Similar to Redux but local to component."
      code={useReducerCode}
      codeFilename="useReducer.tsx"
      whyItMatters="Essential for complex state management without external libraries. Interviewers ask: 'When useReducer vs useState?', 'How to structure actions?', 'useReducer with Context?' Shows understanding of state management patterns."
      mistakes={[
        "Using for simple state: useState is simpler for single values or booleans.",
        "Mutating state: Reducer must return new state, not modify existing.",
        "Missing action types: TypeScript unions ensure all actions are handled.",
        "Not using with Context: useReducer + Context is powerful for global state.",
      ]}
      practiceTask="Create a shopping cart with useReducer: add item, remove item, update quantity, apply coupon, calculate total. Use TypeScript for action types. Combine with Context to share cart state across components."
    >
      <MultiExampleEditor
        title="🎯 Try It: useReducer Hook"
        examples={[
          {
            title: "Counter with Actions",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 400px; margin: 0 auto; text-align: center; }
  .count { font-size: 72px; font-weight: bold; color: #3b82f6; margin: 20px 0; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .reset { background: #ef4444; }
  .reset:hover { background: #dc2626; }
  .history { background: #334155; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: left; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h2>🔢 useReducer Counter</h2>
    <div class="count" id="count">0</div>
    <button onclick="dispatch('increment')">+1</button>
    <button onclick="dispatch('decrement')">-1</button>
    <button onclick="dispatch('increment5')">+5</button>
    <button class="reset" onclick="dispatch('reset')">Reset</button>
    <div class="history" id="history"></div>
  </div>
  
  <script>
    let state = { count: 0, history: [] };
    
    function reducer(state, action) {
      const newHistory = [...state.history, action].slice(-5);
      
      switch(action) {
        case 'increment':
          return { count: state.count + 1, history: newHistory };
        case 'decrement':
          return { count: state.count - 1, history: newHistory };
        case 'increment5':
          return { count: state.count + 5, history: newHistory };
        case 'reset':
          return { count: 0, history: [...newHistory] };
        default:
          return state;
      }
    }
    
    function dispatch(action) {
      state = reducer(state, action);
      render();
    }
    
    function render() {
      document.getElementById('count').textContent = state.count;
      document.getElementById('history').innerHTML = 
        '<strong>Action History:</strong><br>' + 
        state.history.map(a => '• ' + a).join('<br>');
    }
    
    render();
  </script>
</body>
</html>`
          },
          {
            title: "Todo with useReducer",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .todo { background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; }
  .todo.done { opacity: 0.6; text-decoration: line-through; }
  .delete { background: #ef4444; color: white; }
</style>
</head>
<body>
  <div class="card">
    <h2>✅ Todo with useReducer</h2>
    <input id="todoInput" placeholder="Add a todo..." onkeypress="if(event.key==='Enter') dispatch({type:'add'})" />
    <button onclick="dispatch({type:'add'})">Add Todo</button>
    <div id="todos"></div>
  </div>
  
  <script>
    let state = { todos: [] };
    
    function reducer(state, action) {
      switch(action.type) {
        case 'add':
          const text = document.getElementById('todoInput').value;
          if (!text.trim()) return state;
          return {
            todos: [...state.todos, { id: Date.now(), text, done: false }]
          };
        case 'toggle':
          return {
            todos: state.todos.map(t => 
              t.id === action.id ? {...t, done: !t.done} : t
            )
          };
        case 'delete':
          return {
            todos: state.todos.filter(t => t.id !== action.id)
          };
        default:
          return state;
      }
    }
    
    function dispatch(action) {
      state = reducer(state, action);
      if (action.type === 'add') document.getElementById('todoInput').value = '';
      render();
    }
    
    function render() {
      document.getElementById('todos').innerHTML = state.todos.length === 0 
        ? '<p>No todos yet!</p>'
        : state.todos.map(todo => \`
          <div class="todo \${todo.done ? 'done' : ''}">
            <span onclick="dispatch({type:'toggle',id:\${todo.id}})" style="cursor:pointer;flex:1">
              \${todo.done ? '✅' : '⚪'} \${todo.text}
            </span>
            <button class="delete" onclick="dispatch({type:'delete',id:\${todo.id}})">Delete</button>
          </div>
        \`).join('');
    }
    
    render();
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default UseReducer;