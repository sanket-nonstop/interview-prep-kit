import { TopicLayout } from '@/components/TopicLayout';

const eventLoopCode = `// Event Loop: How JavaScript handles async operations
// Call Stack → Web APIs → Task Queue → Event Loop

// ✅ Understanding execution order
console.log('1: Sync start');

setTimeout(() => console.log('2: Timeout 0ms'), 0);

Promise.resolve().then(() => console.log('3: Promise microtask'));

console.log('4: Sync end');

// Output: 1 → 4 → 3 → 2
// Microtasks (Promises) run before macrotasks (setTimeout)

// ✅ Production pattern: Batching DOM updates
function batchDOMUpdates(items: string[]) {
  // Schedule DOM work for next frame
  requestAnimationFrame(() => {
    const container = document.getElementById('list');
    
    // Use DocumentFragment for efficient batch updates
    const fragment = document.createDocumentFragment();
    
    items.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      fragment.appendChild(div);
    });
    
    container?.appendChild(fragment);
  });
}

// ✅ React: Understanding why state updates are batched
const Component: React.FC = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    // These are batched in React 18+ (automatic batching)
    setCount(c => c + 1); // Queued
    setCount(c => c + 1); // Queued
    setCount(c => c + 1); // Queued
    // Only 1 re-render happens, count becomes 3
    
    // Force synchronous update (rare use case)
    flushSync(() => {
      setCount(c => c + 1);
    }); // Immediate re-render
  };
  
  return <button onClick={handleClick}>Count: {count}</button>;
};

// ✅ Debugging async execution order
async function demonstrateOrder() {
  console.log('Start');
  
  // Macrotask (Timer)
  setTimeout(() => console.log('setTimeout'), 0);
  
  // Microtask (Promise)
  Promise.resolve().then(() => console.log('Promise.then'));
  
  // Immediate microtask
  queueMicrotask(() => console.log('queueMicrotask'));
  
  // Async/await creates microtasks
  await Promise.resolve();
  console.log('After await');
  
  console.log('End');
}

// Output order:
// Start → End → Promise.then → queueMicrotask → After await → setTimeout`;

const EventLoop = () => {
  return (
    <TopicLayout
      title="Event Loop"
      route="/javascript/event-loop"
      category="javascript"
      explanation="The Event Loop is JavaScript's mechanism for handling asynchronous operations. It manages the Call Stack, Web APIs, and Task Queues to execute code in the correct order. Understanding microtasks vs macrotasks is crucial for debugging timing issues and optimizing performance."
      code={eventLoopCode}
      codeFilename="event-loop.ts"
      whyItMatters="Event Loop knowledge separates senior developers from juniors. Interviewers test this to see if you can debug race conditions, understand React's batching behavior, and optimize async code. It's essential for performance tuning and avoiding blocking the main thread."
      mistakes={[
        "Assuming setTimeout(0) runs immediately - it's queued as a macrotask after microtasks.",
        "Blocking the main thread with heavy sync operations - use requestIdleCallback or Web Workers.",
        "Not understanding React's batching - multiple setState calls in one event are batched.",
        "Mixing Promise.then with async/await inconsistently - stick to one pattern per function.",
      ]}
      practiceTask="Create a task scheduler that can queue both immediate (microtask) and delayed (macrotask) functions. Implement priority levels where high-priority tasks run before low-priority ones, even if queued later."
    />
  );
};

export default EventLoop;