import { TopicLayout } from '@/components/TopicLayout';

const useRefCode = `// useRef: Access DOM elements & store mutable values without re-renders

// ✅ DOM manipulation - focus management
const SearchInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);
  
  const clearAndFocus = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="flex gap-2">
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={clearAndFocus}>Clear</button>
    </div>
  );
};

// ✅ Storing mutable values without triggering re-renders
const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startTimer = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  useEffect(() => {
    return () => stopTimer(); // Cleanup on unmount
  }, []);
  
  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

// ✅ Previous value tracking
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const prevCountRef = useRef<number>();
  
  useEffect(() => {
    prevCountRef.current = count;
  });
  
  return {
    count,
    prevCount: prevCountRef.current,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
  };
};

// ✅ Avoiding stale closures in callbacks
const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const messagesRef = useRef(messages);
  
  // Keep ref in sync with state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  
  const handleWebSocketMessage = useCallback((newMessage: string) => {
    // Always has latest messages, no stale closure
    setMessages([...messagesRef.current, newMessage]);
  }, []); // Empty deps - callback never changes
  
  return <div>{/* Chat UI */}</div>;
};`;

const UseRef = () => {
  return (
    <TopicLayout
      title="useRef Hook"
      route="/react/hooks/useRef"
      category="react"
      explanation="useRef returns a mutable ref object that persists across re-renders. Use it for DOM access, storing mutable values without triggering re-renders, and avoiding stale closures. Unlike state, changing ref.current doesn't cause re-renders."
      code={useRefCode}
      codeFilename="useRef.tsx"
      whyItMatters="useRef is essential for DOM manipulation, managing timers/intervals, and avoiding stale closure bugs. Interviewers test whether you understand when to use refs vs state, and how to prevent memory leaks with cleanup. It's a key hook for building interactive UIs."
      mistakes={[
        "Using refs for everything - only use when you need to 'escape' React's data flow.",
        "Forgetting cleanup - always clear intervals/timeouts stored in refs on unmount.",
        "Reading ref.current during render - refs are for side effects, not rendering logic.",
        "Not syncing refs with state - when storing state in refs, keep them synchronized.",
      ]}
      practiceTask="Build a custom useDebounce hook that delays updating a value until after a specified delay. Use useRef to store the timeout ID and ensure proper cleanup on value changes or unmount."
    />
  );
};

export default UseRef;