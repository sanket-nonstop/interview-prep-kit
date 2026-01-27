import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const lifecycleCode = `// React Lifecycle Methods: Class components and hooks equivalents

// ✅ Class Component Lifecycle
class UserProfile extends React.Component<{ userId: string }, { user: User | null; loading: boolean }> {
  constructor(props: { userId: string }) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }
  
  // Mounting phase
  componentDidMount() {
    console.log('Component mounted');
    this.fetchUser();
    
    // Setup subscriptions, timers, etc.
    this.timer = setInterval(() => {
      this.checkUserStatus();
    }, 30000);
  }
  
  // Updating phase
  componentDidUpdate(prevProps: { userId: string }, prevState: any) {
    console.log('Component updated');
    
    // Fetch new user if userId changed
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
    
    // React to state changes
    if (prevState.user !== this.state.user) {
      this.logUserChange();
    }
  }
  
  // Unmounting phase
  componentWillUnmount() {
    console.log('Component will unmount');
    
    // Cleanup subscriptions, timers, etc.
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    // Cancel pending requests
    if (this.abortController) {
      this.abortController.abort();
    }
  }
  
  // Error handling
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component caught error:', error, errorInfo);
    // Log to error reporting service
  }
  
  fetchUser = async () => {
    this.abortController = new AbortController();
    
    try {
      this.setState({ loading: true });
      const response = await fetch(\`/api/users/\${this.props.userId}\`, {
        signal: this.abortController.signal
      });
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setState({ loading: false });
      }
    }
  };
  
  render() {
    const { user, loading } = this.state;
    
    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;
    
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
}

// ✅ Hooks Equivalents (Modern Approach)
const UserProfileHooks: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // componentDidMount + componentDidUpdate + componentWillUnmount
  useEffect(() => {
    console.log('Effect running - mount or userId changed');
    
    const abortController = new AbortController();
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: abortController.signal
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    // Cleanup function (componentWillUnmount equivalent)
    return () => {
      console.log('Cleanup - unmount or userId changed');
      abortController.abort();
    };
  }, [userId]); // Dependency array - effect runs when userId changes
  
  // componentDidMount only (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
    
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 30000);
    
    return () => {
      console.log('Component unmounting');
      clearInterval(timer);
    };
  }, []); // Empty array = run once on mount
  
  // componentDidUpdate equivalent (runs after every render)
  useEffect(() => {
    console.log('Component updated');
    if (user) {
      document.title = \`Profile: \${user.name}\`;
    }
  }); // No dependency array = runs after every render
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

// ✅ Custom hooks for lifecycle logic
const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    return () => abortController.abort();
  }, [userId]);
  
  return { user, loading, error };
};

// ✅ useLayoutEffect for DOM measurements
const MeasuredComponent: React.FC = () => {
  const [height, setHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  
  // Runs synchronously after DOM mutations, before paint
  useLayoutEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight);
    }
  });
  
  return (
    <div>
      <div ref={divRef}>Content to measure</div>
      <p>Height: {height}px</p>
    </div>
  );
};

// ✅ Lifecycle comparison table
/*
Class Component          | Hooks Equivalent
-------------------------|------------------
constructor              | useState
componentDidMount        | useEffect(() => {}, [])
componentDidUpdate       | useEffect(() => {})
componentWillUnmount     | useEffect(() => { return () => {} }, [])
shouldComponentUpdate    | React.memo()
getSnapshotBeforeUpdate  | useLayoutEffect
componentDidCatch        | Error Boundary (no hook equivalent)
*/

// ✅ Advanced lifecycle patterns
const DataFetcher: React.FC<{ url: string }> = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);
  
  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        // Only update state if component is still mounted
        if (!cancelled && mountedRef.current) {
          setData(result);
        }
      } catch (error) {
        if (!cancelled && mountedRef.current) {
          console.error('Fetch error:', error);
        }
      } finally {
        if (!cancelled && mountedRef.current) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  return loading ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>;
};`;

const Lifecycle = () => {
  return (
    <TopicLayout
      title="Lifecycle Methods"
      route="/react/lifecycle"
      category="react"
      explanation="React lifecycle methods control component behavior during mounting, updating, and unmounting phases. Modern React uses useEffect hook to replicate lifecycle behavior. Understanding both class and hooks patterns is essential for maintaining legacy code and interviews."
      code={lifecycleCode}
      codeFilename="lifecycle.tsx"
      whyItMatters="Lifecycle methods are fundamental to React component behavior. Interviewers test understanding of component phases, cleanup patterns, and hooks equivalents. Essential for data fetching, subscriptions, and preventing memory leaks."
      mistakes={[
        "Not cleaning up subscriptions in componentWillUnmount - causes memory leaks.",
        "Missing dependency arrays in useEffect - causes infinite re-renders or stale closures.",
        "Using componentWillMount or componentWillReceiveProps - these are deprecated.",
        "Not handling component unmounting in async operations - updating unmounted components.",
      ]}
      practiceTask="Convert a class component with complex lifecycle logic to hooks, including data fetching, cleanup, and conditional effects based on prop changes."
    />
  );
};

export default Lifecycle;