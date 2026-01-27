import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const errorHandlingCode = `// Error Handling: Robust error management in React

// ✅ Error Boundary for catching React errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
    reportError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }
    
    return this.props.children;
  }
}

// ✅ Modern Error Boundary with hook
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App: React.FC = () => (
  <ReactErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error, errorInfo) => {
      console.error('Error:', error);
      reportError(error, errorInfo);
    }}
    onReset={() => {
      // Clear any error state
      window.location.reload();
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </ReactErrorBoundary>
);

// ✅ Custom error hook
const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);
  
  const handleError = useCallback((error: Error) => {
    setError(error);
    console.error('Error handled:', error);
    
    // Report to error service
    reportError(error);
    
    // Show toast notification
    toast.error(error.message);
  }, []);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  return { error, handleError, clearError };
};

// ✅ API error handling
const useApiCall = <T,>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Handle different error types
      if (err instanceof TypeError) {
        console.error('Network error:', err);
      } else if (err instanceof SyntaxError) {
        console.error('JSON parsing error:', err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return { data, loading, error, execute };
};

// ✅ Form validation errors
const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  const validate = (field: keyof T, value: any) => {
    const rule = validationRules[field];
    const error = rule ? rule(value) : null;
    
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
    
    return !error;
  };
  
  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      validate(field, value);
    }
  };
  
  const handleBlur = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate(field, values[field]);
  };
  
  const validateAll = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field as keyof T](values[field as keyof T]);
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({
      ...acc,
      [key]: true,
    }), {}));
    
    return isValid;
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
  };
};

// ✅ Global error reporting
const reportError = (error: Error, errorInfo?: any) => {
  // Send to error tracking service (Sentry, LogRocket, etc.)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { extra: errorInfo });
    
    // Or custom error service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        ...errorInfo,
      }),
    }).catch(console.error);
  }
};

// ✅ Component with comprehensive error handling
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { error, handleError, clearError } = useErrorHandler();
  const { data: user, loading, error: apiError, execute } = useApiCall(
    () => fetch(\`/api/users/\${userId}\`).then(res => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
      return res.json();
    })
  );
  
  useEffect(() => {
    execute().catch(handleError);
  }, [userId]);
  
  useEffect(() => {
    if (apiError) {
      handleError(new Error(apiError));
    }
  }, [apiError, handleError]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="error-state">
      <p>Error: {error.message}</p>
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
  
  return <div>User: {user?.name}</div>;
};`;

const ErrorHandling = () => {
  return (
    <TopicLayout
      title="Error Handling"
      route="/react/error-handling"
      category="react"
      explanation="Robust error handling includes Error Boundaries for React errors, try-catch for async operations, form validation, and global error reporting. Use different strategies for different error types and always provide user-friendly error messages."
      code={errorHandlingCode}
      codeFilename="error-handling.tsx"
      whyItMatters="Error handling is crucial for user experience and debugging. Interviewers test understanding of Error Boundaries, async error handling, and error reporting strategies. Essential for building reliable, production-ready applications."
      mistakes={[
        "Not using Error Boundaries - unhandled errors crash the entire app.",
        "Swallowing errors silently - makes debugging impossible.",
        "Not providing user-friendly error messages - confuses users.",
        "Not implementing error reporting - missing critical production issues.",
      ]}
      practiceTask="Build a form with comprehensive error handling: validation errors, API errors, network errors, and Error Boundaries. Implement error reporting and user-friendly error states."
    >
      <MultiExampleEditor
        title="🎯 Try It: Error Handling"
        examples={[
          {
            title: "Try-Catch Error Handling",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .error { background: #7f1d1d; border: 2px solid #ef4444; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .success { background: #14532d; border: 2px solid #10b981; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .loading { color: #f59e0b; }
</style>
</head>
<body>
  <div class="container">
    <h2>⚠️ Error Handling Demo</h2>
    <button onclick="fetchSuccess()">Successful Request</button>
    <button onclick="fetchError()">Failed Request</button>
    <button onclick="throwError()">Throw Error</button>
    <div id="output"></div>
  </div>
  
  <script>
    async function fetchSuccess() {
      const output = document.getElementById('output');
      output.innerHTML = '<p class="loading">Loading...</p>';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const data = await response.json();
        output.innerHTML = '<div class="success">✅ Success!<br>User: ' + data.name + '</div>';
      } catch (error) {
        output.innerHTML = '<div class="error">❌ Error: ' + error.message + '</div>';
      }
    }
    
    async function fetchError() {
      const output = document.getElementById('output');
      output.innerHTML = '<p class="loading">Loading...</p>';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid');
        if (!response.ok) throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        const data = await response.json();
        output.innerHTML = '<div class="success">Success</div>';
      } catch (error) {
        output.innerHTML = '<div class="error">❌ Caught Error!<br>' + error.message + '<br><br>Always use try-catch with async/await!</div>';
      }
    }
    
    function throwError() {
      const output = document.getElementById('output');
      try {
        throw new Error('Custom error thrown!');
      } catch (error) {
        output.innerHTML = '<div class="error">❌ Caught: ' + error.message + '</div>';
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Form Validation Errors",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid transparent; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  input.error { border-color: #ef4444; }
  .error-msg { color: #fca5a5; font-size: 14px; margin: -5px 0 10px 0; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; margin-top: 10px; }
  button:hover { transform: scale(1.02); }
  .success { background: rgba(16, 185, 129, 0.2); padding: 15px; border-radius: 8px; margin-top: 15px; border: 2px solid #10b981; }
</style>
</head>
<body>
  <div class="card">
    <h2>📝 Form Validation</h2>
    <form onsubmit="handleSubmit(event)">
      <input id="email" type="text" placeholder="Email" />
      <div class="error-msg" id="emailError"></div>
      
      <input id="password" type="password" placeholder="Password" />
      <div class="error-msg" id="passwordError"></div>
      
      <button type="submit">Submit</button>
    </form>
    <div id="output"></div>
  </div>
  
  <script>
    function validateEmail(email) {
      if (!email) return 'Email is required';
      if (!email.includes('@')) return 'Invalid email format';
      return null;
    }
    
    function validatePassword(password) {
      if (!password) return 'Password is required';
      if (password.length < 6) return 'Password must be at least 6 characters';
      return null;
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      
      document.getElementById('emailError').textContent = emailError || '';
      document.getElementById('passwordError').textContent = passwordError || '';
      
      document.getElementById('email').className = emailError ? 'error' : '';
      document.getElementById('password').className = passwordError ? 'error' : '';
      
      if (!emailError && !passwordError) {
        document.getElementById('output').innerHTML = 
          '<div class="success">✅ Form submitted successfully!</div>';
      }
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

export default ErrorHandling;
