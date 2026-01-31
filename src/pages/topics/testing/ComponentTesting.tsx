import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const componentTestingCode = `// Component Testing: Testing React components with React Testing Library

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// ✅ Component Under Test
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => (
  <button
    className={\`btn btn-\${variant}\`}
    onClick={onClick}
    disabled={disabled}
    aria-disabled={disabled}
  >
    {children}
  </button>
);

// ✅ Basic Component Tests
describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct aria attributes when disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
});

// ✅ Testing Form Components
const LoginForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Password"
      />
      {error && <p role="alert">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('shows error when fields are empty', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.getByRole('alert')).toHaveTextContent('All fields are required');
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});

// ✅ Testing Async Components
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

describe('UserList', () => {
  it('shows loading state initially', () => {
    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders users after loading', async () => {
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

// ✅ Query Priority (Best Practices)
// 1. getByRole - Accessible to everyone
// 2. getByLabelText - Form inputs
// 3. getByPlaceholderText - When no label
// 4. getByText - Non-interactive elements
// 5. getByTestId - Last resort`;

const ComponentTesting = () => {
  return (
    <TopicLayout
      title="React Component Testing"
      route="/testing/react/component-testing"
      category="testing"
      explanation="React Testing Library focuses on testing components from a user's perspective. Query elements by accessibility roles, simulate user interactions with userEvent, and assert on what the user sees - not implementation details."
      code={componentTestingCode}
      codeFilename="component.test.tsx"
      whyItMatters="Component testing is essential for React interviews. Interviewers test: query priorities (getByRole first), user interactions, async testing patterns, and accessibility testing. Shows you understand testing from the user's perspective."
      mistakes={[
        "Using getByTestId first: Prefer accessible queries like getByRole",
        "Using fireEvent over userEvent: userEvent simulates real user behavior",
        "Not awaiting async operations: Use waitFor for async state changes",
        "Testing CSS classes: Test visible behavior, not implementation"
      ]}
      practiceTask="Write comprehensive tests for a modal component: test opening/closing, focus trap, escape key handling, backdrop click, and proper ARIA attributes. Use userEvent for all interactions."
    >
      <MultiExampleEditor
        title="🎯 Try It: Component Testing"
        examples={[
          {
            title: "Testing Queries",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 700px; margin: 0 auto; }
  .priority { display: flex; align-items: center; gap: 12px; padding: 12px; margin: 8px 0; border-radius: 8px; }
  .priority.best { background: #064e3b; border-left: 4px solid #10b981; }
  .priority.ok { background: #1e3a5f; border-left: 4px solid #3b82f6; }
  .priority.avoid { background: #7f1d1d; border-left: 4px solid #ef4444; }
  .num { background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 50%; font-weight: bold; }
  code { background: #334155; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
</style>
</head>
<body>
  <div class="card">
    <h2>🎯 Query Priority</h2>
    <p style="color: #94a3b8; margin-bottom: 20px;">Always prefer accessible queries</p>
    
    <div class="priority best">
      <span class="num">1</span>
      <code>getByRole</code>
      <span>- Accessible to everyone</span>
    </div>
    
    <div class="priority best">
      <span class="num">2</span>
      <code>getByLabelText</code>
      <span>- Form inputs with labels</span>
    </div>
    
    <div class="priority ok">
      <span class="num">3</span>
      <code>getByPlaceholderText</code>
      <span>- When no label available</span>
    </div>
    
    <div class="priority ok">
      <span class="num">4</span>
      <code>getByText</code>
      <span>- Non-interactive elements</span>
    </div>
    
    <div class="priority avoid">
      <span class="num">5</span>
      <code>getByTestId</code>
      <span>- Last resort only!</span>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default ComponentTesting;