import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const memoizationCode = `// Memoization: Cache function results to avoid expensive recalculations

// ✅ Basic memoization implementation
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// ✅ Advanced memoization with custom key function
function memoizeWithKey<T extends (...args: any[]) => any>(
  fn: T,
  keyFn: (...args: Parameters<T>) => string
): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = keyFn(...args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// ✅ LRU (Least Recently Used) memoization
function memoizeLRU<T extends (...args: any[]) => any>(
  fn: T,
  maxSize: number = 100
): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn(...args);
    
    // Remove oldest if at capacity
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  }) as T;
}

// ✅ Real-world example: Expensive calculation
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// ✅ API call memoization with TTL
function memoizeWithTTL<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ttlMs: number
): T {
  const cache = new Map<string, { value: any; expiry: number }>();
  
  return (async (...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    const now = Date.now();
    
    const cached = cache.get(key);
    if (cached && cached.expiry > now) {
      return cached.value;
    }
    
    const result = await fn(...args);
    cache.set(key, { value: result, expiry: now + ttlMs });
    return result;
  }) as T;
}

// ✅ React useMemo equivalent
function useCustomMemo<T>(factory: () => T, deps: any[]): T {
  const cache = useRef<{ deps: any[]; value: T } | null>(null);
  
  if (!cache.current || !depsEqual(cache.current.deps, deps)) {
    cache.current = { deps, value: factory() };
  }
  
  return cache.current.value;
}`;

const Memoization = () => {
  return (
    <TopicLayout
      title="Memoization Pattern"
      route="/javascript/patterns/memoization"
      category="javascript"
      explanation="Memoization caches function results based on input parameters to avoid expensive recalculations. Essential optimization technique for recursive algorithms, API calls, and complex computations."
      code={memoizationCode}
      codeFilename="memoization.ts"
      whyItMatters="Critical for performance optimization. Interviewers ask: 'Optimize this recursive function', 'Implement memoization from scratch', 'When would you use memoization?' Shows understanding of caching strategies and performance trade-offs."
      mistakes={[
        "Memory leaks: Unbounded cache grows infinitely. Use LRU or TTL strategies.",
        "Wrong key generation: JSON.stringify fails with functions, circular refs.",
        "Memoizing impure functions: Functions with side effects shouldn't be memoized.",
        "Over-memoization: Not every function benefits. Profile before optimizing.",
      ]}
      practiceTask="Create a memoized function that calculates the shortest path between two points in a grid. Include cache size limits and implement cache hit/miss statistics for performance monitoring."
    >
      <MultiExampleEditor
        title="🎯 Try It: Memoization"
        examples={[
          {
            title: "Fibonacci with Memoization",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  input { padding: 12px; border: none; border-radius: 8px; font-size: 16px; width: 100px; margin: 10px; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 36px; font-weight: bold; color: #fbbf24; }
</style>
</head>
<body>
  <div class="card">
    <h2>📊 Fibonacci Memoization</h2>
    <input id="num" type="number" value="10" min="1" max="40" />
    <button onclick="calcWithout()">Without Memo</button>
    <button onclick="calcWith()">With Memo</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="result">-</div><div>Result</div></div>
      <div class="stat"><div class="stat-value" id="time">-</div><div>Time (ms)</div></div>
    </div>
  </div>
  
  <script>
    // Without memoization
    function fib(n) {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }
    
    // With memoization
    const cache = {};
    function fibMemo(n) {
      if (n <= 1) return n;
      if (cache[n]) return cache[n];
      cache[n] = fibMemo(n - 1) + fibMemo(n - 2);
      return cache[n];
    }
    
    function calcWithout() {
      const n = parseInt(document.getElementById('num').value);
      const start = performance.now();
      const result = fib(n);
      const time = (performance.now() - start).toFixed(2);
      document.getElementById('result').textContent = result;
      document.getElementById('time').textContent = time;
    }
    
    function calcWith() {
      const n = parseInt(document.getElementById('num').value);
      Object.keys(cache).forEach(k => delete cache[k]);
      const start = performance.now();
      const result = fibMemo(n);
      const time = (performance.now() - start).toFixed(2);
      document.getElementById('result').textContent = result;
      document.getElementById('time').textContent = time;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Cache Statistics",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: #1e293b; padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 32px; font-weight: bold; color: #3b82f6; }
  .stat-label { font-size: 14px; opacity: 0.7; margin-top: 5px; }
</style>
</head>
<body>
  <div class="container">
    <h2>📊 Memoization Stats</h2>
    <button onclick="calculate(5)">Calculate(5)</button>
    <button onclick="calculate(10)">Calculate(10)</button>
    <button onclick="calculate(5)">Calculate(5) Again</button>
    <button onclick="clearCache()" style="background: #ef4444;">Clear Cache</button>
    <div class="stats">
      <div class="stat"><div class="stat-value" id="calls">0</div><div class="stat-label">Total Calls</div></div>
      <div class="stat"><div class="stat-value" id="hits">0</div><div class="stat-label">Cache Hits</div></div>
      <div class="stat"><div class="stat-value" id="size">0</div><div class="stat-label">Cache Size</div></div>
    </div>
  </div>
  
  <script>
    const cache = new Map();
    let totalCalls = 0;
    let cacheHits = 0;
    
    function expensiveCalc(n) {
      totalCalls++;
      
      if (cache.has(n)) {
        cacheHits++;
        updateStats();
        return cache.get(n);
      }
      
      // Simulate expensive calculation
      let result = 0;
      for (let i = 0; i < n * 1000000; i++) {
        result += i;
      }
      
      cache.set(n, result);
      updateStats();
      return result;
    }
    
    function calculate(n) {
      expensiveCalc(n);
    }
    
    function clearCache() {
      cache.clear();
      updateStats();
    }
    
    function updateStats() {
      document.getElementById('calls').textContent = totalCalls;
      document.getElementById('hits').textContent = cacheHits;
      document.getElementById('size').textContent = cache.size;
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

export default Memoization;