import { TopicLayout } from '@/components/TopicLayout';

const memoryCode = `// JavaScript Memory Management: Heap, Stack, and Garbage Collection

// ✅ Stack vs Heap Memory
// Stack: Primitive values, function calls, local variables
function stackExample() {
  let a = 5;        // Stored in stack
  let b = 10;       // Stored in stack
  let sum = a + b;  // Stored in stack
  return sum;       // Value returned, stack frame destroyed
}

// Heap: Objects, arrays, functions
function heapExample() {
  let obj = { name: 'Alice' };     // Object stored in heap, reference in stack
  let arr = [1, 2, 3];             // Array stored in heap, reference in stack
  let func = () => console.log();  // Function stored in heap, reference in stack
  
  return { obj, arr, func }; // References copied, original stack frame destroyed
}

// ✅ Memory Allocation Types
// Static allocation (compile time)
const CONSTANT_VALUE = 'This is allocated at compile time';

// Dynamic allocation (runtime)
function createUser(name: string) {
  return {
    name,                    // Heap allocation
    id: Math.random(),       // Stack calculation, then heap storage
    createdAt: new Date()    // Heap allocation
  };
}

// ✅ Garbage Collection Demonstration
function memoryLeakExample() {
  // ❌ Memory leak - circular reference (old browsers)
  function createCircularRef() {
    const obj1 = {};
    const obj2 = {};
    obj1.ref = obj2;
    obj2.ref = obj1;
    // In modern browsers, this is handled by mark-and-sweep
    return { obj1, obj2 };
  }
  
  // ❌ Memory leak - detached DOM nodes
  function createDetachedNodes() {
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);
    
    // If we keep reference to span but remove div from DOM
    document.body.appendChild(div);
    document.body.removeChild(div);
    
    return span; // span is detached but still referenced
  }
  
  // ❌ Memory leak - event listeners
  function addEventListeners() {
    const button = document.getElementById('myButton');
    const data = new Array(1000000).fill('large data');
    
    // Event listener holds reference to data
    button?.addEventListener('click', () => {
      console.log(data.length);
    });
    
    // If button is removed but listener not cleaned up
    // data remains in memory
  }
}

// ✅ Memory-efficient patterns
class MemoryEfficientClass {
  private cache = new Map<string, any>();
  private maxCacheSize = 100;
  
  // Object pooling
  private objectPool: any[] = [];
  
  getFromPool() {
    return this.objectPool.pop() || this.createNewObject();
  }
  
  returnToPool(obj: any) {
    this.resetObject(obj);
    this.objectPool.push(obj);
  }
  
  // Cache with size limit
  getCachedData(key: string) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const data = this.fetchData(key);
    
    // Limit cache size
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, data);
    return data;
  }
  
  // Cleanup method
  cleanup() {
    this.cache.clear();
    this.objectPool.length = 0;
  }
  
  private createNewObject() {
    return { data: null, processed: false };
  }
  
  private resetObject(obj: any) {
    obj.data = null;
    obj.processed = false;
  }
  
  private fetchData(key: string) {
    return \`Data for \${key}\`;
  }
}

// ✅ React memory management
const MemoryEfficientComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();
  
  useEffect(() => {
    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();
    
    // Setup interval
    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000);
    
    // Cleanup function
    return () => {
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Abort pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Clear large data
      setData([]);
    };
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: abortControllerRef.current?.signal
      });
      const newData = await response.json();
      
      // Limit data size to prevent memory bloat
      setData(prev => [...prev, ...newData].slice(-1000));
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };
  
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
};

// ✅ WeakMap and WeakSet for memory management
class WeakMapExample {
  private metadata = new WeakMap<object, any>();
  
  setMetadata(obj: object, data: any) {
    this.metadata.set(obj, data);
  }
  
  getMetadata(obj: object) {
    return this.metadata.get(obj);
  }
  
  // When obj is garbage collected, metadata is automatically removed
}

// ✅ Memory profiling utilities
class MemoryProfiler {
  static measureMemory(fn: () => void, label: string) {
    if (performance.memory) {
      const before = performance.memory.usedJSHeapSize;
      fn();
      const after = performance.memory.usedJSHeapSize;
      console.log(\`\${label}: \${after - before} bytes\`);
    }
  }
  
  static logMemoryUsage() {
    if (performance.memory) {
      console.log({
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      });
    }
  }
  
  static createMemoryPressure(size: number) {
    return new Array(size).fill(0).map((_, i) => ({
      id: i,
      data: new Array(1000).fill(\`item-\${i}\`)
    }));
  }
}

// ✅ Memory leak detection
function detectMemoryLeaks() {
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  
  return {
    check: () => {
      const currentMemory = performance.memory?.usedJSHeapSize || 0;
      const diff = currentMemory - initialMemory;
      
      if (diff > 10 * 1024 * 1024) { // 10MB threshold
        console.warn('Potential memory leak detected:', diff, 'bytes');
      }
      
      return diff;
    }
  };
}

// ✅ Best practices summary
/*
Memory Management Best Practices:
1. Clean up event listeners, timers, and subscriptions
2. Use WeakMap/WeakSet for object metadata
3. Limit cache sizes and implement LRU eviction
4. Abort pending requests on component unmount
5. Use object pooling for frequently created objects
6. Avoid circular references in older browsers
7. Remove detached DOM nodes
8. Use React.memo and useMemo judiciously
9. Profile memory usage in development
10. Implement proper cleanup in useEffect
*/`;

const Memory = () => {
  return (
    <TopicLayout
      title="Memory Management"
      route="/javascript/memory"
      category="javascript"
      explanation="JavaScript uses automatic memory management with garbage collection. Understanding stack vs heap, memory allocation, garbage collection algorithms, and common memory leaks is crucial for building performant applications and debugging memory issues."
      code={memoryCode}
      codeFilename="memory.js"
      whyItMatters="Memory management affects application performance and stability. Interviewers test understanding of garbage collection, memory leaks, and optimization techniques. Essential for building scalable applications and debugging performance issues."
      mistakes={[
        "Not cleaning up event listeners and timers - causes memory leaks.",
        "Creating circular references in older browsers - prevents garbage collection.",
        "Keeping references to detached DOM nodes - prevents cleanup.",
        "Not limiting cache sizes - unbounded memory growth.",
      ]}
      practiceTask="Build a data visualization component that handles large datasets efficiently, implements object pooling, manages memory usage, and includes proper cleanup mechanisms."
    />
  );
};

export default Memory;