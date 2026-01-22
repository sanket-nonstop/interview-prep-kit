import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default CustomHooks;