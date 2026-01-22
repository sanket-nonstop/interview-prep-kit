import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default UseReducer;