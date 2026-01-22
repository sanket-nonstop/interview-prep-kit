import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Memoization;