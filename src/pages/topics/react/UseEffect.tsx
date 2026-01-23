import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const useEffectCode = `// useEffect: Side effects, subscriptions, and cleanup

import { useState, useEffect, useRef } from 'react';

// ✅ Data fetching with cleanup (abort controller)
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: abortController.signal,
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch failed:', error);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup: Abort if userId changes or component unmounts
    return () => abortController.abort();
  }, [userId]); // Re-run when userId changes
  
  return loading ? <Spinner /> : <Profile user={user} />;
}

// ✅ Event listener with cleanup
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty deps = run once on mount
  
  return size;
}

// ✅ Sync with external system (DOM manipulation)
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []); // Focus on mount
  
  return <input ref={inputRef} />;
}`;

const UseEffect = () => {
  return (
    <TopicLayout
      title="useEffect Hook"
      route="/react/hooks/useEffect"
      category="react"
      explanation="useEffect synchronizes React components with external systems (APIs, DOM, subscriptions). The cleanup function prevents memory leaks and race conditions. The dependency array controls when effects re-run."
      code={useEffectCode}
      codeFilename="useEffect.tsx"
      whyItMatters="useEffect bugs cause memory leaks, race conditions, and infinite loops. Interviewers specifically test: cleanup functions, dependency arrays, and when NOT to use useEffect. This separates React beginners from experienced developers."
      mistakes={[
        "Missing cleanup: Subscriptions and listeners without cleanup cause memory leaks.",
        "Missing dependencies: Stale values from closures. ESLint warns about this.",
        "Effect for derived state: Don't useEffect to set state based on props. Compute directly.",
        "Effect for events: User actions should use event handlers, not useEffect.",
      ]}
      practiceTask="Build a useDebounce(value, delay) hook that returns a debounced value. Use it to delay API calls while typing in a search input. Include proper cleanup."
    >
      <MultiExampleEditor
        title="🎯 Try It: useEffect Hook"
        examples={[
          {
            title: "Data Fetching",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: white; }
  .card { background: #1e293b; padding: 20px; border-radius: 12px; margin: 15px 0; border: 1px solid #334155; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .loading { color: #fbbf24; }
  .user { background: #10b981; color: white; padding: 10px; border-radius: 6px; margin: 10px 0; }
</style>
</head>
<body>
  <h2>🔄 useEffect: Data Fetching</h2>
  <button onclick="fetchUser(1)">Load User 1</button>
  <button onclick="fetchUser(2)">Load User 2</button>
  <button onclick="fetchUser(3)">Load User 3</button>
  <div id="output"></div>
  
  <script>
    let abortController = null;
    
    async function fetchUser(id) {
      // Cleanup previous request
      if (abortController) {
        abortController.abort();
      }
      
      abortController = new AbortController();
      const output = document.getElementById('output');
      output.innerHTML = '<div class="loading">⏳ Loading user...</div>';
      
      try {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`, {
          signal: abortController.signal
        });
        const user = await response.json();
        output.innerHTML = \`
          <div class="user">
            <strong>👤 \${user.name}</strong><br>
            📧 \${user.email}<br>
            🏢 \${user.company.name}
          </div>
        \`;
      } catch (error) {
        if (error.name !== 'AbortError') {
          output.innerHTML = '<div style="color: #ef4444;">❌ Error loading user</div>';
        }
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Event Listener Cleanup",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; text-align: center; }
  .position { font-size: 48px; font-weight: bold; color: #fbbf24; margin: 20px 0; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 10px; }
  button:hover { transform: scale(1.05); }
  .active { background: #10b981; color: white; }
</style>
</head>
<body>
  <div class="card">
    <h2>🕹️ Mouse Position Tracker</h2>
    <button id="toggleBtn" onclick="toggleTracking()">Start Tracking</button>
    <div class="position" id="position">Move your mouse!</div>
    <p>useEffect adds/removes event listener</p>
  </div>
  
  <script>
    let isTracking = false;
    
    function handleMouseMove(e) {
      document.getElementById('position').textContent = \`X: \${e.clientX}, Y: \${e.clientY}\`;
    }
    
    function toggleTracking() {
      const btn = document.getElementById('toggleBtn');
      isTracking = !isTracking;
      
      if (isTracking) {
        // Effect: Add listener
        window.addEventListener('mousemove', handleMouseMove);
        btn.textContent = 'Stop Tracking';
        btn.classList.add('active');
      } else {
        // Cleanup: Remove listener
        window.removeEventListener('mousemove', handleMouseMove);
        btn.textContent = 'Start Tracking';
        btn.classList.remove('active');
        document.getElementById('position').textContent = 'Tracking stopped';
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

export default UseEffect;
