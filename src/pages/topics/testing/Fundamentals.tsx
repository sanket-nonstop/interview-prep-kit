import { TopicLayout } from '@/components/TopicLayout';

const testingCode = `// Testing Fundamentals: Unit and integration testing for React

// ✅ React Testing Library - Component testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// ✅ Component tests
describe('LoginForm', () => {
  test('renders login form elements', () => {
    render(<LoginForm />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
  
  test('updates input values when typing', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
  
  test('shows loading state during submission', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    await user.click(submitButton);
    
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});

// ✅ Custom hook testing
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
};

// Test custom hook
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  test('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});

// ✅ Mocking API calls
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'John Doe', email: 'john@example.com' }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ✅ Integration test with API
test('displays user data after loading', async () => {
  render(<UserList />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

// ✅ Snapshot testing
test('renders correctly', () => {
  const tree = renderer
    .create(<Button variant="primary">Click me</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// ✅ Testing context providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
);

test('uses theme context', () => {
  render(<ThemedComponent />, { wrapper: TestWrapper });
  expect(screen.getByText('Dark theme')).toBeInTheDocument();
});`;

const Testing = () => {
  return (
    <TopicLayout
      title="Testing Fundamentals"
      route="/testing/fundamentals"
      category="javascript"
      explanation="Frontend testing ensures code reliability and prevents regressions. Use React Testing Library for component testing, Jest for unit tests, MSW for API mocking, and focus on testing user behavior rather than implementation details."
      code={testingCode}
      codeFilename="testing.test.tsx"
      whyItMatters="Testing is crucial for code quality and confidence in deployments. Interviewers test understanding of testing strategies, mocking, and best practices. Essential for maintaining large applications and preventing bugs in production."
      mistakes={[
        "Testing implementation details instead of user behavior - tests become brittle.",
        "Not mocking external dependencies - tests become slow and unreliable.",
        "Writing tests that don't add value - focus on critical user paths.",
        "Ignoring accessibility in tests - missing important user experience issues.",
      ]}
      practiceTask="Write comprehensive tests for a todo app including component tests, custom hook tests, API integration tests with MSW, and accessibility testing with jest-axe."
    />
  );
};

export default Testing;