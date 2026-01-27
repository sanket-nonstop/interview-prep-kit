import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Testing"
        examples={[
          {
            title: "Component Testing",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .test { background: #334155; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .pass { border-left: 4px solid #10b981; }
  .fail { border-left: 4px solid #ef4444; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; margin: 10px 0; background: #334155; color: white; }
</style>
</head>
<body>
  <div class="card">
    <h2>✅ Component Testing Demo</h2>
    <input id="testInput" placeholder="Type to test..." />
    <button onclick="runTests()">Run Tests</button>
    <div id="results"></div>
  </div>
  
  <script>
    function runTests() {
      const input = document.getElementById('testInput');
      const results = document.getElementById('results');
      const tests = [];
      
      // Test 1: Input exists
      tests.push({
        name: 'Input element exists',
        pass: input !== null
      });
      
      // Test 2: Input has placeholder
      tests.push({
        name: 'Input has placeholder text',
        pass: input.placeholder === 'Type to test...'
      });
      
      // Test 3: Input accepts text
      input.value = 'test';
      tests.push({
        name: 'Input accepts user input',
        pass: input.value === 'test'
      });
      
      results.innerHTML = tests.map(test => \`
        <div class="test \${test.pass ? 'pass' : 'fail'}">
          \${test.pass ? '✅' : '❌'} \${test.name}
        </div>
      \`).join('');
    }
  </script>
</body>
</html>`
          },
          {
            title: "Test Coverage",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; text-align: center; }
  .value { font-size: 48px; font-weight: bold; color: #10b981; }
  .label { font-size: 14px; opacity: 0.8; }
</style>
</head>
<body>
  <div class="card">
    <h2>📊 Test Coverage</h2>
    <div class="stats">
      <div class="stat">
        <div class="value">95%</div>
        <div class="label">Code Coverage</div>
      </div>
      <div class="stat">
        <div class="value">42</div>
        <div class="label">Tests Passing</div>
      </div>
    </div>
    <p style="font-size: 14px; opacity: 0.8;">✅ High test coverage ensures code reliability and prevents regressions</p>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Testing;