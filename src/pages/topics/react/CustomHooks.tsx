import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const customHooksCode = `// Custom Hooks: Reusable stateful logic in React
import { useState, useEffect, useCallback, useRef } from 'react';

// ✅ useLocalStorage - Persist state in localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// ✅ useDebounce - Delay value updates
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ✅ useFetch - Data fetching with loading states
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// ✅ useToggle - Boolean state management
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse };
}

// ✅ Using custom hooks in components
const SearchComponent: React.FC = () => {
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const debouncedQuery = useDebounce(query, 300);
  const { data, loading, error } = useFetch(\`/api/search?q=\${debouncedQuery}\`);
  const { value: showFilters, toggle: toggleFilters } = useToggle();

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={toggleFilters}>
        {showFilters ? 'Hide' : 'Show'} Filters
      </button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <SearchResults results={data} />}
    </div>
  );
};`;

const CustomHooks = () => {
  return (
    <TopicLayout
      title="Custom Hooks"
      route="/react/custom-hooks"
      category="react"
      explanation="Custom hooks are functions that start with 'use' and can call other hooks. They extract component logic into reusable functions, making code more modular and testable. Perfect for sharing stateful logic between components without prop drilling or render props."
      code={customHooksCode}
      codeFilename="custom-hooks.tsx"
      whyItMatters="Custom hooks demonstrate advanced React understanding. Interviewers test if you can identify reusable patterns, extract complex logic, and create clean APIs. They're essential for building maintainable React applications and are heavily used in production codebases."
      mistakes={[
        "Not following the 'use' naming convention - React won't recognize it as a hook.",
        "Calling hooks conditionally inside custom hooks - breaks the rules of hooks.",
        "Making hooks too specific - aim for reusable, general-purpose logic.",
        "Not memoizing callbacks with useCallback - causes unnecessary re-renders in consumers.",
      ]}
      practiceTask="Create a useApi hook that handles GET/POST requests with loading, error, and retry logic. Include request cancellation, caching, and optimistic updates. Make it work with TypeScript generics for different data types."
    >
      <MultiExampleEditor
        title="🎯 Try It: Custom Hooks"
        examples={[
          {
            title: "useLocalStorage Hook",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; font-size: 16px; margin: 10px 0; background: #1e293b; color: white; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .output { background: #1e293b; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
  .clear { background: #ef4444; }
</style>
</head>
<body>
  <div class="container">
    <h2>💾 useLocalStorage Hook</h2>
    <input id="nameInput" placeholder="Enter your name" />
    <br>
    <button onclick="saveName()">Save to LocalStorage</button>
    <button class="clear" onclick="clearName()">Clear</button>
    <div id="output"></div>
  </div>
  
  <script>
    // Simulating useLocalStorage custom hook
    const STORAGE_KEY = 'userName';
    
    // Load initial value
    window.onload = function() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        document.getElementById('nameInput').value = saved;
        show('✅ Loaded from localStorage: ' + saved);
      }
    };
    
    function saveName() {
      const value = document.getElementById('nameInput').value;
      localStorage.setItem(STORAGE_KEY, value);
      show('✅ Saved to localStorage: ' + value + '<br>🔄 Refresh page to see persistence!');
    }
    
    function clearName() {
      localStorage.removeItem(STORAGE_KEY);
      document.getElementById('nameInput').value = '';
      show('🗑️ Cleared from localStorage');
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="output">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "useDebounce Hook",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 15px; border: none; border-radius: 8px; font-size: 18px; margin: 15px 0; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 32px; font-weight: bold; color: #fbbf24; }
  .stat-label { font-size: 14px; opacity: 0.8; }
</style>
</head>
<body>
  <div class="card">
    <h2>⏱️ useDebounce Hook</h2>
    <p>Type to see debouncing in action (500ms delay)</p>
    <input id="searchInput" placeholder="Type something..." oninput="handleInput()" />
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="inputCount">0</div>
        <div class="stat-label">Input Events</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="apiCount">0</div>
        <div class="stat-label">API Calls (Debounced)</div>
      </div>
    </div>
  </div>
  
  <script>
    let inputCount = 0;
    let apiCount = 0;
    let debounceTimer = null;
    
    function handleInput() {
      const value = document.getElementById('searchInput').value;
      inputCount++;
      document.getElementById('inputCount').textContent = inputCount;
      
      // Clear previous timer
      clearTimeout(debounceTimer);
      
      // Set new timer (debounce)
      debounceTimer = setTimeout(() => {
        makeApiCall(value);
      }, 500);
    }
    
    function makeApiCall(value) {
      if (value) {
        apiCount++;
        document.getElementById('apiCount').textContent = apiCount;
        console.log('🚀 API call:', value);
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

export default CustomHooks;