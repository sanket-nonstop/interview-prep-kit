import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default UseEffect;
