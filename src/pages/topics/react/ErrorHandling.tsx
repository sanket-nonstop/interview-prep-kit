import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default ErrorHandling;