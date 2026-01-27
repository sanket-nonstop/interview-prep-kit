import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const renderPropsCode = `// Render Props: Share logic between components via function props

// ✅ Mouse Tracker with Render Props
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (mouse: MousePosition) => React.ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <>{render(position)}</>;
}

// Usage: Multiple UI representations of same logic
function App() {
  return (
    <>
      <MouseTracker render={({ x, y }) => (
        <h1>Mouse at ({x}, {y})</h1>
      )} />
      
      <MouseTracker render={({ x, y }) => (
        <div style={{ 
          position: 'absolute', 
          left: x, 
          top: y,
          width: 20,
          height: 20,
          background: 'red',
          borderRadius: '50%'
        }} />
      )} />
    </>
  );
}

// ✅ Data Fetcher with Render Props (Industry Pattern)
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage in production
function UserProfile() {
  return (
    <DataFetcher<User> url="/api/user">
      {(user, loading, error) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage error={error} />;
        return <UserCard user={user} />;
      }}
    </DataFetcher>
  );
}`;

const RenderProps = () => {
  return (
    <TopicLayout
      title="Render Props Pattern"
      route="/react/advanced/render-props"
      category="react"
      explanation="Render Props is a technique for sharing code between components using a prop whose value is a function. It's powerful for creating reusable logic containers that let consumers control the UI."
      code={renderPropsCode}
      codeFilename="RenderProps.tsx"
      whyItMatters="Before hooks, Render Props was THE way to share stateful logic. It's still used in production (React Router, Formik). Understanding it shows you know React's evolution and can work with legacy codebases. Also demonstrates advanced TypeScript generics."
      mistakes={[
        "Creating new functions in render: Pass stable references or memoize",
        "Not handling loading/error states in data fetchers",
        "Overusing: Hooks are simpler for most cases now",
        "Poor TypeScript: Generic types make render props type-safe"
      ]}
      practiceTask="Build a <WindowSize> component using render props that tracks window dimensions. Then create a <Tooltip> component that uses render props to position content relative to a trigger element."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Render Props"
        examples={[
          {
            title: "Mouse Tracker",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; font-family: Arial; background: #1a1a2e; color: white; height: 100vh; }
    .container { padding: 20px; }
    .cursor { position: fixed; width: 20px; height: 20px; background: #00ff88; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); box-shadow: 0 0 20px #00ff88; }
    .coords { font-size: 24px; font-weight: bold; color: #00ff88; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    
    function MouseTracker({ render }) {
      const [position, setPosition] = useState({ x: 0, y: 0 });
      
      useEffect(() => {
        const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
      }, []);
      
      return render(position);
    }
    
    function App() {
      return (
        <>
          <MouseTracker render={({ x, y }) => (
            <div className="container">
              <h1>🖱️ Mouse Tracker</h1>
              <div className="coords">X: {x}, Y: {y}</div>
            </div>
          )} />
          
          <MouseTracker render={({ x, y }) => (
            <div className="cursor" style={{ left: x, top: y }} />
          )} />
        </>
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

export default RenderProps;
