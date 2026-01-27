import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const reactTSCode = `// React + TypeScript: Type-safe component patterns

// ✅ Functional Component with Props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  disabled = false,
  onClick,
  children 
}) => {
  return (
    <button 
      className={\`btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ✅ Generic Components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage with type inference
<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id}
/>

// ✅ Custom Hooks with TypeScript
interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(
  asyncFn: () => Promise<T>
): UseAsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await asyncFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  };

  return { ...state, execute };
}

// Usage
const { data, loading, error, execute } = useAsync(() => 
  fetch('/api/users').then(r => r.json())
);

// ✅ Form Handling with TypeScript
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form is fully typed!
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={form.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <input
        type="checkbox"
        checked={form.rememberMe}
        onChange={(e) => handleChange('rememberMe', e.target.checked)}
      />
    </form>
  );
}

// ✅ Context API with TypeScript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// ✅ Ref Types
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focus = () => {
    inputRef.current?.focus(); // Optional chaining for safety
  };
  
  return <input ref={inputRef} />;
}

// ✅ Event Handler Types
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  console.log(e.currentTarget); // Typed as HTMLButtonElement
};

const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  console.log(e.target.value); // Typed correctly
};

// ✅ Children Prop Patterns
interface CardProps {
  children: React.ReactNode; // Any renderable content
}

interface RenderPropProps {
  children: (data: User) => React.ReactNode; // Render prop
}

interface StrictChildrenProps {
  children: React.ReactElement<ButtonProps>; // Only Button components
}`;

const ReactTypeScript = () => {
  return (
    <TopicLayout
      title="React + TypeScript Patterns"
      route="/typescript/react/patterns"
      category="typescript"
      explanation="Type-safe React patterns: component props, generic components, custom hooks, form handling, Context API, refs, and event handlers. TypeScript catches prop errors, provides autocomplete, and documents component APIs."
      code={reactTSCode}
      codeFilename="ReactTypeScript.tsx"
      whyItMatters="React + TypeScript is industry standard. Interviewers test: generic components, custom hook typing, form handling, and Context API. Shows you can build maintainable, self-documenting component libraries. Critical for design systems."
      mistakes={[
        "Using React.FC unnecessarily: Just use function Component(props: Props)",
        "Not typing event handlers: Use React.MouseEventHandler, etc.",
        "Forgetting null checks on refs: Always use optional chaining",
        "Any in Context: Create proper context types with undefined check"
      ]}
      practiceTask="Build a type-safe data table component: Generic Table<T> with sortable columns, filterable rows, pagination, and row selection. Include custom hooks for table state and full TypeScript inference."
    >
      <MultiExampleEditor
        title="🎯 Try It: React + TypeScript"
        examples={[
          {
            title: "Typed Component",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial; padding: 40px; background: #f0f4f8; }
    .card { background: white; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .btn { padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 5px; }
    .btn-primary { background: #3B82F6; color: white; }
    .btn-danger { background: #EF4444; color: white; }
    .btn:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;
    
    // TypeScript would enforce these prop types
    function Button({ variant, children, onClick }) {
      return (
        <button 
          className={\`btn btn-\${variant}\`}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }
    
    function App() {
      const [count, setCount] = useState(0);
      
      return (
        <div className="card">
          <h2>⚛️ React + TypeScript</h2>
          <p>Count: {count}</p>
          <Button 
            variant="primary" 
            onClick={() => setCount(count + 1)}
          >
            Increment
          </Button>
          <Button 
            variant="danger" 
            onClick={() => setCount(0)}
          >
            Reset
          </Button>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
            ✅ TypeScript ensures correct props at compile time
          </p>
        </div>
      );
    }
    
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default ReactTypeScript;
