import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: useRef Hook"
        examples={[
          {
            title: "DOM Manipulation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; font-size: 16px; margin: 10px 0; }
  input:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .output { background: #1e293b; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <h2>🎯 useRef: Focus Management</h2>
    <input id="nameInput" placeholder="Enter your name" />
    <br>
    <button onclick="focusInput()">Focus Input</button>
    <button onclick="clearAndFocus()">Clear & Focus</button>
    <button onclick="getValue()">Get Value</button>
    <div id="output"></div>
  </div>
  
  <script>
    // Simulating useRef
    const inputRef = document.getElementById('nameInput');
    
    // Auto-focus on load (like useEffect)
    inputRef.focus();
    
    function focusInput() {
      inputRef.focus();
      show('✅ Input focused!');
    }
    
    function clearAndFocus() {
      inputRef.value = '';
      inputRef.focus();
      show('✅ Cleared and focused!');
    }
    
    function getValue() {
      show('📝 Value: "' + inputRef.value + '"');
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="output">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Timer with useRef",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 40px; border-radius: 16px; text-align: center; }
  .timer { font-size: 72px; font-weight: bold; color: #fbbf24; margin: 20px 0; font-family: 'Courier New'; }
  button { background: white; color: #667eea; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; margin: 10px; font-weight: 600; font-size: 16px; }
  button:hover { transform: scale(1.05); }
  .start { background: #10b981; color: white; }
  .stop { background: #ef4444; color: white; }
  .reset { background: #f59e0b; color: white; }
</style>
</head>
<body>
  <div class="card">
    <h2>⏱️ Timer with useRef</h2>
    <div class="timer" id="timer">0s</div>
    <button class="start" onclick="startTimer()">Start</button>
    <button class="stop" onclick="stopTimer()">Stop</button>
    <button class="reset" onclick="resetTimer()">Reset</button>
    <p>useRef stores interval ID without re-rendering</p>
  </div>
  
  <script>
    let seconds = 0;
    let intervalRef = null; // Simulating useRef
    
    function startTimer() {
      if (intervalRef) return; // Already running
      
      intervalRef = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = seconds + 's';
      }, 1000);
    }
    
    function stopTimer() {
      if (intervalRef) {
        clearInterval(intervalRef);
        intervalRef = null;
      }
    }
    
    function resetTimer() {
      stopTimer();
      seconds = 0;
      document.getElementById('timer').textContent = '0s';
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

export default UseRef;