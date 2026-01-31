import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const mockingCode = `// Mocking & Spies: Controlling and observing function behavior in tests

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ✅ Basic Mocking with vi.fn()
describe('Mock Functions', () => {
  it('tracks calls and arguments', () => {
    const mockFn = vi.fn();
    
    mockFn('arg1', 'arg2');
    mockFn('arg3');
    
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(mockFn).toHaveBeenLastCalledWith('arg3');
  });

  it('can return specific values', () => {
    const mockFn = vi.fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValue(999);
    
    expect(mockFn()).toBe(1);
    expect(mockFn()).toBe(2);
    expect(mockFn()).toBe(999);
    expect(mockFn()).toBe(999); // Continues returning 999
  });

  it('can mock async functions', async () => {
    const mockFn = vi.fn()
      .mockResolvedValueOnce({ id: 1 })
      .mockRejectedValueOnce(new Error('Failed'));
    
    expect(await mockFn()).toEqual({ id: 1 });
    await expect(mockFn()).rejects.toThrow('Failed');
  });

  it('can use custom implementation', () => {
    const mockFn = vi.fn((a: number, b: number) => a + b);
    
    expect(mockFn(2, 3)).toBe(5);
    expect(mockFn).toHaveBeenCalledWith(2, 3);
  });
});

// ✅ Spying on Object Methods
describe('Spies', () => {
  const calculator = {
    add: (a: number, b: number) => a + b,
    multiply: (a: number, b: number) => a * b
  };

  it('spies on method without changing behavior', () => {
    const addSpy = vi.spyOn(calculator, 'add');
    
    const result = calculator.add(2, 3);
    
    expect(result).toBe(5); // Original behavior preserved
    expect(addSpy).toHaveBeenCalledWith(2, 3);
    
    addSpy.mockRestore();
  });

  it('can override method behavior', () => {
    const addSpy = vi.spyOn(calculator, 'add').mockReturnValue(100);
    
    expect(calculator.add(2, 3)).toBe(100);
    
    addSpy.mockRestore();
  });
});

// ✅ Mocking Modules
// In your test file:
vi.mock('./userService', () => ({
  getUserById: vi.fn().mockResolvedValue({ id: '1', name: 'John' }),
  createUser: vi.fn().mockResolvedValue({ id: '2', name: 'Jane' })
}));

import { getUserById, createUser } from './userService';

describe('UserService Mock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses mocked getUserById', async () => {
    const user = await getUserById('1');
    expect(user).toEqual({ id: '1', name: 'John' });
  });

  it('can override mock per test', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce({ id: '99', name: 'Custom' });
    
    const user = await getUserById('99');
    expect(user.name).toBe('Custom');
  });
});

// ✅ Mocking fetch/APIs
describe('API Mocking', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mocks successful fetch', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'test' })
    } as Response);

    const response = await fetch('/api/data');
    const data = await response.json();

    expect(data).toEqual({ data: 'test' });
    expect(fetch).toHaveBeenCalledWith('/api/data');
  });

  it('mocks failed fetch', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404
    } as Response);

    const response = await fetch('/api/missing');
    
    expect(response.ok).toBe(false);
    expect(response.status).toBe(404);
  });
});

// ✅ Mocking Timers
describe('Timer Mocking', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('tests setTimeout', () => {
    const callback = vi.fn();
    
    setTimeout(callback, 1000);
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(1000);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('tests debounced function', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);
    
    debounced();
    debounced();
    debounced();
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(500);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

// ✅ Mocking Date
describe('Date Mocking', () => {
  it('mocks current date', () => {
    vi.setSystemTime(new Date('2024-01-01'));
    
    expect(new Date().toISOString()).toContain('2024-01-01');
    
    vi.useRealTimers();
  });
});`;

const Mocking = () => {
  return (
    <TopicLayout
      title="Mocking & Spies"
      route="/testing/react/mocking"
      category="testing"
      explanation="Mocking replaces real implementations with controlled test doubles. Use vi.fn() for mock functions, vi.spyOn() to observe methods, vi.mock() for modules, and fake timers for time-based logic. Essential for isolating units and controlling test environments."
      code={mockingCode}
      codeFilename="mocking.test.ts"
      whyItMatters="Mocking is fundamental to unit testing. Interviewers test: when to mock vs spy, module mocking, API mocking, timer control, and avoiding over-mocking. Shows understanding of test isolation and dependency management."
      mistakes={[
        "Over-mocking: Mock only external dependencies, not the code you're testing",
        "Not clearing mocks: Use beforeEach with vi.clearAllMocks()",
        "Not restoring spies: Always call mockRestore() or use afterEach",
        "Mocking implementation details: Focus on behavior, not internal calls"
      ]}
      practiceTask="Write tests for a notification service that: 1) Makes API calls to send notifications, 2) Uses setTimeout for retry logic, 3) Logs to console on errors. Mock all external dependencies and verify correct behavior."
    >
      <MultiExampleEditor
        title="🎯 Try It: Mocking"
        examples={[
          {
            title: "Mock vs Spy",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 700px; margin: 0 auto; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  .type { background: #334155; padding: 20px; border-radius: 8px; }
  .type h3 { margin-top: 0; }
  .mock { border-top: 4px solid #8b5cf6; }
  .spy { border-top: 4px solid #10b981; }
  code { background: #1e293b; padding: 2px 6px; border-radius: 4px; font-family: monospace; display: block; margin: 8px 0; }
  .use-case { color: #94a3b8; font-size: 14px; margin-top: 10px; }
</style>
</head>
<body>
  <div class="card">
    <h2>🎭 Mock vs Spy</h2>
    
    <div class="comparison">
      <div class="type mock">
        <h3>vi.fn() - Mock</h3>
        <code>const mock = vi.fn()</code>
        <p>Creates new function with no implementation</p>
        <div class="use-case">
          ✅ Callbacks<br>
          ✅ Replace dependencies<br>
          ✅ Control return values
        </div>
      </div>
      
      <div class="type spy">
        <h3>vi.spyOn() - Spy</h3>
        <code>const spy = vi.spyOn(obj, 'method')</code>
        <p>Observes existing method, preserves behavior</p>
        <div class="use-case">
          ✅ Verify calls without changing<br>
          ✅ Override when needed<br>
          ✅ Restore original after test
        </div>
      </div>
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

export default Mocking;