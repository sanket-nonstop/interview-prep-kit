import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const hocCode = `// Higher Order Components: Functions that take a component and return enhanced component

// ✅ withAuth HOC - Industry Standard Pattern
interface WithAuthProps {
  user: User | null;
  isAuthenticated: boolean;
}

function withAuth<P extends object>(
  Component: React.ComponentType<P & WithAuthProps>
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();
    
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;
    
    return <Component {...props} user={user} isAuthenticated={true} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// ✅ withLoading HOC - Reusable Loading State
function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  LoadingComponent: React.ComponentType = DefaultSpinner
) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading, ...rest } = props;
    
    if (isLoading) return <LoadingComponent />;
    return <Component {...(rest as P)} />;
  };
}

// ✅ withErrorBoundary HOC - Production Error Handling
function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<{ error: Error }> = DefaultError
) {
  return class extends React.Component<P, { hasError: boolean; error: Error | null }> {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }
    
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.error('Error caught by HOC:', error, info);
      // Send to error tracking service (Sentry, etc)
    }
    
    render() {
      if (this.state.hasError) {
        return <FallbackComponent error={this.state.error!} />;
      }
      return <Component {...this.props} />;
    }
  };
}

// ✅ Composing Multiple HOCs
const enhance = compose(
  withAuth,
  withLoading,
  withErrorBoundary
);

const EnhancedUserProfile = enhance(UserProfile);

// ✅ withAnalytics HOC - Track Component Views
function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  eventName: string
) {
  return function AnalyticsComponent(props: P) {
    useEffect(() => {
      analytics.track(eventName, { timestamp: Date.now() });
    }, []);
    
    return <Component {...props} />;
  };
}

const TrackedCheckout = withAnalytics(Checkout, 'checkout_viewed');`;

const HOC = () => {
  return (
    <TopicLayout
      title="Higher Order Components (HOC)"
      route="/react/advanced/hoc"
      category="react"
      explanation="HOCs are functions that take a component and return a new component with additional props or behavior. They're a pattern for reusing component logic, common in enterprise React apps and libraries."
      code={hocCode}
      codeFilename="HOC.tsx"
      whyItMatters="HOCs are everywhere in production: Redux's connect(), React Router's withRouter(), Material-UI's withStyles(). Understanding HOCs is crucial for working with legacy code and third-party libraries. Shows mastery of functional composition and TypeScript generics."
      mistakes={[
        "Not forwarding refs: Use React.forwardRef inside HOC",
        "Mutating original component: Always return new component",
        "Static method loss: Copy static methods to wrapped component",
        "Poor naming: Convention is withFeatureName, not FeatureHOC"
      ]}
      practiceTask="Create a withLocalStorage HOC that automatically syncs a component's state to localStorage. Include debouncing to avoid excessive writes. Handle edge cases like quota exceeded and JSON parse errors."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: HOC"
        examples={[
          {
            title: "withLoading HOC",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial; padding: 40px; background: #f0f4f8; }
    .card { background: white; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .spinner { text-align: center; font-size: 48px; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    button { padding: 12px 24px; background: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 20px; }
    button:hover { background: #2563EB; }
    .user-info { margin-top: 20px; padding: 15px; background: #F3F4F6; border-radius: 8px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    
    // HOC that adds loading state
    function withLoading(Component) {
      return function WithLoadingComponent(props) {
        if (props.isLoading) {
          return <div className="spinner">⏳</div>;
        }
        return <Component {...props} />;
      };
    }
    
    // Regular component
    function UserProfile({ user }) {
      return (
        <div className="user-info">
          <h3>👤 {user.name}</h3>
          <p>📧 {user.email}</p>
        </div>
      );
    }
    
    // Enhanced with HOC
    const UserProfileWithLoading = withLoading(UserProfile);
    
    function App() {
      const [loading, setLoading] = useState(false);
      const [user, setUser] = useState(null);
      
      const fetchUser = () => {
        setLoading(true);
        setTimeout(() => {
          setUser({ name: 'John Doe', email: 'john@example.com' });
          setLoading(false);
        }, 2000);
      };
      
      return (
        <div className="card">
          <h1>🎯 HOC Pattern</h1>
          <button onClick={fetchUser}>Load User</button>
          {user && <UserProfileWithLoading user={user} isLoading={loading} />}
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

export default HOC;
