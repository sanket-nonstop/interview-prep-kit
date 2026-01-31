import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const hookTestingCode = `// Hook Testing: Testing custom React hooks in isolation

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ✅ Simple State Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});

// ✅ Async Data Fetching Hook
function useUser(userId: string) {
  const [state, setState] = useState<{
    data: User | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let cancelled = false;
    
    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(error => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });
    
    return () => { cancelled = true; };
  }, [userId]);

  return state;
}

describe('useUser', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns loading state initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useUser('1'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('returns user data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', name: 'John' })
    });
    
    const { result } = renderHook(() => useUser('1'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual({ id: '1', name: 'John' });
    expect(result.current.error).toBeNull();
  });

  it('returns error on failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    
    const { result } = renderHook(() => useUser('999'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeNull();
  });

  it('refetches when userId changes', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', name: 'John' })
    });
    
    const { result, rerender } = renderHook(
      ({ userId }) => useUser(userId),
      { initialProps: { userId: '1' } }
    );
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    rerender({ userId: '2' });
    
    expect(result.current.loading).toBe(true);
  });
});

// ✅ Hook with Context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

describe('useTheme', () => {
  it('throws error outside provider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within ThemeProvider');
  });

  it('returns theme value from provider', () => {
    const wrapper = ({ children }) => (
      <ThemeProvider value={{ theme: 'dark', toggle: vi.fn() }}>
        {children}
      </ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBe('dark');
  });
});

// ✅ Testing Hook Cleanup
function useEventListener(event: string, handler: () => void) {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
}

describe('useEventListener', () => {
  it('adds event listener on mount', () => {
    const handler = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');
    
    renderHook(() => useEventListener('resize', handler));
    
    expect(addSpy).toHaveBeenCalledWith('resize', handler);
  });

  it('removes event listener on unmount', () => {
    const handler = vi.fn();
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useEventListener('resize', handler));
    unmount();
    
    expect(removeSpy).toHaveBeenCalledWith('resize', handler);
  });
});`;

const HookTesting = () => {
  return (
    <TopicLayout
      title="React Hook Testing"
      route="/testing/react/hook-testing"
      category="testing"
      explanation="Use renderHook from @testing-library/react to test custom hooks in isolation. Wrap state updates in act(), use waitFor for async operations, and test all lifecycle stages including cleanup."
      code={hookTestingCode}
      codeFilename="hook.test.ts"
      whyItMatters="Custom hooks are common in React apps. Interviewers test: renderHook usage, act() for state updates, testing async hooks, context dependencies, and cleanup verification. Shows you can write testable, reusable logic."
      mistakes={[
        "Forgetting act(): State updates must be wrapped in act()",
        "Not testing cleanup: Always verify useEffect cleanup functions",
        "Missing waitFor for async: Use waitFor for any async state changes",
        "Testing implementation: Test the returned values, not internal state"
      ]}
      practiceTask="Create and test a useLocalStorage hook: should sync with localStorage, handle JSON parsing, update when storage event fires, and handle errors gracefully. Include tests for all edge cases."
    >
      <MultiExampleEditor
        title="🎯 Try It: Hook Testing"
        examples={[
          {
            title: "renderHook API",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 700px; margin: 0 auto; }
  .api-item { background: #334155; padding: 15px; border-radius: 8px; margin: 12px 0; }
  code { background: #1e293b; padding: 3px 8px; border-radius: 4px; font-family: monospace; color: #60a5fa; }
  .returns { color: #10b981; margin-top: 8px; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h2>🪝 renderHook API</h2>
    
    <div class="api-item">
      <code>const { result } = renderHook(() => useMyHook())</code>
      <div class="returns">result.current - Current hook return value</div>
    </div>
    
    <div class="api-item">
      <code>act(() => { result.current.doSomething() })</code>
      <div class="returns">Wrap state updates in act()</div>
    </div>
    
    <div class="api-item">
      <code>rerender({ newProps })</code>
      <div class="returns">Re-run hook with new props</div>
    </div>
    
    <div class="api-item">
      <code>unmount()</code>
      <div class="returns">Trigger cleanup effects</div>
    </div>
    
    <div class="api-item">
      <code>await waitFor(() => expect(...))</code>
      <div class="returns">Wait for async state changes</div>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default HookTesting;